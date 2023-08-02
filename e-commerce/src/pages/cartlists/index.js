import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { DELETE_PRODUCT } from "@/state/reducer";
import Paypal_checkout from "@/lib/paypal_checkout";
import { useRouter } from "next/router";

const Cartlists = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.clickedProduct.cart);
  const userData = useSelector((state) => state.clickedProduct.user_data);

  const deleteCart = async (id, totalPrice) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/delete_from_cart/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Username: userData.Username, id }),
        }
      );
      const data = await res.json();
      if (data === "Unauthorized" || data === "User not exist") {
        await router.replace("auth/login");
        return console.log("error is", data);
      }
      data && dispatch(DELETE_PRODUCT({ id, totalPrice }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`h-smaller_767 md:h-bigger_768 p-2 sm:p-10 `}>
      {cart.products.length > 0 && (
        <div>
          <div className="max-h-[250px] md:max-h-[300px] overflow-y-scroll">
            <table className="w-full mb-16">
              <thead className=" text-md sm:text-3xl ">
                <tr className="p-5 sm:p-10">
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Product Price</th>
                </tr>
              </thead>
              <tbody className="text-center text-sm sm:text-xl ">
                {cart.products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b-2 border-gray-300 text-lg sm:text-2xl"
                  >
                    <td className="flex justify-center items-center p-5">
                      <Image src={product.image} width={80} height={80} />
                    </td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>${product.totalPrice}</td>
                    <td>
                      <AiOutlineClose
                        className="text-md sm:text-3xl text-orange-500 cursor-pointer"
                        onClick={() =>
                          deleteCart(product.id, product.totalPrice)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cart.products.length > 0 && (
            <div className="flex justify-end items-center px-10 sm:px-20 pt-10 flex-col sm:flex-row ">
              <p className="text-2xl sm:text-3xl pr-5 sm:pr-10 mb-5">
                <span className="font-bold">Total Price:</span> ${cart.total}
              </p>

              {/* PAYPAL PAYMENT */}
              <div className="w-40 sm:w-56">
                {" "}
                <Paypal_checkout total={cart.total} />
              </div>
            </div>
          )}
        </div>
      )}
      {cart.products.length === 0 && (
        <div className="text-center pt-10">
          <p className="text-xl sm:text-2xl md:text-5xl">No Product</p>
        </div>
      )}
    </div>
  );
};

export default Cartlists;
