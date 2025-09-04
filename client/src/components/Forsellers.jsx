import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Forsellers = () => {
  const features = [
    {
      title: "Easy Product Posting",
      description:
        "List your products in just a few clicks with our simple, user-friendly dashboard.",
      icon: "🛒",
    },
    {
      title: "User Management",
      description:
        "Manage your profile, track your listings, and monitor your performance with ease.",
      icon: "👤",
    },
    {
      title: "WhatsApp Integration",
      description:
        "Connect directly with customers via WhatsApp for faster and more personal communication.",
      icon: "💬",
    },
    {
      title: "Secure Transactions",
      description:
        "Enjoy peace of mind with our secure system designed to protect both sellers and buyers.",
      icon: "🔒",
    },
    {
      title: "Wider Reach",
      description:
        "Expand your customer base by reaching students and communities across Embu and beyond.",
      icon: "🌍",
    },
  ];

  const {isSeller, navigate} = useAppContext();

  return (
    <div className="bg-gray-50 px-4 md:px-12 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-poppins">
          Why Sell on <span className="text-indigo-600">Embuni Marketplace?</span>
        </h1>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto font-poppins">
          Join hundreds of sellers growing their businesses with us. Our tools
          make selling simple, secure, and profitable.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to={isSeller ? '/sell' : '/auth/sales/register'}
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {isSeller ? "Dashboard" : "Sell with Us"}
        </Link>
      </div>
    </div>
  );
};

export default Forsellers;
