import { Filters, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import jsonData from "../assets/dummy.json";
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
  const [products, setProducts] = useState(jsonData.data);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [system1FiltersApplied, setSystem1FiltersApplied] = useState(false);
  const [system2FiltersApplied, setSystem2FiltersApplied] = useState(false);

  const handleFilterSubmit = useCallback((system1Criteria, system2Criteria) => {
    let filtered = jsonData.data;

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
          system1Criteria.prices.includes(product.attributes.price.toString());
        return matchTitle && matchCompany && matchPrice;
      });
      setSystem1FiltersApplied(true);
    } else {
      setSystem1FiltersApplied(false);
    }

    if (system2Criteria) {
      filtered = filtered.filter((product) => {
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
      setSystem2FiltersApplied(true);
    } else {
      setSystem2FiltersApplied(false);
    }

    setFilteredProducts(filtered);
  }, []);

  const handleReset = useCallback(() => {
    window.location.reload();
    setFilteredProducts([]);
    setSystem1FiltersApplied(false);
    setSystem2FiltersApplied(false);
  }, []);

  const generateOptions = (attribute) =>
    useMemo(
      () => [
        ...new Set(
          jsonData.data.map((product) => product.attributes[attribute])
        ),
      ],
      [products]
    );

  // Options for select inputs
  const titlesOptions = generateOptions("title");
  const companiesOptions = generateOptions("company");
  const pricesOptions = generateOptions("price");
  const categoryOptions = generateOptions("category");
  const shippingOptions = generateOptions("shipping");
  const featuredOptions = generateOptions("featured");

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-grow p-4">
          <Filters
            onFilterSubmit={handleFilterSubmit}
            onReset={handleReset}
            titlesOptions={titlesOptions}
            companiesOptions={companiesOptions}
            pricesOptions={pricesOptions}
            categoryOptions={categoryOptions}
            shippingOptions={shippingOptions}
            featuredOptions={featuredOptions}
          />
        </div>

        {filteredProducts.length > 0 && (
          <div className="w-2/3 p-4">
            <ProductsContainer
              products={filteredProducts}
              enableNextStep={system1FiltersApplied && system2FiltersApplied}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
