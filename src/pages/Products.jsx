import { useEffect } from "react";
import { Filters, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import jsonData from "../assets/dummy.json";
import dummy2 from "../assets/dummy2.json";
import { useLoaderData } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";

// const url = "/products";

// export const loader = async ({ request }) => {
//   const response = await customFetch(url);
//   const products = response.data.data;
//   const meta = response.data.meta;
//   return { products, meta };
// };

const Products = () => {
  const [products] = useState(jsonData.data);
  const [products2] = useState(dummy2.data);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);
  const [system1Criteria, setSystem1Criteria] = useState(null);
  const [system2Criteria, setSystem2Criteria] = useState(null);
  const [system1FiltersMessage, setSystem1FiltersMessage] = useState("");
  const [system2FiltersMessage, setSystem2FiltersMessage] = useState("");

  const handleFilterSubmit = useCallback(
    (system1Criteria, system2Criteria) => {
      let filtered = products;
      let filtered2 = products2;

      if (system1Criteria) {
        filtered = filtered.filter((product) => {
          const matchTitle =
            system1Criteria.titles.length === 0 ||
            system1Criteria.titles.includes(product.attributes.title);
          const matchCompany =
            system1Criteria.companies.length === 0 ||
            system1Criteria.companies.includes(product.attributes.company);
          const matchPrice =
            system1Criteria.prices.length === 0 ||
            system1Criteria.prices.includes(
              product.attributes.price.toString()
            );
          return matchTitle && matchCompany && matchPrice;
        });
        setFilteredProducts(filtered);
        setSystem1Criteria(system1Criteria);
      }

      if (system2Criteria) {
        filtered2 = products2.filter((product) => {
          const matchCategory =
            system2Criteria.category.length === 0 ||
            system2Criteria.category.includes(product.attributes.category);
          const matchShipping =
            system2Criteria.shipping.length === 0 ||
            system2Criteria.shipping.includes(product.attributes.shipping);
          const matchFeatured =
            system2Criteria.featured.length === 0 ||
            system2Criteria.featured.includes(product.attributes.featured);
          return matchCategory && matchShipping && matchFeatured;
        });
        setFilteredProducts2(filtered2);
        setSystem2Criteria(system2Criteria);
      }
    },
    [filteredProducts, filteredProducts2]
  );

  const handleFilterReset = useCallback(() => {
    window.location.reload();
    setSystem1Criteria(null);
    setSystem2Criteria(null);
    //   setFilteredProducts([]);
    //   setFilteredProducts2([]);
  }, []);

  const generateOptions = (attribute, dataset) => {
    return useMemo(() => {
      return [
        ...new Set(dataset.map((product) => product.attributes[attribute])),
      ];
    }, [dataset]);
  };

  // Options for select inputs
  const titlesOptions = generateOptions("title", products);
  const companiesOptions = generateOptions("company", products);
  const pricesOptions = generateOptions("price", products);
  const categoryOptions = generateOptions("category", products2);
  const shippingOptions = generateOptions("shipping", products2);
  const featuredOptions = generateOptions("featured", products2);

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-grow p-4">
          <Filters
            onFilterSubmit={handleFilterSubmit}
            onReset={handleFilterReset}
            titlesOptions={titlesOptions}
            companiesOptions={companiesOptions}
            pricesOptions={pricesOptions}
            categoryOptions={categoryOptions}
            shippingOptions={shippingOptions}
            featuredOptions={featuredOptions}
          />
        </div>
        {system1Criteria && filteredProducts.length === 0 && (
          <div className="flex-grow p-4">
            <h5 className="text-2xl mt-16">
              Sorry, no products matched your search...
            </h5>
          </div>
        )}
        {system2Criteria && filteredProducts2.length === 0 && (
          <div className="flex-grow p-4">
            <h5 className="text-2xl mt-16">
              Sorry, no products matched your search...
            </h5>
          </div>
        )}
        {(filteredProducts.length > 0 || filteredProducts2.length > 0) && (
          <div className="flex-grow p-4">
            <ProductsContainer
              products={filteredProducts}
              products2={filteredProducts2}
              system1Criteria={system1Criteria}
              system2Criteria={system2Criteria}
              system1FiltersMessage={system1FiltersMessage}
              system2FiltersMessage={system2FiltersMessage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
