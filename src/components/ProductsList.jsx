import React, { useMemo } from "react";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({ products, onSelectedChange, criteria = {}, system }) => {
  console.log("criteria", criteria);
  console.log("products", products);

  // Group products for system1 based on title, company, and category
  const groupedProductsSystem1 = useMemo(() => {
    if (system !== "system1" || !products) return [];

    return products.reduce((acc, product) => {
      const {
        id,
        attributes: { title, company, category, price },
      } = product;
      const key = `${title}-${company}-${category}`;

      if (!acc[key]) {
        acc[key] = { title, company, category, prices: [{ id, price }] };
      } else {
        acc[key].prices.push({ id, price });
      }

      return acc;
    }, {});
  }, [products, system]);

  // Render for system2: Display selected categories, shipping, and features
  const renderSystem2Criteria = () => {
    if (system !== "system2") return null;

    // Safely access criteria properties
    const category = criteria?.category || [];
    const shipping = criteria?.shipping || [];
    const featured = criteria?.featured || [];

    // Function to join array values or return "N/A" for empty arrays
    const formatCriteria = (arr) => (arr.length > 0 ? arr.join(", ") : "N/A");

    return (
      <div className="p-8 rounded-lg flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 flex-wrap bg-white shadow-xl hover:shadow-2xl duration-300">
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">
            Category: {formatCriteria(category)}
          </h4>
          <p>Shipping: {formatCriteria(shipping)}</p>
          <p>Featured: {formatCriteria(featured)}</p>
        </div>
      </div>
    );
  };

  // Early return for system2 to display criteria selection only
  if (system === "system2") {
    return renderSystem2Criteria();
  }

  return (
    <div className="mt-12">
      {system === "system1" &&
        Object.values(groupedProductsSystem1).map((group) => (
          <div
            key={`${group.title}-${group.company}-${group.category}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 flex-wrap bg-white shadow-xl hover:shadow-2xl duration-300"
          >
            <div className="flex-grow">
              <h4 className="text-lg font-semibold">Title: {group.title}</h4>
              <p>Company: {group.company}</p>
              <p>Category: {group.category}</p>
              <div>
                Prices:
                {group.prices.map(({ id, price }) => (
                  <div key={id} className="flex items-center gap-2">
                    <FormCheckbox
                      name={`price-${id}`}
                      checked={false} // Adjust based on actual selection state
                      onChange={(e) =>
                        onSelectedChange(id, price, e.target.checked)
                      }
                    />
                    <span>{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
