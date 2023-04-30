import Cart from "./Cart";

const Category = ({ data }) => {
  
  return (
    <div className="bg-gray-100 p-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full h-full ">
      {data.map((Product) => (
        <Cart product={Product} key={Product.id} />
      ))}
    </div>
  );
};

export default Category;
