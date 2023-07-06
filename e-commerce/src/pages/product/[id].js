import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ADD_CART } from "@/state/reducer";
import Link from "next/link";
import Style from "./product.module.css";

const ProductPage = ({ data }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      const username = localStorage.getItem("Username");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/add_to_cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, data, username }),
      });
      const res_json = await res.json();
      if (res_json === "Unauthorized" || res_json === "User not exist") {
        return console.log("error is", res_json);
      }
      res_json && dispatch(ADD_CART({ product: data, quantity: quantity }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={` ${Style.product_page} grid grid-cols-1 md:grid-cols-2 p-5 md:p-20  w-full `}
    >
      <div className="m-auto">
        <Image src={data.image} width={300} height={300} alt="product img" />
      </div>
      <div className="p-5">
        <h2 className="text-2xl md:text-4xl pb-10 font-bold md:font-normal">
          {data.title} / {data.category.toUpperCase()}
        </h2>
        <p className="text-2xl md:text-4xl pb-10 font-bold md:font-normal">
          Price: ${data.price}
        </p>
        <p className="text-xl md:text-2xl pb-24">{data.description}</p>
        <div className="flex justify-center items-center flex-col lg:flex-row lg:justify-between ">
          <input
            type="number"
            defaultValue={1}
            className="w-36 text-center text-3xl border-2 p-3 border-gray-400 outline-none  mb-5 lg:mb-0"
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <Link href={"/cartlists"}>
            <button
              className="text-2xl py-2 px-4  lg:py-4 rounded-md bg-orange-500 text-white disabled:opacity-50 w-36 lg:w-auto "
              disabled={quantity <= 0}
              onClick={() => addToCart()}
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}
