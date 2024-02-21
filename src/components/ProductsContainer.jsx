import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList";

const ProductsContainer = ({
  products,
  products2,
  system1Criteria,
  system2Criteria,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  // State for system1 selections: titles, companies, and prices
  const [system1Selections, setSystem1Selections] = useState({
    titles: [],
    companies: [],
    prices: new Set(),
  });
  // State for system2 selections
  const [system2Selections, setSystem2Selections] = useState({
    ...system2Criteria,
  });

  useEffect(() => {
    const bothSystemsSubmitted =
      Object.values(system1Selections).some(
        (selection) => selection.length > 0 || selection.size > 0
      ) &&
      Object.values(system2Selections).some(
        (selection) => selection.length > 0
      );
    const eitherProductsEmpty = products.length === 0 || products2.length === 0;
    setEnableNextStep(bothSystemsSubmitted && !eitherProductsEmpty);
  }, [system1Selections, system2Selections, products, products2]);

  const handleSelectedChange = (system, selection, isChecked) => {
    // Example logic for system1 (adjust according to actual data structure)
    if (system === "system1") {
      if (isChecked) {
        setSystem1Selections((prev) => ({
          ...prev,
          prices: prev.prices.add(selection), // Assuming 'selection' is the price ID for simplicity
        }));
      } else {
        setSystem1Selections((prev) => {
          const newPrices = new Set(prev.prices);
          newPrices.delete(selection);
          return { ...prev, prices: newPrices };
        });
      }
    } else if (system === "system2") {
      // Handle system2 selections similarly
      setSystem2Selections({ ...system2Criteria, ...selection });
    }
  };

  const handleNextStep = () => {
    const passedResults = {
      system1: Array.from(system1Selections.prices),
      system2: system2Selections,
    };
    console.log("Proceed to the next step with selections:", passedResults);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Component structure remains unchanged */}
        <div className="flex justify-between items-center mt-8">
          <h4 className="font-medium text-md">
            {enableNextStep
              ? `System1: ${products.length} product(s)  System2: ${products2.length} product(s)`
              : ""}
          </h4>
        </div>
        <>
          {/* Pass `system` prop to ProductsList and update accordingly */}
          {products.length > 0 && (
            <ProductsList
              products={products}
              onSelectedChange={handleSelectedChange}
              criteria={system1Criteria}
              system="system1"
            />
          )}
          {products2.length > 0 && (
            <ProductsList
              products={products2}
              onSelectedChange={handleSelectedChange}
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
