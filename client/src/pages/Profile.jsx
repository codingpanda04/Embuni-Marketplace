import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const { id } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [dbuser, setDbUser] = useState([]);
  const [seller, setSeller] = useState([]);

  const {isSeller, axios, getToken, following, user} = useAppContext();


  const handleEditToggle = () => setEditOpen(!editOpen);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Replace with real update API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUser((prev) => ({ ...prev, ...formData }));
      toast.success("Profile updated successfully!");
      setEditOpen(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };


  const fetchUser = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.data;
      if (data.success) {
        setDbUser(data.user);
        if (data.user.role === "seller") {
          setSeller(data.sellerProfile);
        }
      } else{
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id, axios, getToken]);

  const profileOwner = user?.id === dbuser?._id;

  if (!dbuser) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-2xl p-6">
        <img
          src={isSeller ? seller.profileImage : dbuser.image}
          alt={dbuser.name}
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{isSeller ? seller.businessName : dbuser.username}</h2>
          <p className="text-gray-600">{dbuser.email}</p>
          <p className="text-gray-700 mt-2">Verified: {isSeller ? "True" : "False"}</p>
          {profileOwner && <button
            onClick={handleEditToggle}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Edit Profile
          </button>}
        </div>
      </div>

      {/* Seller Section */}
      {isSeller && profileOwner && (
        <div className="mt-10 space-y-8">
          {/* Products */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            {following ? (
              <div className="text-center p-6 border rounded-lg">
                <p className="text-gray-600">No products posted yet.</p>
                <button className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                  Post a new product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.products.map((p, i) => (
                  <div key={i} className="border p-3 rounded-lg shadow-sm">
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rentals */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Rentals</h3>
            {dbuser.following.length === 0 ? (
              <div className="text-center p-6 border rounded-lg">
                <p className="text-gray-600">No rentals posted yet.</p>
                <button className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                  Post a new rental
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.rentals.map((r, i) => (
                  <div key={i} className="border p-3 rounded-lg shadow-sm">
                    {r.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buyer Section */}
      {!isSeller &&(
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            {isSeller && profileOwner ? "Your Followers" : "Following"}
          </h3>
          {following.length === 0 ? (
            <p className="text-gray-600">
              {profileOwner ? "You don't have any followers yet"  : `${dbuser.username}` + " is not followed by anyone yet."}
            </p>
          ) : (
            <div className="space-y-4">
              {following.map((seller) => (
                <a
                  key={seller._id}
                  href={`/profile/${seller._id}`}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <img
                    src={seller.profilePic}
                    alt={seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-medium">{seller.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Popup */}
      {editOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleEditToggle}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={user.username}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={user.email}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
