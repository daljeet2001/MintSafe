"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignInPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
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
    if (!/^\d{10}$/.test(phone)) return toast.error("Enter valid phone number");
    if (!token) return toast.error("Please complete CAPTCHA");

    setLoading(true);

    // ✅ Verify Turnstile CAPTCHA server-side
    const verifyRes = await fetch("/api/verify-turnstile", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      toast.error("CAPTCHA verification failed.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        toast.success("OTP sent");
        setStep("otp");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch {
      toast.error("Error sending OTP");
    }

    setLoading(false);
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 4) return toast.error("Enter valid OTP");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      phone,
      otp,
    });
    if (result?.ok) router.push("/dashboard");
    else toast.error("Invalid OTP");
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    toast.loading("Redirecting");
     // ✅ Verify Turnstile CAPTCHA server-side
    const verifyRes = await fetch("/api/verify-turnstile", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const verifyData = await verifyRes.json();
    console.log(verifyData)

    if (!verifyData.success) {
      toast.error("CAPTCHA verification failed.");
      setLoading(false);
      return;
    }
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans px-4">
      <div className="w-full max-w-sm">
        {/* App logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign in</h1>
        </div>

        <div className="bg-white  border border-gray-300 rounded-sm p-6 mb-4">
          {step === "phone" ? (
  <div className="w-[300px] mx-auto">
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

    <div className="flex items-center my-2">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="mx-2 text-gray-500 text-sm font-medium">OR</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>

    <button
      onClick={handleGithubLogin}
      disabled={loading}
      className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 font-semibold rounded-sm text-sm mb-4 transition-colors"
    >
      {loading ? "Logging in..." : "Sign in with GitHub"}
    </button>

    <div className="mb-3">
      <Turnstile
        siteKey="0x4AAAAAABi1GDXcVlMalohh"
        onSuccess={(token) => setToken(token)}
        options={{ theme: "dark" }}
        className="w-full"
      />
    </div>
  </div>

  // Your OTP section

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

        {/* Resend OTP */}
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



