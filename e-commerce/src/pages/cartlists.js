import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { DELETE_PRODUCT } from "@/state/reducer";

const Cartlists = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.clickedProduct.cart.products);
  const totalPrice = useSelector((state) => state.clickedProduct.cart.total);
 
  return (
    <div className="p-10">
      <table className="w-full mb-16">
        <thead className="text-3xl ">
          <tr className="p-10">
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Product Price</th>
          </tr>
        </thead>
        <tbody className="text-center text-xl ">
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b-2 border-gray-300 text-2xl"
            >
              <td className="flex justify-center items-center p-5">
                <Image src={product.image} width={80} height={80} />
              </td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>${product.totalPrice}</td>
              <td>
                <AiOutlineClose
                  className="text-3xl text-orange-500 cursor-pointer"
                  onClick={() => dispatch(DELETE_PRODUCT(product))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length > 0 && (
        <p className="text-right text-3xl">Total Price: ${totalPrice}</p>
      )}
      
    </div>
  );
};

export default Cartlists;
