import React, { useState } from 'react';
import Title from '../../components/Title';
import {assets} from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const CreateRental = () => {

    const {axios, getToken} = useAppContext();

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    });

    const [inputs, setInputs] = useState({
        name: '',
        location: '',
        roomType: '',
        pricePerMonth: 0,
        amenities: {
            'Free Wifi': false,
            'Secure': false,
            'Hot Shower': false,  
            'Cold Shower': false,
     }  
    })

    const [loading, setLoading] = useState(false);


    const roomCreateHandler = async (e) => {
        e.preventDefault();

        //check if all inputs are filled
        if(!inputs.name || !inputs.location || !inputs.amenities || !inputs.roomType || !inputs.pricePerMonth || !Object.values(images).some(image => image)){
            toast.error('Please fill all the required fields');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('location', inputs.location);
            formData.append('roomType', inputs.roomType);
            formData.append('pricePerMonth', inputs.pricePerMonth);
            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
            formData.append('amenities', JSON.stringify(amenities));

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key]);
            });

            const {data} = await axios.post('/api/rentals/create', formData, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success) {
                toast.success(data.message);

                setInputs({
                    name: '',
                    location: '',
                    roomType: '',
                    pricePerMonth: 0,
                    amenities: {
                        'Free Wifi': false,
                        'Secure': false,
                        'Hot Shower': false,  
                        'Cold Shower': false,
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
             <form className="" onSubmit={roomCreateHandler}>
                <Title align="left" font="outfit" title="Add Rentals" subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user browsing experience" />
                
                    <div className='flex-1 max-w-48'>
                            <p className='text-gray-800 mt-4'>
                                Title
                            </p>
                            <input className='border border-gray-300 p-2 rounded' type="text" placeholder='Try singles in Kangaru...' value={inputs.name} onChange={e=> setInputs({...inputs, name: e.target.value})}/>
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
                            <p className='text-gray-800 mt-4'>Rental Type</p>
                            <select value={inputs.roomType} onChange={e=> setInputs({...inputs, roomType: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                                <option value="">Select Rental Type</option>
                                <option value="Single">Single</option>
                                <option value="Bedsitter">Bedsitter</option>
                                <option value="Single Bed">Single Bed</option>
                                <option value="Double Bed">Double Bed</option>
                            </select>
                        </div>

                        <div className='flex-1 max-w-48'>
                            <p className='text-gray-800 mt-4'>
                                Price <span className='text-xs'>/month</span>
                            </p>
                            <input className='border border-gray-300 p-2 rounded' type="number" placeholder='0' value={inputs.pricePerMonth} onChange={e=> setInputs({...inputs, pricePerMonth: Number(e.target.value) })}/>
                        </div>
                    </div>

                    <div className='flex-1 max-w-48'>
                            <p className='text-gray-800 mt-4'>Rental Location</p>
                            <select value={inputs.location} onChange={e=> setInputs({...inputs, location: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                                <option value="">Select Rental Location</option>
                                <option value="Kamiu">Kamiu</option>
                                <option value="Njukiri">Njukiri</option>
                                <option value="Kangaru">Kangaru</option>
                                <option value="Kayole">Kayole</option>
                                <option value="G-Town">G-Town</option>
                                <option value="Spring Valley">Spring Valley</option>
                            </select>
                        </div>

                    <p className='text-gray-800 mt-4'>Amenities</p>
                    <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                        {Object.keys(inputs.amenities).map((amenity, index) => (
                            <div key={index} className='flex items-center gap-2 my-2 cursor-pointer'>
                                <input className='cursor-pointer' type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={()=> setInputs({
                                    ...inputs,
                                    amenities: {
                                        ...inputs.amenities,
                                        [amenity]: !inputs.amenities[amenity]
                                    }
                                })} />
                                <label htmlFor={`amenities${index+1}`} className='text-gray-800'>{amenity}</label>
                            </div>
                        ))}
                    </div>

                    <button className='bg-blue-500 text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
                        {loading ? 'Adding Rental...' : 'Add Rental'}
                    </button>
                
               </form>
    );
};

export default CreateRental;