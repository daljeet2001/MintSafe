import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { Twilio } from "twilio";

const twilioClient = new Twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);
const SERVICE_SID = process.env.TWILIO_SERVICE_SID!;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "PhoneOTP",
      credentials: {
        phone: { label: "Phone Number", type: "text", required: true },
        otp: { label: "OTP", type: "text", required: true },
      },
      async authorize(credentials: any) {
        const { phone, otp } = credentials;
        if (!phone || !otp) return null;

        try {
          const result = await twilioClient.verify.v2
            .services(SERVICE_SID)
            .verificationChecks.create({
              to: `+91${phone}`,
              code: otp,
            });

          if (result.status === "approved") {
            let merchant = await db.merchant.findUnique({ where: { number: phone } });

            if (!merchant) {
              merchant = await db.merchant.create({
                data: { number: phone },
              });

              await db.merchantBalance.create({
                data: {
                  merchantId: merchant.id,
                  amount: 100000,
                  locked: 0,
                },
              });
            }

            return {
              id: merchant.id.toString(),
              name: merchant.name || null,
              number: merchant.number,
              email: merchant.email || null,
            };
          }

          return null;
        } catch (error) {
          console.error("OTP verification failed:", error);
          return null;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "github") {
        const email = user.email || profile?.email;
        const name = user.name || profile?.name || "GitHub User";

        if (!email) {
          console.error("GitHub sign-in failed: no email found");
          return false;
        }

        let existingMerchant = await db.merchant.findUnique({
          where: { email },
        });

        if (!existingMerchant) {
          const newMerchant = await db.merchant.create({
            data: {
              email,
              name,
              number: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            },
          });

          await db.merchantBalance.create({
            data: {
              merchantId: newMerchant.id,
              amount: 100000,
              locked: 0,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account, profile }: any) {
      // OTP login
      if (user?.number) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // GitHub login
      if (account?.provider === "github") {
        const email = user?.email || profile?.email;
        if (email) {
          const dbMerchant = await db.merchant.findUnique({
            where: { email },
          });

          if (dbMerchant) {
            token.id = dbMerchant.id;
            token.email = dbMerchant.email;
            token.name = dbMerchant.name;
          }
        }
      }

      return token;
    },

    async session({ token, session }: any) {
      session.merchant = {
        id: token.id,
        email: token.email,
        name: token.name || null,
      };
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};
