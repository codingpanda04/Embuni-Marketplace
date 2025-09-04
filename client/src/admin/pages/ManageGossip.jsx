import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";


const ManageGossip = () => {
  const [products, setProducts] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(""); 
  
  const {axios, getToken, currency, gossips} = useAppContext();
  const navigate = useNavigate();

  // handle delete
  const handleGossipDelete = async (id) => {
    try{
        const {data} = await axios.delete(`/api/gossip/delete/${id}`, {
          headers: {Authorization : `Bearer ${await getToken()}`}
        })

        if(data.success){
          toast.success(data.message);
          window.location.reload();
        } else{
          toast.error(data.message)
        }
      } catch (error){
        toast.error(error.message);
      }
  }

  const handleRentalDelete = async (id) => {
    try{
        const {data} = await axios.delete(`/api/rentals/delete/${id}`, {
          headers: {Authorization : `Bearer ${await getToken()}`}
        })

        if(data.success){
          toast.success(data.message);
          fetchRentals();
        } else{
          toast.error(data.message)
        }
      } catch (error){
        toast.error(error.message);
      }
  }

  // handle status toggle
  const handleToggleStatus = (id, type) => {
    if (type === "product") {
      setProducts(
        products.map((item) =>
          item._id === id
            ? { ...item, status: item.status === "In Stock" ? "Out of Stock" : "In Stock" }
            : item
        )
      );
    } else {
      setRentals(
        rentals.map((item) =>
          item._id === id
            ? { ...item, status: item.status === "Available" ? "Unavailable" : "Available" }
            : item
        )
      );
    }
    toast.info(`${type === "product" ? "Product" : "Rental"} status updated`);
  };

  // handle edit save
  const handleSave = (e) => {
    e.preventDefault();
    const { id } = editingItem;
    if (editingType === "product") {
      setProducts(products.map((p) => (p._id === id ? editingItem : p)));
    } else {
      setRentals(rentals.map((r) => (r._id === id ? editingItem : r)));
    }
    toast.success(`${editingType === "product" ? "Product" : "Rental"} updated`);
    setEditingItem(null);
  };

  return (
    <div className="p-6">
      <Title title="Manage Gossip" subtitle="Delete and update your gossips seamlessly" />

      {/* PRODUCTS SECTION */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Gossips</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {gossips?.length > 0 ? (gossips?.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-gray-600">
              Category | {p.category}
            </p>
            <p className="text-sm text-gray-700">Likes: {p.likes.length}</p>
            <p className="text-sm text-gray-500">Date Posted: {p.createdAt}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setEditingItem(p); setEditingType("product"); }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleGossipDelete(p._id, "product")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))) : (
          <div className="flex flex-col">
            <p>You have not posted any gossips yet</p>
            <button
                  className="px-3 py-1 bg-blue-500 text-white rounded w-50 mt-5"
                  onClick={()=> navigate('/admin/add-gossip')}
                >
                  Add Gossip
            </button>
          </div>
        )}
      </div>

      {/* RENTALS SECTION */}
      {/*<h2 className="text-xl font-semibold mt-10 mb-4">Rentals</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {rentals.length > 0 ? (rentals?.map((r) => (
          <div key={r._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-medium">{r.title}</h3>
            <p className="text-sm text-gray-600">
              {r.name} | {r.location}
            </p>
            <p className="text-sm text-gray-700">Price/month:{currency} {r.pricePerMonth}</p>
            <p className="text-sm text-gray-500">Featured: {r.featured === "true" ? "True" : "False"}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setEditingItem(r); setEditingType("rental"); }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleRentalDelete(r._id, "rental")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleStatus(r.id, "rental")}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                {r.status === "Available" ? "Mark Unavailable" : "Mark Available"}
              </button>
            </div>
          </div>
        ))) : (
          <div className="flex flex-col">
            <p>You have not posted any rentals yet</p>
            <button
                  className="px-3 py-1 bg-blue-500 text-white rounded w-50 mt-5"
                  onClick={()=> navigate('/sell/add-rental')}
                >
                  Add Rental
            </button>
          </div>
        )}
      </div>*/}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit {editingType}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Title"
              />
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Price"
              />

              {/* Conditional fields */}
              {editingType === "product" ? (
                <>
                  <select
                    value={gossips.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {gossips.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {gossips.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <select
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {locations.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <select
                    value={editingItem.amenities}
                    onChange={(e) => setEditingItem({ ...editingItem, amenities: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {amenities.map((am, i) => (
                      <option key={i} value={am}>{am}</option>
                    ))}
                  </select>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGossip;
