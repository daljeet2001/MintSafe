import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],

  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};
