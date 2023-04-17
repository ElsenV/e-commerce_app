import Category from "@/components/Category";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <div className="p-4 sm:p-10">
      <Category data={data} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const a = await fetch("https://fakestoreapi.com/products");
  const res = await a.json();
  return {
    props: { data: res }, // will be passed to the page component as props
  };
}
