import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";

const Navbar = () => {
  const logOut = async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout");
    const data = await res.json();
    return data;
  };

  const cart = useSelector((state) => state.clickedProduct.cart.count);
  const isLogin = useSelector((state) => state.clickedProduct.isLogin);
  const username = useSelector((state) => state.clickedProduct.username);

  return (
    <div className="flex justify-between p-10 border-b-2 border-gray-300 h-[130px]">
      <div className="text-5xl ">
        <Link href={"/"}>NAVBAR</Link>
      </div>
      <div
        className={`flex justify-between  ${isLogin ? "md:w-72" : "md:w-24"}`}
      >
        <Link href={`/about/${username}`}>
          {username ? <p className=" text-3xl">{username}</p> : null}
        </Link>

        {username !== "" && (
          <div className="relative">
            <Link href={"/cartlists"}>
              <IoCartOutline className="absolute right-0 text-5xl cursor-pointer" />
            </Link>

            <div className="text-3xl absolute top-[-20px] right-[-10px]">
              {cart}
            </div>
          </div>
        )}

        {isLogin ? (
          <IoIosLogOut
            className="text-5xl cursor-pointer "
            onClick={() => logOut()}
          />
        ) : (
          <Link href={"/auth/login"}>
            <IoIosLogIn className="text-5xl cursor-pointer " />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
