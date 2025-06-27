// HeroSection.tsx
export const HeroSection = () => (
  <section className="bg-white py-12 px-6 md:flex md:items-center md:justify-between md:px-12">
    <div className="md:w-1/2">
      <h1 className="text-4xl font-bold text-gray-900">
        Pay anyone directly from your bank account.
      </h1>
      <p className="mt-4 text-gray-700">
        Pay anyone, everywhere. Make contactless & secure payments in-stores or online using Paytm UPI or directly from your bank account. Plus, send & receive money from anyone.
      </p>
      <div className="mt-6 flex gap-4">
        <img src="/appstore.svg" alt="App Store" className="h-12" />
        <img src="/googleplay.svg" alt="Google Play" className="h-12" />
      </div>
    </div>
    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-72">
        <h2 className="text-xl font-semibold">₹250</h2>
        <p className="text-green-600 font-medium">Paid Successfully</p>
        <p className="mt-2 text-sm">To Ajay Gupta</p>
        <p className="text-xs text-gray-500">03 Feb, 10:10 AM<br/>UPI Ref No. 103464313126</p>
        <p className="mt-2 text-sm font-medium">Send Money to your Contacts</p>
      </div>
    </div>
  </section>
);

// SupportBanner.tsx
export const SupportBanner = () => (
  <div className="bg-blue-900 text-white px-6 py-4 rounded-xl flex justify-between items-center">
    <div className="flex items-center gap-4">
      <img src="/paytm-upi-logo.svg" alt="Paytm UPI" className="h-10" />
      <span className="text-lg font-medium">24×7 Trusted customer support to assist and help you in every step of your journey</span>
    </div>
    <button className="border border-white px-4 py-2 rounded-full text-sm font-medium">Learn More →</button>
  </div>
);

// BusinessSection.tsx
export const BusinessSection = () => (
  <section className="bg-white py-12 px-6 md:flex md:items-center md:justify-between md:px-12">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-900">Accept payments online & offline</h2>
      <p className="mt-4 text-gray-700">
        Millions of small & big businesses use Paytm to accept payments anywhere any time with a wide range of solutions for all kinds of merchants
      </p>
      <button className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-full font-medium">Learn More →</button>
    </div>
    <div className="md:w-1/2 mt-8 md:mt-0">
      <img src="/paytm-qrs.png" alt="Paytm QR" className="w-full max-w-md mx-auto" />
    </div>
  </section>
);

// FeaturesGrid.tsx
export const FeaturesGrid = () => (
  <section className="py-12 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-10">Seven powerful reasons to choose Paytm Payment Gateway</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div>
        <img src="/icons/clock.svg" alt="Instant activation" className="mx-auto h-10 mb-2" />
        <h3 className="font-semibold">Instant activation</h3>
        <p className="text-sm text-gray-600">100% online onboarding with minimum documentation</p>
      </div>
      <div>
        <img src="/icons/api.svg" alt="Easy integration" className="mx-auto h-10 mb-2" />
        <h3 className="font-semibold">Easy integration</h3>
        <p className="text-sm text-gray-600">Start accepting payments using just a few lines of code</p>
      </div>
      <div>
        <img src="/icons/cards.svg" alt="100+ sources" className="mx-auto h-10 mb-2" />
        <h3 className="font-semibold">100+ payment sources</h3>
        <p className="text-sm text-gray-600">Credit/debit cards, UPI, netbanking & more</p>
      </div>
      <div>
        <img src="/icons/stats.svg" alt="Best success rate" className="mx-auto h-10 mb-2" />
        <h3 className="font-semibold">Industry-best success rates</h3>
        <p className="text-sm text-gray-600">With intelligent routing & direct integrations</p>
      </div>
    </div>
  </section>
);
