import React, { useState, useRef } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from '../../context/AppContext';
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";



const SellerProfile = () => {
  const [profile, setProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const clerkUser = useUser();

  const {axios, getToken, navigate} = useAppContext();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // API call to save changes here
    console.log("Saved Profile:", profile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profileImage: imageUrl });

      // 👉 In production, upload `file` to backend/cloud storage here
    }
  };

  const handleProfileDelete = async (id) => {
    try {
      const {data} = await axios.delete(`/api/seller/delete/${id}`, {headers: {
        Authorization : `Bearer ${await getToken()}`
      }});

      if(data.success){
        toast.success(data.message);
        
        setTimeout(()=>{
          window.location.href = '/auth/sales/register';
        }, 4000)
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchProfile = async () => {
    try {
      const {data} = await axios.get('/api/seller/profile', {headers : {Authorization: `Bearer ${await getToken()}`}});
      if(data.success){
        setProfile(data.seller);
      } else {
        toast.error(data.message );
        console.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Title
        align="left"
        font="outfit"
        title="Seller Profile"
        subTitle="Manage your business profile, update your information, or delete your account."
      />

      <div className="bg-white shadow-md rounded-2xl p-6 mt-6 border border-gray-200">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center gap-3 relative">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-200 object-cover cursor-pointer hover:opacity-80 transition"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <p className="text-xs text-gray-500">Click image to upload new photo</p>
          <h2 className="text-xl font-semibold text-gray-800">
            {profile.businessName}
            {profile.premium === true ? "Premium Seller" : ""}
          </h2>
          <p className="text-sm text-gray-500">Joined {profile.createdAt}</p>
        </div>

        {/* Profile Fields */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={clerkUser.user.emailAddresses[0].emailAddress}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="text-gray-600 text-sm">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={profile.businessName}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="text-gray-600 text-sm">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              value={profile.whatsappNumber}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-gray-600 text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Category */}
          <div className="sm:col-span-2">
            <label className="text-gray-600 text-sm">Seller ID</label>
            <input
              type="text"
              name="category"
              value={profile._id}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold mb-2">Danger Zone</h3>
        <p className="text-sm mb-4">
          Deleting your account is permanent and cannot be undone. All your seller data will be lost.
        </p>
        <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        onClick={()=> handleProfileDelete(profile._id)}
        >
          Delete Account
        </button>
      </div>
      <br /> <br />
    </div>
  );
};

export default SellerProfile;
