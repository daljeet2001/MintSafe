// HeroSection.tsx
export const HeroSection = () => (
  <section className="bg-white py-12 px-6 md:flex md:items-center md:justify-between md:px-12">
    <div className="md:w-1/2">
      <h1 className="text-4xl font-bold text-gray-900">
        Pay anyone directly from your bank account.
      </h1>
      <p className="mt-4 text-gray-700">
        Pay anyone, everywhere. Make contactless & secure payments in-stores or online using MintSafe or directly from your bank account. Plus, send & receive money from anyone.
      </p>
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