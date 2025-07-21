import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "This service saved me so much time and money when paying my international vendors.",
      author: "Sarah Johnson",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "I use it daily to send money to my family abroad. Fast and reliable!",
      author: "Miguel Rodriguez",
      role: "Freelancer",
      rating: 5
    },
    {
      quote: "The easiest payment app I've ever used. Highly recommended.",
      author: "Priya Patel",
      role: "College Student",
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#F5B041]  rounded-full mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl font-bold text-gray-900">What our customers say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#F5B041] fill-[#F5B041]' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}