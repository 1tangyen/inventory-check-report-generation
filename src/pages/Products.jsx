import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import jsonData from "../assets/dummy.json";
import { useLoaderData } from "react-router-dom";
import React, { useState, useCallback } from "react";

// const url = "/products";

// export const loader = async ({ request }) => {
//   const response = await customFetch(url);
//   const products = response.data.data;
//   const meta = response.data.meta;
//   return { products, meta };
// };

const Products = () => {
  const [products, setProducts] = useState(jsonData.data);
  const [filteredProducts, setFilteredProducts] = useState(jsonData.data);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilterSubmit = useCallback((criteria) => {
    console.log(criteria);
    const filtered = jsonData.data.filter((product) => {
      const matchTitle =
        criteria.titles.length === 0 ||
        criteria.titles.includes(product.attributes.title);
      const matchCompany =
        criteria.companies.length === 0 ||
        criteria.companies.includes(product.attributes.company);
      const matchPrice =
        criteria.prices.length === 0 ||
        criteria.prices.includes(product.attributes.price.toString());

      return matchTitle && matchCompany && matchPrice;
    });

    setFilteredProducts(filtered);
    setIsFiltered(true);
  }, []);

  const handleReset = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-grow p-4">
          <Filters
            onFilterSubmit={handleFilterSubmit}
            products={products}
            onReset={handleReset}
          />
        </div>

        {isFiltered && (
          <div className="flex-grow p-4">
            <ProductsContainer products={filteredProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
