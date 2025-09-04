import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = ()=> {

  const navigate = useNavigate();

  const plans = [
    {
      name: "Free Seller",
      price: "Ksh 0",
      highlight: "Post up to 3 products/rentals",
      features: [
        { text: "Up to 3 posts", included: true },
        { text: "Appear in search results", included: true },
        { text: "Basic support", included: false },
        { text: "Featured Products", included: false },
        { text: "Unlimited posts", included: false },
      ],
    },
    {
      name: "Basic",
      price: "Ksh 300 (Pay Once)",
      highlight: "Post up to 10 products/rentals",
      features: [
        { text: "Up to 10 posts", included: true },
        { text: "Appear in search results", included: true },
        { text: "Email support", included: true },
        { text: "Featured Products", included: false },
        { text: "Unlimited posts", included: false },
      ],
    },
    {
      name: "Pro",
      price: "Ksh 500 (Pay Once)",
      highlight: "Post up to 30 products/rentals",
      features: [
        { text: "Up to 30 posts", included: true },
        { text: "Appear in search results", included: true },
        { text: "Priority support", included: true },
        { text: "Featured Products", included: true },
        { text: "Unlimited posts", included: false },
      ],
    },
    {
      name: "Unlimited",
      price: "Ksh 1000 (Pay Once)",
      highlight: "Unlimited product & rental posts",
      features: [
        { text: "Unlimited posts", included: true },
        { text: "Appear in search results", included: true },
        { text: "Priority support", included: true },
        { text: "Featured Products", included: true },
        { text: "Boosted exposure", included: true },
      ],
    },
  ];

  return (
    <div className="px-4 md:px-10 py-12 bg-gray-50 min-h-screen">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Pricing</h1>
        <p className="mt-4 text-lg text-gray-600">
          <span className="font-bold text-green-600">Buyers</span> can use the platform completely <span className="font-semibold">free</span>. <br />
          All <span className="font-bold text-green-600">Seller</span> features are completely <span className="font-bold text-green-600">free</span> for the first 
          <span className="font-bold text-green-600"> 100</span> users
        </p>
      </div>

      {/* Plans */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col rounded-2xl shadow hover:shadow-lg transition bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold text-indigo-600 line-through">{plan.price}</p>
            <p className="mt-1 text-sm text-gray-500">{plan.highlight}</p>

            {/* Features table */}
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-3 text-sm">
              {plan.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {f.included ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={`${
                      f.included ? "text-gray-700" : "text-gray-400 line-through"
                    }`}
                  >
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <button onClick={()=> navigate('/sell')} className="mt-auto w-full py-2 px-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Start For Free
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
