import React from "react";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({ products, selectedPrices, onPriceChange, system }) => {
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

  return (
    <div className="mt-12">
      {system === "system1" &&
        Object.entries(groupedProducts).map(([title, prices]) => (
          <div
            key={title}
            className="p-8 rounded-lg bg-white shadow-xl hover:shadow-2xl duration-300"
          >
            <h4 className="text-lg font-semibold mb-4">Title: {title}</h4>
            <div>
              Prices:
              {prices.map((price, index) => (
                <div
                  key={`${title}-${price}-${index}`}
                  className="flex items-center gap-2 my-2"
                >
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
