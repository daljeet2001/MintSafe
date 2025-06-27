// BusinessSection.tsx
export const BusinessSection = () => (
  <section className="bg-white py-12 px-6 md:flex md:items-center md:justify-between md:px-12">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-900">Accept payments online & offline</h2>
      <p className="mt-4 text-gray-700">
        Millions of small & big businesses use MintSafe to accept payments anywhere any time with a wide range of solutions for all kinds of merchants
      </p>
      <button className="mt-6 px-6 py-2 bg-[#00d27f] hover:bg-[#00b46c] focus:outline-none focus:ring-4 focus:ring-[#00d27f]/40 text-white rounded-full font-medium transition duration-200 shadow-md hover:shadow-lg
    ">Learn More →</button>
    </div>
    <div className="md:w-1/2 mt-8 md:mt-0">
      <img src="https://static.vecteezy.com/system/resources/previews/013/722/213/non_2x/sample-qr-code-icon-png.png" alt="img" className="w-full max-w-md mx-auto" />
    </div>
  </section>
);