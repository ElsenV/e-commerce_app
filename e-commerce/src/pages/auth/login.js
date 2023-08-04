import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  ADD_CART,
  ALL_PRODUCTS,
  RESET_PRODUCTS,
  USER_DATA,
} from "@/state/reducer";
import Loading from "@/components/Loading";

const Login = ({ allProducts }) => {
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(RESET_PRODUCTS());

  const validation = Yup.object().shape({
    Email: Yup.string().required().email(),
    Password: Yup.string().required().min(6),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();

        if (
          !data ||
          data === "There is not User" ||
          data === "Invalid Email or Password" ||
          data === undefined
        ) {
          setLoading(false);
          return setError(data);
        } else {
          dispatch(ALL_PRODUCTS(allProducts));
          await router.replace("/cartlists");
          dispatch(USER_DATA(data));
          localStorage.setItem("Username", data.Username);
          setLoading(false);

          data.cart.map((cartProduct) =>
            allProducts.map((product) =>
              product.id === cartProduct.id
                ? dispatch(
                    ADD_CART({ product, quantity: cartProduct.quantity })
                  )
                : null
            )
          );
        }
      } catch (error) {
        setError(error);
      }
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;
  return (
    <div
      className={`h-smaller_767 md:h-bigger_768 w-full flex  justify-center items-center flex-col p-5`}
    >
      {!loading && (
        <div>
          <p className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-5">
            Login
          </p>
          {Error && (
            <p className="text-xl sm:text-2xl md:text-3xl text-red-500 mb-3">
              {Error}
            </p>
          )}
          <form onSubmit={handleSubmit} className=" flex flex-col">
            {errors.Email && touched.Email && (
              <p className="text-red-500 text-lg sm:text-xl py-3">
                {errors.Email}
              </p>
            )}
            <input
              type="text"
              name="Email"
              value={values.Email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 border-2 border-gray-400 outline-none rounded-lg text-md sm:text-xl lg:text-2xl mb-5"
            />
            {errors.Password && touched.Password && (
              <p className="text-red-500 text-lg sm:text-xl py-3">
                {errors.Password}
              </p>
            )}
            <input
              type="password"
              name="Password"
              value={values.Password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3 border-2 border-gray-400 outline-none rounded-lg text-md sm:text-xl lg:text-2xl mb-5"
            />
            <button
              type="submit"
              className="p-4 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg mb-5"
            >
              Login
            </button>
          </form>
          <p className="text-xl md:text-2xl mb-5">
            If you forgot your password,
            <Link href="reset-password-form">
              <span className="text-2xl md:text-3xl text-blue-800">
                {" "}
                Click{" "}
              </span>
            </Link>
          </p>

          <p className="text-xl md:text-2xl">
            If you have not account please &nbsp;
            <Link href={"register"}>
              <span className="text-2xl md:text-3xl text-blue-800">
                REGISTER
              </span>
            </Link>
          </p>
        </div>
      )}
      {loading && (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const data = await fetch("https://fakestoreapi.com/products");
  const res = await data.json();
  return {
    props: { allProducts: res },
  };
}
