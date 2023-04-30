import { useFormik } from "formik";
import * as Yup from "yup";

const About = ({ user }) => {
  /**VALIDATION */
  const validation = Yup.object().shape({
    nameSurname: Yup.string().required(),
    Phone: Yup.string().required().min(12, "Must be more than 10 characters"),
    Address: Yup.string().required(),
    Info: Yup.string(),
  });

  /** FORMIK FORM  */
  const formik = useFormik({
    initialValues: {
      nameSurname: user?.Username,
      Phone: user?.Phone,
      Address: user?.Address,
      Info: user?.OptionalDemand,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/about/${user.Username}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div
      className="w-full   md:grid grid-cols-4 gap-10   p-10"
      style={{ height: "calc(100vh - 280px)" }}
    >
      <div className=" md:col-span-2 ">
        <form onSubmit={handleSubmit}>
          <p className="text-xl sm:text-2xl md:text-3xl">Username</p>
          {errors.nameSurname && touched.nameSurname && (
            <p className="text-red-500 pb-1 text-lg">{errors.nameSurname}</p>
          )}
          <input
            type="text"
            name="nameSurname"
            className="w-full h-14 mb-5 p-5 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Name,Surname "
            onChange={handleChange}
            value={values.nameSurname}
          />
          <p className="text-xl sm:text-2xl md:text-3xl">Phone</p>
          {errors.Phone && touched.Phone && (
            <p className="text-red-500 pb-1 text-lg">{errors.Phone}</p>
          )}
          <input
            type="text"
            name="Phone"
            className="w-full h-14 mb-5 p-5 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Phone "
            onChange={handleChange}
            value={values.Phone}
          />
          <p className="text-xl sm:text-2xl md:text-3xl">Address</p>
          {errors.Address && touched.Address && (
            <p className="text-red-500 pb-1 text-lg">{errors.Address}</p>
          )}
          <input
            type="address"
            name="Address"
            className="w-full h-14 mb-5 p-5 rounded-md outline-none border-2 border-gray-400 "
            placeholder="Address "
            onChange={handleChange}
            value={values.Address}
          />
          <p className="text-xl sm:text-2xl md:text-3xl">Info</p>
          <textarea
            rows="3"
            name="Info"
            className="w-full  mb-6 p-5 rounded-md outline-none border-2 border-gray-400 resize-none "
            placeholder="Info"
            onChange={handleChange}
            value={values.Info}
          />
          <button
            type="submit"
            className="w-full p-5 bg-slate-900 rounded-md text-white text-2xl"
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
  const res = await fetch(`http://localhost:3000/api/about/${params.username}`);
  const data = await res.json();

  return {
    props: {
      user: data,
    },
  };
}