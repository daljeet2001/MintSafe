"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { Store } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (step === "otp" && resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        setStep("otp");
        setResendTimer(30);
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

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side image */}
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1583147986952-8bccaed15c1e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Promo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-base font-medium mb-4 text-gray-800">
            Welcome to <b>MintSafe</b>
          </h2>

          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            {step === "phone"
              ? "Get Started with your phone number"
              : "Almost there. Enter the OTP sent to your phone number"}
          </h1>

          {step === "phone" ? (
            <>
              <input
                type="text"
                maxLength={10}
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 mb-4 border rounded-md text-sm"
              />
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm mb-3"
              >
                Send OTP
              </button>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-2 text-gray-500 text-sm font-medium">
                  OR
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>
              <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full border py-2 rounded-md flex items-center justify-center text-sm gap-2 hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.1-.76.08-.75.08-.75 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.33.76-1.64-2.67-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.37 1.24-3.2-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.22a11.5 11.5 0 016 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.65.24 2.87.12 3.17.77.83 1.24 1.9 1.24 3.2 0 4.59-2.8 5.6-5.48 5.89.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0012 .5z"
                  />
                </svg>
                Continue with GitHub
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-2">
                +91 {phone}{" "}
                <button
                  onClick={() => setStep("phone")}
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Change
                </button>
              </div>

              <div className="flex justify-between mb-4">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otpDigits[i]) {
                        const prev = document.getElementById(`otp-${i - 1}`);
                        if (prev) (prev as HTMLInputElement).focus();
                      }
                    }}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl font-mono focus:outline-blue-500"
                  />
                ))}
              </div>

              <div className="text-sm text-gray-400 text-right mb-4">
                {resendTimer > 0 ? (
                  `Resend OTP in ${resendTimer}s`
                ) : (
                  <button
                    onClick={sendOtp}
                    className="text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-[#eef3ff] text-blue-700 py-2 rounded-md font-medium text-sm hover:bg-[#dceaff] transition"
              >
                Verify
              </button>

              <p className="mt-6 text-xs text-gray-500 text-center">
                Want to change your signup mode?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Use another method
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
