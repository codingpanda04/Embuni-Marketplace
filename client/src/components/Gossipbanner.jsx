import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


export default function Gossipbanner() {
  {/*const gossips = [
    {
      id: 1,
      title: "Campus Love Triangle Shocks Everyone",
      category: "Relationships",
      snippet: "Rumors are swirling after a dramatic fallout between three popular students...",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Hostel Party Spirals Out of Control",
      category: "Student Life",
      snippet: "What started as a small get-together turned into the biggest hostel party of the semester...",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Lecturer Suspended Amid Scandal",
      category: "Campus News",
      snippet: "A senior lecturer has been suspended following shocking allegations that surfaced last week...",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    },
  ];*/}

  const {gossips} = useAppContext();
  console.log(gossips);

  return (
    <div className="px-4 md:px-12 py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mx-auto">Latest Gossip</h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Stay updated with the hottest stories and rumors spreading around campus.
      </p>

      {/* Gossip Cards */}
      <div className="flex flex-wrap justify-center gap-8 pt-12">
        {gossips.slice(0, 3).map((gossip) => (
          <div
            key={gossip._id}
            className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300"
          >
            <img
              className="rounded-xl"
              src={gossip.images[0]}
              alt={gossip.title}
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              {gossip.title}
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              {gossip.category}
            </p>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              {gossip.description.slice(0, 100)}...
            </p>
            <Link
              to={`/gossip/${gossip._id}`}
              className="inline-block mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
