import { useState } from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RESET_PRODUCTS } from "@/state/reducer";
import { useRouter } from "next/router";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const logOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      if (res.status === 201) {
        localStorage.removeItem("Username");
        await router.push("/");
        dispatch(RESET_PRODUCTS());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cart = useSelector((state) => state.clickedProduct.cart.count);
  const isLogin = useSelector((state) => state.clickedProduct.isLogin);
  const username = useSelector((state) => state.clickedProduct.username);

  return (
    <div className="flex justify-between px-2 py-10 sm:p-10 border-b-2 border-gray-300 h-auto">
      <div className="text-3xl sm:text-4xl md:text-5xl font-caveat ">
        <Link href={"/"} className={caveat.className}>
          Wardrobe
        </Link>
      </div>

      {/* HAMBURGER MENU */}
      <div className="block md:hidden">
        {!show && (
          <HiOutlineMenuAlt1
            className="text-3xl sm:text-4xl md:text-5xl  text-black cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        )}

        {show && (
          <div className="">
            <div className="flex justify-end">
              <IoClose
                className="text-2xl sm:text-3xl md:text-4xl text-black cursor-pointer text-right"
                onClick={() => setShow((prev) => !prev)}
              />
            </div>

            <ul>
              {/* USERNAME */}
              {isLogin && (
                <li className="flex justify-start ">
                  <Link href={`/about/${username}`}>
                    <p className=" text-xl sm:text-2xl pt-5">{username}</p>
                  </Link>
                </li>
              )}

              {/* CART */}
              {isLogin && (
                <li className="pt-5 flex justify-center text-xl sm:text-2xl">
                  <div className="relative">
                    <Link href={"/cartlists"}>
                      <IoCartOutline className="absolute right-0 text-4xl cursor-pointer" />
                    </Link>

                    <div className="absolute top-[-15px] right-[-10px]">
                      {cart}
                    </div>
                  </div>
                </li>
              )}

              {/* LOGIN LOGOUT*/}
              <li
                className={`${isLogin ? `pt-16` : `pt-4`}  flex justify-start`}
              >
                {isLogin ? (
                  <IoIosLogOut
                    className="text-3xl sm:text-4xl cursor-pointer "
                    onClick={() => {
                      logOut();
                    }}
                  />
                ) : (
                  <Link href={"/auth/login"}>
                    <IoIosLogIn className="text-4xl cursor-pointer " />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <div
          className={`flex justify-between  ${isLogin ? "md:w-48" : "md:w-24"}`}
        >
          <Link href={`/about/${username}`}>
            {isLogin ? <p className=" text-2xl">{username}</p> : null}
          </Link>

          {isLogin && (
            <div className="relative">
              <Link href={"/cartlists"}>
                <IoCartOutline className="absolute right-0 text-4xl cursor-pointer" />
              </Link>

              <div className="text-2xl absolute top-[-15px] right-[-10px]">
                {cart}
              </div>
            </div>
          )}

          {isLogin ? (
            <IoIosLogOut
              className="text-4xl cursor-pointer "
              onClick={() => {
                logOut();
              }}
            />
          ) : (
            <Link href={"/auth/login"}>
              <IoIosLogIn className="text-4xl cursor-pointer " />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
