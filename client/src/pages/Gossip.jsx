import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, User, Tag } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";


// Dummy gossip data
const dummyGossips = [
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
];

export default function Gossip() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const { gossips, axios, getToken, fetchGossip} = useAppContext();
  console.log(gossips);

  // local state for likes per gossip
  const [blog, setBlog] = useState(
    gossips.map((g) => ({ ...g, liked: g.likes.includes(user?.id) }))
  );

  const [loading, setLoading] = useState(false);

  const handleLike = async (id) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch(error) {
      toast.error(error.message)
    }
  }

  const author = user?.id === blog?.author;
  const authorName = author.firstName || "Anonymous";

  useEffect(() => {
    fetchGossip();
    setLoading(true);
  }, [user])

  return loading && (
    <div className="px-4 sm:px-8 lg:px-24 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Campus Gossip 🐍</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blog.map((gossip) => (
          <div
            key={gossip._id}
            className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={gossip.images[0]}
              alt={gossip.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold mb-2">{gossip.title}</h2>

              <p className="text-gray-600 text-sm flex-grow">
                {gossip.description.slice(0, 100)}...
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" /> {authorName}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" /> {gossip.category}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(gossip._id)}
                  className="flex items-center gap-1"
                >
                  <Heart
                    className={`h-5 w-5 transition ${
                      gossip.liked ? "text-red-500 fill-red-500" : "text-gray-500"
                    }`}
                  />
                  {gossip.likes.length}
                </button>

                {/* Read More */}
                <button
                  onClick={() => navigate(`/gossip/${gossip._id}`)}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Read more →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
