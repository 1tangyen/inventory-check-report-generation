import { useLoaderData } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useState } from "react";

// const ProductsContainer = () => {
// const { meta } = useLoaderData();

//using dummy
const ProductsContainer = ({ products }) => {
  const totalProducts = products.length;
  const [selectedPrices, setSelectedPrices] = useState(new Set());

  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  const handlePriceChange = (productId, price, isChecked) => {
    setSelectedPrices((currentPrices) => {
      const updatedPrices = new Set(currentPrices);
      const priceKey = `${productId}-${price}`;

      if (isChecked) {
        updatedPrices.add(priceKey);
      } else {
        updatedPrices.delete(priceKey);
      }

      return updatedPrices;
    });
  };

  const handleNextStep = () => {
    // Here you would handle the next step, possibly sending selectedPrices somewhere
    // For demonstration, we'll just log them to the console
    console.log(selectedPrices);
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
        <>
          <ProductsList
            products={products}
            selectedPrices={selectedPrices}
            onPriceChange={handlePriceChange}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNextStep}
              className="btn btn-primary"
              type="button"
            >
              Next Step
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsContainer;
