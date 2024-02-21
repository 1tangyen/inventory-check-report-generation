import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";

const ProductsContainer = ({
  products,
  products2,
  system1Criteria,
  system2Criteria,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);

  const [selectedPrices, setSelectedPrices] = useState(
    new Set(products.map((product) => product.attributes.price))
  );

  useEffect(() => {
    // Update to reflect changes in products
    const newSelectedPrices = new Set(
      products.map((product) => product.attributes.price)
    );
    setSelectedPrices(newSelectedPrices);
  }, [products]);

  // Update handlePriceChange to work with prices directly
  const handlePriceChange = (price, isChecked) => {
    setSelectedPrices((current) => {
      const updated = new Set(current);
      if (isChecked) {
        updated.add(price);
      } else {
        updated.delete(price);
      }
      return updated;
    });
  };

  const generateUniqueId = () => {
    return `id_${new Date().getTime()}`;
  };

  useEffect(() => {
    const criteria1Selected =
      system1Criteria &&
      Object.values(system1Criteria).some((criteria) => criteria.length > 0);
    const criteria2Selected =
      system2Criteria &&
      Object.values(system2Criteria).some((criteria) => criteria.length > 0);

    const bothSystemsSubmitted = criteria1Selected && criteria2Selected;
    const eitherProductsEmpty = products.length === 0 || products2.length === 0;

    setEnableNextStep(bothSystemsSubmitted && !eitherProductsEmpty);

    if (selectedPrices.size === 0) {
      setEnableNextStep(false);
    }
  }, [selectedPrices, products, products2]);

  const handleNextStep = () => {
    const uniqueId = generateUniqueId();
    const passedResults = {
      title: system1Criteria.titles.join(", "),
      prices: [...selectedPrices],
      category: system2Criteria?.category?.join(", ") || "N/A",
      shipping: system2Criteria?.shipping?.join(", ") || "N/A",
      feature: system2Criteria?.featured?.join(", ") || "N/A",
      id: uniqueId,
    };
    console.log("Proceed to the next step with selections:", passedResults);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="justify-between items-center mt-8">
          <h3 className="font-medium text-md my-2">
            {products.length > 0 &&
              `System1: ${selectedPrices.size} product(s) `}
          </h3>
          <h3 className="font-medium text-md my-2">
            {products2.length > 0 &&
              `System2: ${system2Criteria.category.length} product(s)`}
          </h3>
          <p className="my-2">{enableNextStep && "Procced to next step"}</p>
        </div>
        <>
          {/* Pass `system` prop to ProductsList and update accordingly */}
          {products.length > 0 && selectedPrices.size > 0 && (
            <ProductsList
              products={products}
              selectedPrices={selectedPrices}
              onPriceChange={handlePriceChange}
              criteria={system1Criteria}
              system="system1"
            />
          )}
          {products2.length > 0 && (
            <ProductsList
              products={products2}
              selectedPrices={selectedPrices}
              onPriceChange={handlePriceChange}
              criteria={system2Criteria}
              system="system2"
            />
          )}

          <div className="flex justify-end">
            <button
              disabled={!enableNextStep}
              onClick={handleNextStep}
              className="btn btn-primary"
            >
              Next Step
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default ProductsContainer;
