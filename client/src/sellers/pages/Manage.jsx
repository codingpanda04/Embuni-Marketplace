import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";


const Manage = () => {
  const [products, setProducts] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(""); 
  
  const {axios, getToken, currency} = useAppContext();
  const navigate = useNavigate();

  // handle delete
  const handleProductDelete = async (id) => {
    try{
        const {data} = await axios.delete(`/api/products/delete/${id}`, {
          headers: {Authorization : `Bearer ${await getToken()}`}
        })

        if(data.success){
          toast.success(data.message);
          fetchProducts();
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


  const fetchProducts = async () => {
  
    try {
      const {data} = await axios.get('/api/products/seller', { headers: { Authorization: `Bearer ${await getToken()}` } });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching products:", error);
    }
  }


    const fetchRentals = async () => {
  
    try {
      const {data} = await axios.get('/api/rentals/seller', { headers: { Authorization: `Bearer ${await getToken()}` } });

      if (data.success) {
        setRentals(data.rentals);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching products:", error);
    }
  }



  useEffect(() =>{
    fetchProducts();
    fetchRentals();
  }, []);

  return (
    <div className="p-6">
      <Title title="Manage Listings" subtitle="Edit, delete, or update your products and rentals" />

      {/* PRODUCTS SECTION */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Products</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {products.length > 0 ? (products?.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-gray-600">
              {p.category} | {p.location}
            </p>
            <p className="text-sm text-gray-700">Price: {currency} {p.price}</p>
            <p className="text-sm text-gray-500">Featured: {p.featured === "true" ? "True" : "False"}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setEditingItem(p); setEditingType("product"); }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleProductDelete(p._id, "product")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleStatus(p._id, "product")}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                {p.inStock < 1 ? "Mark In of Stock" : "Mark Out of Stock"}
              </button>
            </div>
          </div>
        ))) : (
          <div className="flex flex-col">
            <p>You have not posted any products yet</p>
            <button
                  className="px-3 py-1 bg-blue-500 text-white rounded w-50 mt-5"
                  onClick={()=> navigate('/sell/add-product')}
                >
                  Add Rental
            </button>
          </div>
        )}
      </div>

      {/* RENTALS SECTION */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Rentals</h2>
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
      </div>

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
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {locations.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {categories.map((cat, i) => (
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

export default Manage;
