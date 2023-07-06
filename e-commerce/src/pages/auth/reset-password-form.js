import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Style from "../../styles/container.module.css";
import Loading from "@/components/Loading";
import Checked from "@/components/Checked";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState(null);

  const validation = Yup.object().shape({
    Email: Yup.string().required().email(),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/reset-password-form`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
       
        if (data === "Reset Token sended Email") {
          setLoading(false);
          setChecked(true);
        } else {
          setLoading(false);
          setError(data);
        }

       
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div
      className={`${Style.container} w-full flex justify-center items-center`}
    >
      {!loading ? (
        <div>
          {!checked ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
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
                className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl mb-5"
              />
              <button
                type="submit"
                className="p-5 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg "
              >
                Reset Password
              </button>
            </form>
          ) : (
            <div>
              {!Error ? (
                <Checked msg="Reset link sended to Email" route={null} />
              ) : (
                <p className="text-8xl text-red-500">{Error}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ResetPasswordForm;
