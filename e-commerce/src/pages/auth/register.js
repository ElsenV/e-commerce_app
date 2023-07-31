import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { USER_DATA } from "@/state/reducer";
import Loading from "@/components/Loading";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ values }),
          }
        );
        const data = await res.json();
        if (!data.Username) {
          return setError(data);
        }
        await router.replace(`/addinfo/${data.Username}`);
        localStorage.setItem("Username", data.Username);
        dispatch(USER_DATA(data));
        setLoading(false);
        return data;
      } catch (error) {
        setError(error);
      }
    },
  });
  const { errors, touched, handleSubmit, handleChange } = formik;

  return (
    <div
      className={`${
        Object.keys(errors).length > 0 || Error
          ? `h-register_page`
          : `h-smaller_76 md:h-bigger_768`
      }    w-full flex justify-center items-center flex-col`}
    >
      {!loading && (
        <div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-5">
            Create Account
          </p>
          {Error && <p className="text-xl sm:text-2xl md:text-3xl">{Error}</p>}
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
              className="p-3 border-2 border-gray-400 outline-none rounded-lg text-md sm:text-xl lg:text-2xl mb-5"
            />
            {errors.Email && touched.Email && (
              <p className="text-red-500 text-lg sm:text-xl py-3">
                {errors.Email}
              </p>
            )}
            <input
              type="text"
              name="Email"
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
              onChange={handleChange}
              placeholder="Password"
              className="p-3 border-2 border-gray-400 outline-none rounded-lg text-md sm:text-xl lg:text-2xl mb-5"
            />
            <button
              type="submit"
              className="p-4 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg mb-5"
            >
              Register
            </button>
          </form>
          <p className="text-2xl">
            if you have an account please{" "}
            <Link href={"/auth/login"}>
              <span className="underline text-2xl md:text-3xl text-blue-800">
                {" "}
                Login
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

export default Register;
