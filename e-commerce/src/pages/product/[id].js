"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ADD_CART } from "@/state/reducer";
import Link from "next/link";

const ProductPage = ({ data }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 p-20  w-full h-full">
      <div className="m-auto">
        <Image src={data.image} width={300} height={300} alt="product img" />
      </div>
      <div className="p-5">
        <h2 className="text-4xl pb-10">
          {data.title} / {data.category.toUpperCase()}
        </h2>
        <p className="text-4xl pb-10">Price: ${data.price}</p>
        <p className="text-2xl pb-32">{data.description}</p>
        <div className="flex justify-between">
          <input
            type="number"
            defaultValue={1}
            className="w-36 text-center text-3xl border-2 border-gray-400 outline-none"
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <Link href={"/cartlists"}>
            <button
              className="text-2xl p-4 rounded-md bg-orange-500 text-white disabled:opacity-50"
              disabled={quantity <= 0}
              onClick={() =>
                dispatch(ADD_CART({ product: data, quantity: quantity }))
              }
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
