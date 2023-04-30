import Image from "next/image";
import { IoAddSharp, IoCheckmarkSharp } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CART, DELETE_PRODUCT } from "@/state/reducer";

const Cart = ({ product }) => {
  const dispatch = useDispatch();

  const addedProducts = useSelector(
    (state) => state.clickedProduct.cart.products
  );

  const addedToCart = addedProducts.filter(
    (addedProduct) => addedProduct.id === product.id
  );

  return (
    <div className="m-4 p-5 bg-white flex flex-col justify-between relative group">
      <div className=" m-auto">
        <Image
          src={product.image}
          className="sm:group-hover:scale-105 duration-300 scale-75 sm:scale-100 group-hover:scale-90"
          alt="product image"
          width={300}
          height={300}
          sizes="50"
          priority
        />

        <div className=" absolute top-2 right-2 cursor-pointer text-4xl">
          {addedToCart.length > 0 ? (
            <IoCheckmarkSharp
              onClick={() => dispatch(DELETE_PRODUCT(addedToCart[0]))}
            />
          ) : (
            <Link href={`/product/${product.id}`}>
              <IoAddSharp
              // onClick={() => dispatch(ADD_CART({ product, quantity: 1 }))}
              />
            </Link>
          )}
        </div>
      </div>{" "}
      <div className="pt-5 sm:pt-6 md:pt-8  lg:pt-12 pb-5 text-md sm:text-lg md:text-xl lg:text-2xl">
        {product.title.substring(0, 15)} ...
      </div>
      <div className="sm:text-2xl md:text-3xl text-gray-700">
        ${product.price}
      </div>
    </div>
  );
};

export default Cart;
