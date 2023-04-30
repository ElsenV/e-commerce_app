import Category from "@/components/Category";
import { CHECK_FOR_LOGIN } from "@/state/reducer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <div className="p-4 sm:p-10">
      <Category data={data} />
    </div>
  );
}

export async function getServerSideProps() {
 
  const data = await fetch("https://fakestoreapi.com/products");
  const res = await data.json();
  return {
    props: { data: res },
  };
}
