import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";

const ProductsContainer = ({
  products,
  products2,
  system1Criteria,
  system2Criteria,
  system1FiltersMessage,
  system2FiltersMessage,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);

  // Determine if there's at least one criteria from each system and if there are results for both products lists
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
  }, [system1Criteria, system2Criteria, products, products2]);

  const [selectedPrices, setSelectedPrices] = useState(
    new Set([
      ...products.map((product) => `${product.id}-${product.attributes.price}`),
      ...products2.map(
        (product) => `${product.id}-${product.attributes.price}`
      ),
    ])
  );

  useEffect(() => {
    // Update selected prices if products change
    const newSelectedPrices = new Set([
      ...products.map((product) => `${product.id}-${product.attributes.price}`),
      ...products2.map(
        (product) => `${product.id}-${product.attributes.price}`
      ),
    ]);
    setSelectedPrices(newSelectedPrices);
  }, [products, products2]);

  const handlePriceChange = (productId, price, isChecked) => {
    setSelectedPrices((current) => {
      const updated = new Set(current);
      const key = `${productId}-${price}`;
      if (isChecked) updated.add(key);
      else updated.delete(key);
      return updated;
    });
  };

  const handleNextStep = () => {
    console.log(
      "Proceed to the next step with selected prices:",
      Array.from(selectedPrices)
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mt-8">
          <h4 className="font-medium text-md">
            {enableNextStep
              ? `System1: ${products.length} product(s)  System2: ${products2.length} product(s)`
              : system1FiltersMessage || system2FiltersMessage}
          </h4>
        </div>
        {/* Show sorry message if either list of products is empty */}

        <>
          <div>
            <ProductsList
              products={products}
              selectedPrices={selectedPrices}
              onPriceChange={handlePriceChange}
              criteria={system1Criteria}
            />
          </div>
          <div>
            <ProductsList
              products={products2}
              selectedPrices={selectedPrices}
              onPriceChange={handlePriceChange}
              criteria={system2Criteria}
            />
          </div>
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
