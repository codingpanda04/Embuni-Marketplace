import { useAppContext } from "../context/AppContext";
import {Link} from 'react-router-dom';

const NewArrivals = () => {

   const {products, currency} = useAppContext();

    {/*const products = [
      {
        id: 1,
        name: "White crew-Neck T-Shirt",
        price: 29.0,
        image:
          "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=500&auto=format&fit=crop",
        position: "object-top",
      },
      {
        id: 2,
        name: "White crew-Neck T-Shirt",
        price: 39.0,
        image:
          "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=600&auto=format&fit=crop",
        position: "object-right",
      },
      {
        id: 3,
        name: "White crew-Neck T-Shirt",
        price: 29.0,
        image:
          "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=735&auto=format&fit=crop",
        position: "object-right",
      },
      {
        id: 4,
        name: "White crew-Neck T-Shirt",
        price: 49.0,
        image:
          "https://images.unsplash.com/photo-1667243038099-b257ab263bfd?q=80&w=687&auto=format&fit=crop",
        position: "object-right",
      },
    ];*/}
  
    return (
      <div>
        <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">
          New Arrivals
        </h1>
        <p className="text-slate-600 mb-10 font-poppins text-center">
          Explore the latest additions to our collection.
        </p>
  
        <section className="flex flex-wrap items-center justify-center gap-6">
          {products.slice(0,4).map((product) => (
            <a
              key={product._id}
              href={`/products/${product._id}`}
              className="group w-56"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className={`rounded-lg w-full h-72 object-cover ${product.position} group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all`}
              />
              <p className="text-sm mt-2">{product.name}</p>
              <p className="text-xl">{currency} {product.price}</p>
            </a>
          ))}
        </section>
      </div>
    );
  };
  
  export default NewArrivals;
  