import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { Router } from "next/router";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [Error, setError] = useState(null);

  const validation = Yup.object().shape({
    Username: Yup.string().required(),
    Email: Yup.string().required().email(),
    Password: Yup.string().required().min(6),
  });

  const formik = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Password: "",
    },
    validationSchema: validation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ values }),
        });
        const data = await res.json();
        if (!data.Username) {
          return setError(data);
        }
        router.replace(`/addinfo/${data.Username}`);
        return data;
      } catch (error) {
        setError(error);
      }
    },
  });
  const { errors, touched, handleSubmit, handleChange } = formik;
  return (
    <div
      className="w-full flex justify-center items-center flex-col"
      style={{ height: "calc(100vh - 280px)" }}
    >
      {Error && <p>{Error}</p>}
      <form onSubmit={handleSubmit} className=" flex flex-col">
        {errors.Username && touched.Username && (
          <p className="text-red-500 text-lg sm:text-xl py-3">
            {errors.Username}
          </p>
        )}
        <input
          type="text"
          name="Username"
          onChange={handleChange}
          placeholder="Username"
          className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl mb-5"
        />
        {errors.Email && touched.Email && (
          <p className="text-red-500 text-lg sm:text-xl py-3">{errors.Email}</p>
        )}
        <input
          type="text"
          name="Email"
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
          onChange={handleChange}
          placeholder="Password"
          className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl mb-5"
        />
        <button
          type="submit"
          className="p-5 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg mb-5"
        >
          Register
        </button>
      </form>
      <p className="text-2xl">
        if you have an account please{" "}
        <Link href={"/auth/login"}>
          <span className="underline text-3xl text-blue-800"> Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
