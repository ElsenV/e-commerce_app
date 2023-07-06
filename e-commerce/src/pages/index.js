import Category from "@/components/Category";
import Loading from "@/components/Loading";

export default function Home({ data, status }) {
  return (
    <div className="p-4 sm:p-10">
      {status === 200 ? (
        <Category data={data} />
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch("https://fakestoreapi.com/products");
  const res = await data.json();

  return {
    props: { data: res, status: data.status },
  };
}
