import React, { useState } from "react";
import Style from "../../../styles/container.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Checked from "@/components/Checked";

const ResetPassword = ({ expired, token }) => {
  const [Error, setError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(null);

  const validation = Yup.object().shape({
    password: Yup.string().required("Password is required").min(6),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "password must be match"
    ),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validation,
    onSubmit: async (values, resetForm) => {
      try {
        const resetPassword = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/reset-password/${token}`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(values.password),
          }
        );
        const data = await resetPassword.json();
        if (data === "Password has not been changed") {
          resetForm();
          setError("Please try again");
        } else if (data === "Password has been changed") {
          setPasswordChanged(true);
        } else {
          setError(data);
        }
      } catch (error) {
        setError(error);
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange } = formik;

  return (
    <div
      className={`${Style.container} w-full flex justify-center items-center`}
    >
      {expired ? (
        <p className="text-6xl">Expired Please try again</p>
      ) : (
        <div>
          {!passwordChanged ? (
            <div>
              <p className="text-xl  md:text-2xl lg:text-4xl xl:text-5xl  text-center mb-5 ">
                Reset Password
              </p>

              {/* ERROR */}
              {Error && (
                <p className="text-xl sm:text-2xl md:text-3xl text-red-600">
                  {Error}
                </p>
              )}

              {/* FORM */}

              <form onSubmit={handleSubmit} className=" flex flex-col">
                {errors.password && touched.password && (
                  <p className="text-red-500 text-lg sm:text-xl py-3">
                    {errors.password}
                  </p>
                )}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="password"
                  className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl  mb-5"
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <p className="text-red-500 text-lg sm:text-xl py-3">
                      {errors.passwordConfirmation}
                    </p>
                  )}
                <input
                  type="password"
                  name="passwordConfirmation"
                  onChange={handleChange}
                  placeholder="password confirm"
                  className="p-5 border-2 border-gray-400 outline-none rounded-lg text-xl sm:text-2xl lg:text-3xl  mb-5"
                />
                <button
                  type="submit"
                  className="p-5 bg-black text-white text-xl sm:text-2xl lg:text-3xl rounded-lg mb-5"
                >
                  Reset Password
                </button>
              </form>
            </div>
          ) : (
            <Checked msg="Password has been changed" route={true} />
          )}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

export async function getServerSideProps({ params }) {
  const check_for_expire = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/reset-password/${params.resetToken}`
  );
  const data = await check_for_expire.json();
  const expired =
    data !== ("Reset token has expired" || "Invalid token") ? false : true;

  return {
    props: { expired, token: params.resetToken },
  };
}
