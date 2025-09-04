import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import {useNavigate} from 'react-router-dom'

const SellerSignUp = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    whatsappNumber: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const {axios, getToken, user, isSeller} = useAppContext();

  const navigate = useNavigate();

  const locations = [
    "Kangaru",
    "Kamiu",
    "Njukiri",
    "G-town",
    "Kayole",
    "Bagik",
    "Embu town",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSellerReg = async (e) => {
        try {
            e.preventDefault();

            if(!user){
              toast.error("You need to register as a buyer first!"),
              navigate('/login', { replace: true })
            }

            const { businessName, whatsappNumber, location } = formData;

            const {data} = await axios.post(`/api/seller/register`, {businessName, whatsappNumber, location}, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success){
                toast.success(data.message);
                setFormData({
                    businessName: "",
                    whatsappNumber: "",
                    location: "",
                });

                setTimeout(() => {
                  window.location.href = '/auth/sales/register'
                }, 5000);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-6 mt-[-200px]">
      {/* Left Side - Checklist + Offer Banner */}
      {!isSeller && <div className="w-full lg:w-1/2 p-6 space-y-6">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg text-center font-medium">
          🎉 Offer: Selling features are completely <b>FREE</b> for the first{" "}
          <b>100 accounts</b> to sign up!
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Why Sell with Embuni?
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            ✅ Reach thousands of campus students instantly
          </li>
          <li className="flex items-start gap-2">
            ✅ Completely free for early sellers
          </li>
          <li className="flex items-start gap-2">
            ✅ Easy product listing with images
          </li>
          <li className="flex items-start gap-2">
            ✅ Direct WhatsApp chats with buyers
          </li>
          <li className="flex items-start gap-2">
            ✅ Cash on delivery supported
          </li>
        </ul>
      </div>}

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isSeller ? "Continue To Dashboard" : "Seller Sign Up"}
        </h2>
        {!isSeller ? <form onSubmit={handleSellerReg} className="space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-gray-600 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your business name"
            />
          </div>

          {/* WhatsApp Business Number */}
          <div>
            <label className="block text-gray-600 mb-1">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. +254712345678"
            />
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-gray-600 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your location</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form> : (
           <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
            onClick={()=> navigate('/sell')}
          >
            Continue to dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default SellerSignUp;
