
// components/merchant/IntegrationSection.tsx
import { Zap, Plug, Code } from "lucide-react";

export default function IntegrationSection() {
  const integrations = [
    {
      icon: <Zap className="text-indigo-500" />,
      title: "1-click Setup",
      desc: "Integrate with your store or platform in minutes.",
    },
    {
      icon: <Plug className="text-indigo-500" />,
      title: "API Access",
      desc: "Full-featured REST API for developers.",
    },
    {
      icon: <Code className="text-indigo-500" />,
      title: "SDKs & Plugins",
      desc: "Ready-made SDKs for React, Node.js and more.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Easy Integrations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}