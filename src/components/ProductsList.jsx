import { useMemo } from "react";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({
  products,
  selectedPrices,
  onPriceChange,
  criteria = {},
  system,
}) => {
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

  const handleCheckboxChange = (price, isChecked) => {
    onPriceChange(price, isChecked);
  };

  const renderSystem2Criteria = () => {
    if (system !== "system2") return null;

    const category = criteria?.category || [];
    const shipping = criteria?.shipping || [];
    const featured = criteria?.featured || [];

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
                      key={price}
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
          </div>
        ))}
    </div>
  );
};

export default ProductList;
