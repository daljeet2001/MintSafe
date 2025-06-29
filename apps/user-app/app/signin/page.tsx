"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    if (value && index < otpDigits.length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) return alert("Enter valid phone number");
    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      if (res.ok) setStep("otp");
      else alert("Failed to send OTP");
    } catch {
      alert("Error");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 4) return alert("Enter valid OTP");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      phone,
      otp,
    });
    if (result?.ok) router.push("/dashboard");
    else alert("Invalid OTP");
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    const result = await signIn("facebook", {
      redirect: false,
    });
    if (result?.ok) router.push("/dashboard");
    else alert("Facebook login failed");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans px-4">
      <div className="w-full max-w-sm">
        {/* App logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            MintSafe
          </h1>
        </div>

        <div className="bg-white border border-gray-300 rounded-sm p-6 mb-4">
          {step === "phone" ? (
            <>
              <input
                type="text"
                maxLength={10}
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              />
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 font-semibold rounded-sm text-sm mb-4 transition-colors"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-center text-gray-600 text-sm mb-4">
                  We sent your code to {phone}
                </p>
                <div className="flex justify-between space-x-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-full h-12 text-center text-gray-900 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 focus:bg-white text-lg"
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 font-semibold rounded-sm text-sm mb-4 transition-colors"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>
              <div className="text-center">
                <button
                  onClick={() => setStep("phone")}
                  className="text-blue-500 text-sm font-semibold hover:text-blue-700"
                >
                  Change phone number
                </button>
              </div>
            </>
          )}

    
        </div>

        {/* Resend OTP link for OTP step */}
        {step === "otp" && (
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm">
              Didn't get the code?{" "}
              <button
                onClick={sendOtp}
                disabled={loading}
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}






