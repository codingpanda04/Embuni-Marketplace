import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContext';

// Dummy Data (replace later with backend API calls)
const sellerDummyData = {
  products: [
    {
      id: 1,
      name: "Vintage Jacket",
      price: 2500,
      status: "Pending",
    },
    {
      id: 2,
      name: "Laptop Bag",
      price: 3500,
      status: "Verified",
    },
  ],
  rentals: [
    {
      id: 1,
      name: "2 Bedroom Apartment",
      price: 25000,
      status: "Verified",
    },
    {
      id: 2,
      name: "Office Space - CBD",
      price: 15000,
      status: "Pending",
    },
  ],
  totalProducts: 2,
  totalRentals: 2,
  totalRevenue: 46000,
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    products: [],
    rentals: [],
    totalProducts: 0,
    totalRentals: 0,
    totalRevenue: 0,
  });
  const [seller, setSeller] = useState(null);

  const {axios, getToken, navigate} = useAppContext();

  const fetchDashboard = async () => {
    try {
      const token = await getToken();
      const {data} = await axios.get('/api/seller/dashboard', {headers : {Authorization: `Bearer ${token}`}});
      if(data.success){
        setDashboardData(data.dashboard);
      } else{
        toast.error(data.message );
        console.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  const fetchSeller = async () => {
    try {
      const {data} = await axios.get('/api/seller/profile', {headers : {Authorization: `Bearer ${await getToken()}`}});
      if(data.success){
        setSeller(data.seller);
      } else {
        toast.error(data.message );
        console.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  const handleGoPremium = async (sellerId) => {
    try {
      const {data} = await axios.post('/api/seller/premium', {sellerId}, {headers : {Authorization: `Bearer ${await getToken()}`}});
      if(data.success){
        console.log(data.message)
        window.location.href = data.message.redirect_url; // redirect to Pesapal payment page
      } else {
        toast.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

 {/* const registerIPN = async () => {
    try {
      const {data} = await axios.post('/api/seller/register-ipn',{}, {headers : {Authorization: `Bearer ${await getToken()}`}});
      if(data.success){
        console.log(data);
      } else {
        toast.error(data.message );
        console.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }*/}



  useEffect(() => {
    fetchDashboard();
    fetchSeller();
    {/*registerIPN();*/}
  }, []);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Welcome To Your Seller Dashboard"
        subTitle="Track your product listings, rental offers and analyze revenue — all in one place. Stay updated with real-time insights."
      />

      {seller?.premium === false && (
        <button className='bg-blue-500 text-white px-8 py-2 rounded mt-8 cursor-pointer' onClick={() => handleGoPremium(seller._id)}>
                        Go Premium
        </button>
      )}

      {/* Stats Section */}
      <div className="flex flex-wrap gap-4 my-8">
        <div className="bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 min-w-[200px]">
          <div className="flex flex-col font-medium">
            <p className="text-blue-500 text-lg">Total Products</p>
            <p className="text-neutral-700 text-base">
              {dashboardData.products.length}
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 min-w-[200px]">
          <div className="flex flex-col font-medium">
            <p className="text-blue-500 text-lg">Total Rentals</p>
            <p className="text-neutral-700 text-base">
              {dashboardData.rentals.length}
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 min-w-[200px]">
          <div className="flex flex-col font-medium">
            <p className="text-blue-500 text-lg">Total Postings</p>
            <p className="text-neutral-700 text-base">
              {dashboardData.rentals.length + dashboardData.products.length}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Products
      </h2>
      <div className="w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto mb-10">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-left">
                Product Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Featured
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.products.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  Ksh {item.price}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  <button
                    className={`py-1 px-3 text-xs rounded-full ${
                      item.featured === true
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.featured === true ? "True" : "False"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Rentals */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Rentals
      </h2>
      <div className="w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-left">
                Rental Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price/month
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Featured
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.rentals.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  Ksh {item.pricePerMonth}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  <button
                    className={`py-1 px-3 text-xs rounded-full ${
                      item.featured === true
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.featured === true ? "True" : "False"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
