import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CHECK_FOR_LOGIN } from "@/state/reducer";

const Login = () => {
  const [Error, setError] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

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
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-type": "Application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (!data) {
          return setError(data);
        }

        localStorage.setItem("Username", data);
        dispatch(CHECK_FOR_LOGIN(data));
        router.replace("/cartlists");
        return data;
      } catch (error) {
        setError(error);
      }
    },
  });
  const { values, errors, touched, handleSubmit, handleChange } = formik;
  return (
    <div
      className=" w-full flex  justify-center items-center flex-col"
      style={{ height: "calc(100vh - 280px)" }}
    >
      {Error && <p>{Error}</p>}
      <form onSubmit={handleSubmit} className=" flex flex-col">
        {errors.Email && touched.Email && (
          <p className="text-red-500 text-lg sm:text-xl py-3">{errors.Email}</p>
        )}
        <input
          type="text"
          name="Email"
          value={values.Email}
          onChange={handleChange}
          placeholder="Email"
          className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl mb-5"
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
          className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl  mb-5"
        />
        <button
          type="submit"
          className="p-5 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg mb-5"
        >
          Login
        </button>
      </form>
      <p className="text-2xl">
        If you have not account please &nbsp;
        <Link href={"/auth/register"}>
          <span className="underline text-3xl text-blue-800">REGISTER</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
