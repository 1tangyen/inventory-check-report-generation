import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsList from "./ProductsList";

const ProductsContainer = ({
  products,
  products2,
  system1Criteria,
  system2Criteria,
}) => {
  const [selectedPrices, setSelectedPrices] = useState(
    new Set(products.map((product) => product.field7))
  );
  const [enableNextStep, setEnableNextStep] = useState(false);

  useEffect(() => {
    const criteriaSystem1Selected =
      system1Criteria &&
      Object.values(system1Criteria).some((criteria) => criteria.length > 0);

    const criteriaSystem2Selected =
      system2Criteria &&
      Object.values(system2Criteria).some((criteria) => criteria.length > 0);

    const bothSystemsHaveSelections =
      criteriaSystem1Selected && criteriaSystem2Selected;

    const eitherProductsEmpty = products.length === 0 || products2.length === 0;
    setEnableNextStep(bothSystemsHaveSelections && !eitherProductsEmpty);
  }, [products2, products]);

  useEffect(() => {
    // Update to reflect changes in products
    const newSelectedfield7 = new Set(
      products.map((product) => product.field7)
    );

    setSelectedPrices(newSelectedfield7);
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

  const navigate = useNavigate();

  const handleNextStep = () => {
    const field4Value = products.length > 0 ? products[0].field4 : "default";
    const uniqueId = `${field4Value}_${new Date().getTime()}`;

    const formatCriteriaValues = (criteria) => {
      return criteria.map((c) => c.value).join(", ");
    };

    const system1Title =
      system1Criteria.field1 && system1Criteria.field1.length > 0
        ? formatCriteriaValues(system1Criteria.field1)
        : "N/A";
    const system2Category =
      system2Criteria.category && system2Criteria.category.length > 0
        ? formatCriteriaValues(system2Criteria.category)
        : "N/A";
    const system2Field7 =
      system2Criteria.field7 && system2Criteria.field7.length > 0
        ? formatCriteriaValues(system2Criteria.field7)
        : "N/A";
    const system2Field8 =
      system2Criteria.field8 && system2Criteria.field8.length > 0
        ? formatCriteriaValues(system2Criteria.field8)
        : "N/A";

    const passedResults = {
      id: uniqueId,
      system1_title: system1Title,
      system1_prices: Array.from(selectedPrices),
      system2_title: system2Category,
      system2_field7: system2Field7,
      system2_field8: system2Field8,
    };

    console.log("Proceed to the next step with selections:", passedResults);
    navigate(`/reports/${uniqueId}`, { state: passedResults });
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="justify-between items-center mt-8">
          <h3 className="font-medium text-md my-2">
            {products.length > 0 &&
              `System1: ${selectedPrices.size} product(s)`}
          </h3>
          <h3 className="font-medium text-md my-2">
            {products2.length > 0 && `System2: ${products2.length} product(s)`}
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
