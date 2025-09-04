import React, { useState } from 'react';
import Title from '../../components/Title';
import {assets} from '../../assets/assets';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContext';

const CreateProduct = () => {

    const {axios, getToken} = useAppContext();

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    });

    const [inputs, setInputs] = useState({
        productName: '',
        productDescription: '',
        inStock: 0,
        price: 0,
        location: '',
        category: {
            'Clothing': false,
            'Furniture': false,
            'Household Items': false,
            'Footwear': false,
            'Electronics': false,
            'Books': false,
            'Other': false,
        }
    })

    const [loading, setLoading] = useState(false);


    const createProductHandler = async (e) => {
        e.preventDefault();

        //check if all inputs are filled
        if(!inputs.productName || !inputs.productDescription || !inputs.inStock || !inputs.price || !inputs.location || !inputs.category || !Object.values(images).some(image => image)){
            toast.error('Please fill all the required fields');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('productName', inputs.productName);
            formData.append('productDescription', inputs.productDescription);
            const category = Object.keys(inputs.category).find(key => inputs.category[key]);
            formData.append('category', JSON.stringify(category));
            formData.append('inStock', inputs.inStock);
            formData.append('price', inputs.price);
            formData.append('location', inputs.location);

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key]);
            });

            const {data} = await axios.post('/api/products/create', formData, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success) {
                toast.success(data.message);

                setInputs({
                    productName: '',
                    productDescription: '',
                    inStock: 0,
                    price: 0,
                    location: '',
                    category: {
                        'Clothing': false,
                        'Furniture': false,
                        'Household Items': false,
                        'Footwear': false,
                        'Electronics': false,
                        'Books': false,
                        'Other': false,
                    }
                });
                setImages({
                    1: null,
                    2: null,
                    3: null,
                    4: null
                });
            } else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
             <form className="" onSubmit={createProductHandler}>
                <Title align="left" font="outfit" title="Add Product" subTitle="Fill in the details carefully and accurate product details, pricing, and location, to enhance the user browsing experience" />
                
                    <div className='flex-1 max-w-48 mb-[-10]'>
                        <p className='text-gray-800 mt-4'>
                            Product Name
                        </p>
                        <input className='border border-gray-300 p-2 rounded' type="text" placeholder='try red t-shirt' value={inputs.productName} onChange={e=> setInputs({...inputs, productName: e.target.value})}/>
                    </div>

                    <div className='flex-1 max-w-48 mb-[-10]'>
                        <p className='text-gray-800 mt-4'>
                            Product Description
                        </p>
                        <textarea className='border border-gray-300 p-2 rounded' type="text" placeholder='try red t-shirt' value={inputs.productDescription} onChange={e=> setInputs({...inputs, productDescription: e.target.value})}/>
                    </div>

                    <div className='flex-1 max-w-48 mb-[-10]'>
                        <p className='text-gray-800 mt-4'>
                            In Stock
                        </p>
                        <input type="number" className='border border-gray-300 p-2 rounded' placeholder='0' value={inputs.inStock} onChange={e=> setInputs({...inputs, inStock: Number(e.target.value)})}/>
                    </div>

                    <p className="text-gray-800 mt-10">Images</p>
                    <div className="grid grid-columns-2 sm:flex gap-4 my-2 flex-wrap">
                        {Object.keys(images).map((key) => (
                            <label htmlFor={`roomImage${key}`} key={key}>
                                <img className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} />
                                <input accept='image/*' type="file" id={`roomImage${key}`} hidden onChange={e=> setImages({...images, [key] : e.target.files[0]})}/>
                            </label>
                        ))}
                    </div>

                    <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                        <div className='flex-1 max-w-48'>
                            <p className='text-gray-800 mt-4'>Product Location</p>
                            <select value={inputs.location} onChange={e=> setInputs({...inputs, location: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                                <option value="">Select Location</option>
                                <option value="Kamiu">Kamiu</option>
                                <option value="Njukiri">Njukiri</option>
                                <option value="Kangaru">Kangaru</option>
                                <option value="G-Town">G-Town</option>
                                <option value="Kayole">Kayole</option>
                                <option value="Bagik">Bagik</option>
                                <option value="Embu Town">Embu Town</option>
                                <option value="Mandona">Mandona</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className='flex-1 max-w-48'>
                            <p className='text-gray-800 mt-4'>
                                Product Price <span className='text-gray-400 text-sm'>(ksh)</span>
                            </p>
                            <input className='border border-gray-300 p-2 rounded' type="number" placeholder='0' value={inputs.price} onChange={e=> setInputs({...inputs, price: Number(e.target.value)})}/>
                        </div>
                    </div>

                    <p className='text-gray-800 mt-4'>Category</p>
                    <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                        {Object.keys(inputs.category).map((amenity, index) => (
                            <div key={index} className='flex items-center gap-2 my-2 cursor-pointer'>
                                <input className='cursor-pointer' type="checkbox" id={`amenities${index+1}`} checked={inputs.category[amenity]} onChange={()=> setInputs({
                                    ...inputs,
                                    category: {
                                        ...inputs.category,
                                        [amenity]: !inputs.category[amenity]
                                    }
                                })} />
                                <label htmlFor={`amenities${index+1}`} className='text-gray-800'>{amenity}</label>
                            </div>
                        ))}
                    </div>

                    <button className='bg-blue-500 text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>

                    <br /> <br /> <br /> <br />
                
               </form>
    );
};

export default CreateProduct;