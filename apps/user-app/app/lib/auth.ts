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
          // ✅ Verify OTP with Twilio
          const result = await twilioClient.verify.v2
            .services(SERVICE_SID)
            .verificationChecks.create({
              to: `+91${phone}`,
              code: otp,
            });

          if (result.status === "approved") {
            // ✅ Find or create user
            let user = await db.user.findUnique({
              where: { number: phone },
            });

            if (!user) {
              user = await db.user.create({
                data: { number: phone },
              });
              const balance = await db.balance.create({
              data: {
              userId: user.id,
              amount: 100000,
              locked: 0,
              },
              });
            }

            return {
              id: user.id.toString(),
              name: user.name || null,
              number: user.number, 
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
  if (account.provider === "github") {
    if (!user?.email) {
      console.error("GitHub user has no email");
      return false;
    }

    const existingUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      const newUser = await db.user.create({
        data: {
          email: user.email,
          name: user.name || "",
          number: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        },
      });

      await db.balance.create({
        data: {
          userId: newUser.id,
          amount: 100000,
          locked: 0,
        },
      });
    }
  }

  return true;
}
,

async jwt({ token, user, account }: any) {
  if (user) {
    token.id = user.id;

    if (account?.provider === "github" && user.email) {
      const dbUser = await db.user.findUnique({
        where: { email: user.email },
      });

      if (dbUser) {
        token.id = dbUser.id;
      }
    }
  }

  return token;
}
,
    async session({ token, session }: any) {
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};
