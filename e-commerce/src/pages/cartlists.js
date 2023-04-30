import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { DELETE_PRODUCT } from "@/state/reducer";
import { loadStripe } from "@stripe/stripe-js";

const Cartlists = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.clickedProduct.cart);
  const totalPrice = useSelector((state) => state.clickedProduct.cart.total);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    const productName =
      cart.products.length > 1 ? "Products" : `${cart.products[0].title}`;

    const res = await fetch("http://localhost:3000/api/checkout_session", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({
        totalPrice: cart.total,
        name: productName,
      }),
    });
    const data = await res.json();
    const stripe = await stripePromise;
  
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="p-10 " style={{ height: "calc(100vh - 280px)" }}>
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
          {cart.products.map((product) => (
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
      {cart.products.length > 0 && (
        <div className="flex justify-end items-center px-20">
          <p className=" text-3xl pr-10">
            <span className="font-bold">Total Price:</span> ${totalPrice}
          </p>

          <button
            className="bg-orange-500 py-3 px-10 text-3xl text-white rounded-lg"
            onClick={() => handleCheckout()}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cartlists;
