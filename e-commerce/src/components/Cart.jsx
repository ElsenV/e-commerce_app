import Image from "next/image";
import { IoAddSharp } from "react-icons/io5";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ADD_CART } from "@/state/reducer";

const Cart = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="m-4 p-5 bg-white flex flex-col justify-between relative group">
      <div className=" m-auto">
        <Image
          src={product.image}
          className="group-hover:scale-105 duration-300"
          alt="product image"
          width={300}
          height={300}
          priority
        />

        <div className=" absolute top-2 right-2 cursor-pointer">
          <IoAddSharp
            className="text-4xl"
            onClick={() => dispatch(ADD_CART({ product, quantity: 1 }))}
          />
        </div>
      </div>

      <Link href={`/product/${product.id}`}>
        {" "}
        <div className="pt-5 sm:pt-6 md:pt-8  lg:pt-12 pb-5 text-md sm:text-lg md:text-xl lg:text-2xl">
          {product.title.substring(0, 15)} ...
        </div>
      </Link>

      <div className="sm:text-2xl md:text-3xl text-gray-700">
        ${product.price}
      </div>
    </div>
  );
};

export default Cart;
