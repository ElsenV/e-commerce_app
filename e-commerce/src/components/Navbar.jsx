import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((store) => store.clickedProduct.cart.count);

  return (
    <div className="grid grid-cols-2 p-10 border-b-2 border-gray-300 h-[130px]">
      <div className="text-5xl ">
        <Link href={"/"}>NAVBAR</Link>
      </div>
      <div className="relative">
        <Link href={"/cartlists"}>
          <IoCartOutline className="absolute right-0 text-5xl cursor-pointer" />
        </Link>

        <div className="text-3xl absolute top-[-20px] right-[-10px]">
          {cart}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
