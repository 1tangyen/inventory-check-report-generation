import React from "react";
import FormCheckbox from "./FormCheckbox";
import { nanoid } from "nanoid";

const ProductList = ({
  products,
  selectedPrices,
  onPriceChange,
  criteria,
  system,
}) => {
  // Group products by `field1` and accumulate their `field7` values (prices)
  const groupedProducts = React.useMemo(() => {
    const groups = {};
    products.forEach(({ field1, field7 }) => {
      if (!groups[field1]) {
        groups[field1] = [];
      }
      groups[field1].push(field7);
    });
    return groups;
  }, [products]);

  const handleCheckboxChange = (price, isChecked) => {
    onPriceChange(price, isChecked);
  };

  const renderSystem2Criteria = () => {
    if (system !== "system2") return null;

    const category = criteria?.category || [];
    const field7 = criteria?.field7 || [];
    const field8 = criteria?.field8 || [];

    const formatCriteria = (arr) => {
      if (arr.length > 0) {
        // Extract the 'value' from each object and join
        return arr.map((item) => item.value).join(", ");
      }
      return "N/A";
    };

    const categoryCriteria = formatCriteria(category);
    const field7Criteria = formatCriteria(field7);
    const field8Criteria = formatCriteria(field8);

    return (
      <div className="p-8 rounded-lg bg-white shadow-xl hover:shadow-2xl duration-300">
        <div className="flex-grow items-center gap-2 my-2">
          <h4 className="text-lg font-semibold">
            Category: {categoryCriteria}
          </h4>
          <p>Field 7: {field7Criteria} </p>
          <p>Field 8: {field8Criteria}</p>
        </div>
      </div>
    );
  };

  if (system === "system2") {
    return renderSystem2Criteria();
  }

  return (
    <div className="mt-12">
      {system === "system1" &&
        Object.entries(groupedProducts).map(([title, field_7]) => (
          <div
            key={nanoid()}
            className="p-8 rounded-lg bg-white shadow-xl hover:shadow-2xl duration-300"
          >
            <h4 className="text-lg font-semibold mb-4">Title: {title}</h4>
            <div>
              Prices:
              {field_7.map((price) => (
                <div key={nanoid()} className="flex items-center gap-2 my-2">
                  <FormCheckbox
                    checked={selectedPrices.has(price)}
                    onChange={(e) =>
                      handleCheckboxChange(price, e.target.checked)
                    }
                  />
                  <span>{price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
