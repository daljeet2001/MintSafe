import { NextResponse } from "next/server";
import { Twilio } from "twilio";

const twilio = new Twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);
const SERVICE_SID = process.env.TWILIO_SERVICE_SID!;

export async function POST(req: Request) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }

  try {
    await twilio.verify.v2.services(SERVICE_SID).verifications.create({
      to: `+91${phone}`,
      channel: "sms",
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
  console.error("OTP send failed:", error?.message || error);
  return NextResponse.json({ error: error?.message || "Failed to send OTP" }, { status: 500 });
}
}
