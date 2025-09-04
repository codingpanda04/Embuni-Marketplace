import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, User, Tag, ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";


// Dummy data (same as before)
{/*const dummyGossips = [
  {
    _id: "1",
    title: "Campus Couple Spotted at Secret Hideout",
    description:
      "Rumors are swirling around campus as a popular couple was spotted sneaking out late last night...",
    image: "/assets/product1.jpg",
    category: "Relationships",
    likes: 124,
    author: "Anonymous",
  },
  {
    _id: "2",
    title: "Lecturer Seen Driving a Student’s Car",
    description:
      "Speculations arise as a well-known lecturer was seen behind the wheel of a flashy sports car...",
    image: "/assets/product2.jpg",
    category: "Campus Life",
    likes: 89,
    author: "Campus Insider",
  },
  {
    _id: "3",
    title: "Big Party at Kangaru Hostel Ends in Chaos",
    description:
      "What started as a fun night quickly turned chaotic when the party at Kangaru Hostel was interrupted...",
    image: "/assets/product3.jpg",
    category: "Events",
    likes: 203,
    author: "Party Watcher",
  },
  {
    _id: "4",
    title: "Star Athlete Rumored to Transfer",
    description:
      "The campus buzzes with speculation as the star basketball player might be leaving the team...",
    image: "/assets/product4.jpg",
    category: "Sports",
    likes: 77,
    author: "Sports Desk",
  },
  {
    _id: "5",
    title: "Library Ghost Story Resurfaces",
    description:
      "Students whisper again about the mysterious ghost said to haunt the library basement...",
    image: "/assets/product5.jpg",
    category: "Mystery",
    likes: 54,
    author: "Night Owl",
  },
  {
    _id: "6",
    title: "New Cafeteria Menu Sparks Debate",
    description:
      "The updated cafeteria menu is receiving mixed reactions from students...",
    image: "/assets/product6.jpg",
    category: "Food",
    likes: 98,
    author: "Foodie",
  },
];*/}

export default function GossipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const {gossips, axios, getToken, fetchGossip} = useAppContext();

  const gossip = gossips.find((g) => g._id === id);

  // local like states
  const [liked, setLiked] = useState(gossip?.likes.includes(user?.id));
  const [likeCount, setLikeCount] = useState(gossip?.likes.length || 0);

  if (!gossip) {
    return (
      <div className="px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Gossip not found 😢
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleLike = async (id) => {
      try {
        if (!isSignedIn) {
          toast.error("Please sign in to like gossips.");
          return;
        }
  
        const {data} = await axios.post(`api/gossip/like/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        });
  
        if(data.success) {
          toast.success(data.message);
          fetchGossip();
        } else {
          toast.error(data.message);
        } 
      } catch(error) {
        toast.error(error.message)
      }
    }

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Image */}
        <img
          src={gossip.images[0]}
          alt={gossip.title}
          className="rounded-xl shadow-md object-cover w-full h-[300px] lg:h-[500px]"
        />

        {/* Right: Content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{gossip.title}</h1>

          <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> Anonymous
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {gossip.category}
            </span>
            <button
              onClick={()=> handleLike(gossip._id)}
              className="flex items-center gap-1 transition"
            >
              <Heart
                className={`h-5 w-5 ${
                  liked ? "text-red-500 fill-red-500" : "text-gray-500"
                }`}
              />
              {likeCount}
            </button>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {gossip.description}
          </p>
        </div>
      </div>
    </div>
  );
}
