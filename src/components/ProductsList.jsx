// import { formatPrice } from "../utils";
// import { Link, useLoaderData } from "react-router-dom";

// // const ProductList = () => {
// //   const { products } = useLoaderData();

// //using dummy
// const ProductList = ({ products }) => {
//   console.log(products);
//   return (
//     <div className="mt-12 grid gap-y-8">
//       {products.map((product) => {
//         const { title, price, image, company } = product.attributes;
//         const dollarsAmount = formatPrice(price);

//         return (
//           <Link
//             key={product.id}
//             to={`/products/${product.id}`}
//             className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
//           >
//             <div className="ml-0 sm:ml-16">
//               <h3 className="capitalize font-medium text-lg">{title}</h3>
//               <h4 className="capitalize text-md text-neutral-content">
//                 {company}
//               </h4>

//               {/* COLOR */}
//             </div>

//             <p className="font-medium ml-0 sm:ml-auto text-lg">
//               {dollarsAmount}
//             </p>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState } from "react";
// import { formatPrice } from "../utils";
// import FormCheckbox from "./FormCheckbox";

// const ProductList = ({ products }) => {
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   const handleCheckboxChange = (productId, isChecked) => {
//     setSelectedProducts((current) =>
//       isChecked
//         ? [...current, productId]
//         : current.filter((id) => id !== productId)
//     );
//   };

//   return (
//     <div className="mt-12 grid gap-y-8">
//       {products.map((product) => {
//         const { id, attributes } = product;
//         const { title, price, company, category } = attributes;

//         return (
//           <div
//             key={id}
//             className="p-8 rounded-lg flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300"
//           >
//             <FormCheckbox
//               label=""
//               name={`select-${id}`}
//               defaultValue={selectedProducts.includes(id)}
//               size="md"
//               onChange={(e) => handleCheckboxChange(id, e.target.checked)}
//             />

//             <div className="flex-grow">
//               <h3 className="font-medium text-lg capitalize">{price}</h3>
//               <p>{`Company: ${company}`}</p>
//               <p>{`Category: ${category}`}</p>
//               <p>{`Category: ${title}`}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useMemo } from "react";
import { formatPrice } from "../utils";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({ products }) => {
  // We will now track selected prices instead of products
  const [selectedPrices, setSelectedPrices] = useState(new Set());

  // Handle change for price checkboxes
  const handlePriceCheckboxChange = (productId, price, isChecked) => {
    setSelectedPrices((currentPrices) => {
      const updatedPrices = new Set(currentPrices);
      const priceKey = `${productId}-${price}`;

      if (isChecked) {
        updatedPrices.add(priceKey);
      } else {
        updatedPrices.delete(priceKey);
      }

      return updatedPrices;
    });
  };

  // Transform products into a map with unique titles, companies, and categories as keys
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
          prices: [{ price: formatPrice(price), id }],
        };
        // Initialize the selected prices set
        selectedPrices.add(`${id}-${formatPrice(price)}`);
      } else {
        grouped[key].prices.push({ price: formatPrice(price), id });
        selectedPrices.add(`${id}-${formatPrice(price)}`);
      }
    });

    return Object.values(grouped);
  }, [products]);

  // Initialize selected prices
  useState(() => {
    products.forEach((product) => {
      const { id, attributes } = product;
      const priceKey = `${id}-${formatPrice(attributes.price)}`;
      selectedPrices.add(priceKey);
    });
    setSelectedPrices(selectedPrices);
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
                  defaultValue={selectedPrices.has(`${id}-${price}`)}
                  size="md"
                  onChange={(e) =>
                    handlePriceCheckboxChange(id, price, e.target.checked)
                  }
                />
                <span>{price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* <div className="flex justify-end mt-4">
        <button className="btn btn-primary" type="submit">
          Next Step
        </button>
      </div> */}
    </div>
  );
};

export default ProductList;
