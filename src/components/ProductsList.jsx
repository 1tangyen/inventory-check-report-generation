// import { formatPrice } from "../utils";
// import { Link, useLoaderData } from "react-router-dom";

// // const ProductList = () => {
// //   const { products } = useLoaderData();

import { useState, useMemo } from "react";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({ products, selectedPrices, onPriceChange }) => {
  // Group products
  const groupedProducts = useMemo(() => {
    const grouped = {};
    products.forEach((product) => {
      const { id, attributes } = product;
      const { title, company, category, price } = attributes;

      const key = `${title}-${company}-${category}`;
      if (!grouped[key]) {
        grouped[key] = {
          id,
          title,
          company,
          category,
          prices: [{ price, id }],
        };
      } else {
        grouped[key].prices.push({ price, id });
      }
    });

    return Object.values(grouped);
  }, [products]);

  return (
    <div className="mt-12 grid gap-y-8">
      {groupedProducts.map((group) => (
        <div
          key={group.id}
          className="p-8 rounded-lg flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300"
        >
          <div className="flex-grow">
            <h3 className="font-medium text-lg capitalize">{group.title}</h3>
            <p>{`Company: ${group.company}`}</p>
            <p>{`Category: ${group.category}`}</p>
            {group.prices.map(({ price, id }) => (
              <div key={`${id}-${price}`} className="flex items-center gap-2">
                <FormCheckbox
                  name={`price-${id}`}
                  checked={selectedPrices.has(`${id}-${price}`)} // This will now be `true` by default for all prices
                  onChange={(e) => onPriceChange(id, price, e.target.checked)}
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
