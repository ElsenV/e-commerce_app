import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
          setChecked(true);
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
      className={`h-smaller_767 md:h-bigger_768 w-full flex justify-center items-center`}
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
                className="p-2 sm:p-4 border-2 border-gray-400 outline-none rounded-lg text-md sm:text-xl lg:text-2xl mb-5"
              />
              <button
                type="submit"
                className="p-3 sm:p-5 bg-black text-white text-md sm:text-xl lg:text-2xl rounded-lg "
              >
                Reset Password
              </button>
            </form>
          ) : (
            <div>
              {!Error ? (
                <Checked msg="Reset link has sended to Email" route={null} />
              ) : (
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-red-500">
                  {Error}
                </p>
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
