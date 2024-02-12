import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import FormTable from "./FormTable";

// const ProductsContainer = () => {
// const { meta } = useLoaderData();

//using dummy
const ProductsContainer = ({ products }) => {
  const totalProducts = products.length;

  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts !== 1 ? "s" : ""}
        </h4>
      </div>

      {totalProducts === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : (
        <ProductsList products={products} />
      )}
    </>
  );
};

export default ProductsContainer;
