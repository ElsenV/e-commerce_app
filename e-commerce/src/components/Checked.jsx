import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Link from "next/link";

const Checked = ({ msg, route }) => {
  return (
    <div>
      <div className="flex  items-center mb-4">
        <p className="text-2xl sm:text-3xl md:text-4xl items-center inline-block mr-3">
          {msg}
        </p>
        <BsCheck2Circle className="duration-500 text-4xl sm:text-5xl md:text-7xl text-green-600" />
      </div>
      {route ? (
        <p className="text-2xl sm:text-3xl md:text-4xl text-center">
          Go to{" "}
          <Link href="/auth/login" className="text-green-700">
            Login
          </Link>{" "}
          Page
        </p>
      ) : null}
    </div>
  );
};

export default Checked;
