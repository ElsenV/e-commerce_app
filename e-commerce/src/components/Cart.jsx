import Image from "next/image";
import { IoAddSharp, IoCheckmarkSharp } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PRODUCT } from "@/state/reducer";

const Cart = ({ product }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.clickedProduct.user_data);
  const cart = useSelector((state) => state.clickedProduct.cart.products);

  const addedProducts = useSelector(
    (state) => state.clickedProduct.cart.products
  );

  const addedToCart = addedProducts.filter(
    (addedProduct) => addedProduct.id === product.id
  );

  const deleteCart = async (id) => {
    const totalPrice = cart.filter((product) => product.id === id)[0]
      .totalPrice;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/delete_from_cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: userData.Username, id }),
      });
      const data = await res.json();
      data && dispatch(DELETE_PRODUCT({ id, totalPrice }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 p-5 bg-white flex flex-col justify-between relative group">
      <div className=" m-auto">
        <Image
          src={product.image}
          className="sm:group-hover:scale-100 duration-300 scale-75 sm:scale-90 group-hover:scale-90"
          alt="product image"
          width={300}
          height={300}
          sizes="50"
          priority
        />

        <div className=" absolute top-2 right-2 cursor-pointer text-4xl">
          {addedToCart.length > 0 ? (
            <IoCheckmarkSharp onClick={() => deleteCart(addedToCart[0].id)} />
          ) : (
            <Link href={`/product/${product.id}`}>
              <IoAddSharp />
            </Link>
          )}
        </div>
      </div>{" "}
      <div className="pt-5 sm:pt-6 md:pt-8  lg:pt-12 pb-5 text-xl sm:text-xl lg:text-2xl">
        {product.title.substring(0, 15)} ...
      </div>
      <div className="text-2xl  md:text-3xl lg:text-4xl text-gray-700">
        ${product.price}
      </div>
    </div>
  );
};

export default Cart;
