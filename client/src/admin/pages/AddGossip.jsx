import React, { useState } from 'react';
import Title from '../../components/Title';
import {assets} from '../../assets/assets';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContext';

const AddGossip = () => {

    const {axios, getToken} = useAppContext();

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    });

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        category: {
            'Helb Updates': false,
            'Relationships': false,
            'Campus Life': false,
            'Sports': false,
            'Drama': false,
            'Fashion': false,
            'Other': false,
        }
    })

    const [loading, setLoading] = useState(false);


    const createGossipHandler = async (e) => {
        e.preventDefault();

        //check if all inputs are filled
        if(!inputs.title || !inputs.description ||!inputs.category || !Object.values(images).some(image => image)){
            toast.error('Please fill all the required fields');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', inputs.title);
            formData.append('description', inputs.description);
            const category = Object.keys(inputs.category).find(key => inputs.category[key]);
            formData.append('category', JSON.stringify(category));

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key]);
            });

            const {data} = await axios.post('/api/gossip/create', formData, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success) {
                toast.success(data.message);

                setInputs({
                    title: '',
                    description: '',
                    category: {
                        'Helb Updates': false,
                        'Relationships': false,
                        'Campus Life': false,
                        'Sports': false,
                        'Drama': false,
                        'Fashion': false,
                        'Other': false,
                    }
                });
                setImages({
                    1: null,
                    2: null,
                    3: null,
                    4: null
                });

                window.location.reload();
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
             <form className="" onSubmit={createGossipHandler}>
                <Title align="left" font="outfit" title="Add Gossip" subTitle="Share all juicy news in and around the campus" />
                
                    <div className='flex-1 max-w-48 mb-[-10]'>
                        <p className='text-gray-800 mt-4'>
                            Gossip Title
                        </p>
                        <input className='border border-gray-300 p-2 rounded' type="text" placeholder='try red t-shirt' value={inputs.title} onChange={e=> setInputs({...inputs, title: e.target.value})}/>
                    </div>

                    <div className='flex-1 max-w-48 mb-[-10]'>
                        <p className='text-gray-800 mt-4'>
                            Gossip Description
                        </p>
                        <textarea className='border border-gray-300 p-2 rounded h-20' type="text" placeholder='juicy details here...' value={inputs.description} onChange={e=> setInputs({...inputs, description: e.target.value})}/>
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
                        {loading ? 'Adding Gossip...' : 'Add Gossip'}
                    </button>

                    <br /> <br /> <br /> <br />
                
               </form>
    );
};

export default AddGossip;