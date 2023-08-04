import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const About = ({ user }) => {
  const router = useRouter();

  /**VALIDATION */
  const validation = Yup.object().shape({
    username: Yup.string().required(),
    Phone: Yup.string().required().min(12, "Must be more than 10 characters"),
    Address: Yup.string().required(),
    Info: Yup.string(),
  });

  /** FORMIK FORM  */
  const formik = useFormik({
    initialValues: {
      username: user?.Username,
      Phone: user?.Phone,
      Address: user?.Address,
      Info: user?.OptionalDemand,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/about/${user.Username}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const data = await res.json();

        router.replace(`/about/${data.Username}`);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className={` sm:h-auto w-full pt-4 flex justify-center `}>
      <div className={`w-[250px] sm:w-[400px] md:w-[500px] lg:w-[700px]`}>
        <form onSubmit={handleSubmit}>
          <p className="text-md sm:text-xl md:text-2xl font-bold pb-2">
            Username
          </p>
          {errors.username && touched.username && (
            <p className="text-red-500 pb-1 text-lg">{errors.username}</p>
          )}
          <input
            type="text"
            name="username"
            className="w-full h-10 mb-5 p-4 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Name,Surname "
            onChange={handleChange}
            value={values.username}
          />
          <p className="text-md sm:text-xl md:text-2xl font-bold pb-2">Phone</p>
          {errors.Phone && touched.Phone && (
            <p className="text-red-500 pb-1 text-lg">{errors.Phone}</p>
          )}
          <input
            type="text"
            name="Phone"
            className="w-full h-10 mb-5 p-4 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Phone "
            onChange={handleChange}
            value={values.Phone}
          />
          <p className="text-md sm:text-xl md:text-2xl font-bold pb-2">
            Address
          </p>
          {errors.Address && touched.Address && (
            <p className="text-red-500 pb-1 text-lg">{errors.Address}</p>
          )}
          <input
            type="address"
            name="Address"
            className="w-full h-10 mb-5 p-4 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Address "
            onChange={handleChange}
            value={values.Address}
          />
          <p className="text-md sm:text-xl md:text-2xl font-bold pb-2">Info</p>
          <textarea
            rows="2"
            name="Info"
            className="w-full  mb-4 p-5 rounded-md outline-none border-2 border-gray-400 resize-none "
            placeholder="Info"
            onChange={handleChange}
            value={values.Info}
          />
          <button
            type="submit"
            className="w-full p-4 bg-slate-900 rounded-md text-white text-md sm:text-xl md:text-2xl mb-5"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/about/${params.username}`
  );
  const data = await res.json();

  return {
    props: {
      user: data,
    },
  };
}
