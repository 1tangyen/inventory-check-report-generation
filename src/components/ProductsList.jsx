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

import React, { useState } from "react";
import { formatPrice } from "../utils";
import FormCheckbox from "./FormCheckbox";

const ProductList = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId, isChecked) => {
    setSelectedProducts((current) =>
      isChecked
        ? [...current, productId]
        : current.filter((id) => id !== productId)
    );
  };

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { id, attributes } = product;
        const { title, price, company, category } = attributes;

        return (
          <div
            key={id}
            className="p-8 rounded-lg flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300"
          >
            <FormCheckbox
              label=""
              name={`select-${id}`}
              defaultValue={selectedProducts.includes(id)}
              size="md"
              onChange={(e) => handleCheckboxChange(id, e.target.checked)}
            />

            <div className="flex-grow">
              <h3 className="font-medium text-lg capitalize">{title}</h3>
              <p>{`Company: ${company}`}</p>
              <p>{`Category: ${category}`}</p>
              <p>{price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
