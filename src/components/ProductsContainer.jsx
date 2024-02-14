import { useLoaderData } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useState, useEffect } from "react";

// const ProductsContainer = () => {
// const { meta } = useLoaderData();

//using dummy
const ProductsContainer = ({ products, enableNextStep }) => {
  const totalProducts = products.length;
  const [selectedPrices, setSelectedPrices] = useState(() => {
    // Initialize with all product price IDs
    const allPriceKeys = products.map((product) => {
      const {
        id,
        attributes: { price },
      } = product;
      return `${id}-${price}`;
    });
    return new Set(allPriceKeys);
  });

  useEffect(() => {
    // If products data is dynamic, ensure selectedPrices updates when products change
    const allPriceKeys = products.map((product) => {
      const {
        id,
        attributes: { price },
      } = product;
      return `${id}-${price}`;
    });
    setSelectedPrices(new Set(allPriceKeys));
  }, [products]);

  const handlePriceChange = (productId, price, isChecked) => {
    setSelectedPrices((prevSelectedPrices) => {
      const updatedPrices = new Set(prevSelectedPrices);
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
    // Ensure selectedPrices is not empty
    if (!selectedPrices.size) {
      console.log("No prices selected");
      return;
    }

    // Group by product details and aggregate prices
    const groupedSelections = Array.from(selectedPrices).reduce(
      (acc, priceKey) => {
        const [productId, price] = priceKey.split("-");
        const product = products.find((p) => p.id.toString() === productId);

        if (!product) {
          console.warn(`Product not found for ID: ${productId}`);
          return acc;
        }

        const { title, company, category } = product.attributes;
        const key = `${title}-${company}-${category}`;

        if (!acc[key]) {
          acc[key] = { title, company, category, prices: [price] };
        } else {
          acc[key].prices.push(price);
        }

        return acc;
      },
      {}
    );

    // Convert the groupedSelections object to an array of its values
    const detailedSelections = Object.values(groupedSelections);

    console.log("Detailed selections:", detailedSelections);
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
