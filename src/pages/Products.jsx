import { useEffect } from "react";
import { Filters, ProductsContainer } from "../components";
import sourceData from "../assets/source1.json";
import sourceData2 from "../assets/dummy2.json";
import { useState, useCallback, useMemo } from "react";

const Products = () => {
  const [source, setSource] = useState(Object.values(sourceData));
  const [source2, setSource2] = useState(Object.values(sourceData2));

  const [selectedTitle, setSelectedTitle] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);
  const [system1Criteria, setSystem1Criteria] = useState(null);
  const [system2Criteria, setSystem2Criteria] = useState(null);
  const [system1FiltersMessage, setSystem1FiltersMessage] = useState("");
  const [system2FiltersMessage, setSystem2FiltersMessage] = useState("");
  const extractCriteriaValues = (criteria) => {
    // Ensure criteria is an object
    if (typeof criteria !== "object" || criteria === null) {
      return {};
    }

    return Object.keys(criteria).reduce((acc, key) => {
      // Ensure each criteria field is an array before attempting to map
      if (Array.isArray(criteria[key])) {
        acc[key] = criteria[key].map((c) => c.value?.toLowerCase());
      } else {
        // Initialize as empty to handle non-array or undefined criteria fields
        acc[key] = [];
      }
      return acc;
    }, {});
  };
  const filterData = (data, criteriaValues) => {
    return data.filter((product) =>
      Object.entries(criteriaValues).every(
        ([key, values]) =>
          values.length === 0 || values.includes(product[key]?.toLowerCase())
      )
    );
  };

  const handleFilterSubmit = useCallback(
    (system1Criteria = {}, system2Criteria = {}) => {
      const system1Values = extractCriteriaValues(system1Criteria);
      const system2Values = extractCriteriaValues(system2Criteria);

      if (Object.keys(system1Values).length > 0) {
        const filtered = filterData(Object.values(sourceData), system1Values);
        setFilteredProducts(filtered);
        setSystem1Criteria(system1Criteria);
        setSystem1FiltersMessage(
          filtered.length ? "" : "No matches in System 1"
        );
      }

      if (Object.keys(system2Values).length > 0) {
        const filtered2 = filterData(Object.values(sourceData2), system2Values);
        setFilteredProducts2(filtered2);
        setSystem2Criteria(system2Criteria);
        setSystem2FiltersMessage(
          filtered2.length ? "" : "No matches in System 2"
        );
      }
    },
    [source, source2]
  );

  const handleFilterReset = useCallback(() => {
    setSelectedTitle([]);
    setSelectedCategory([]);
    setFilteredProducts([]);
    setFilteredProducts2([]);
    setSystem1FiltersMessage("");
    setSystem2FiltersMessage("");
  }, []);

  const generateOptions = useCallback((attribute, dataset) => {
    return [
      ...new Set(
        dataset.map((item) => item[attribute]?.toLowerCase()).filter(Boolean)
      ),
    ].sort();
  }, []);

  const titlesOptions = generateOptions("field1", source);

  const categoryOptions = generateOptions("category", source2);

  const handleTitleSelectionChange = (newTitle) => {
    setSelectedTitle(...newTitle);
  };

  const handleCategorySelectionChange = (newCategory) => {
    setSelectedCategory(...newCategory);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-grow p-4">
          <Filters
            onFilterSubmit={handleFilterSubmit}
            onReset={handleFilterReset}
            generateOptions={generateOptions}
            //sys1 sections
            source={source}
            system1Criteria={system1Criteria}
            titlesOptions={titlesOptions}
            selectedTitle={selectedTitle}
            handleTitleSelectionChange={handleTitleSelectionChange}
            //sys2 sections
            source2={source2}
            system2Criteria={system2Criteria}
            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            handleCategorySelectionChange={handleCategorySelectionChange}
            system2HasResults={filteredProducts.length > 0}
          />
        </div>

        <div className="flex-grow p-4">
          {/* Display specific messages based on filter results */}
          {(system1FiltersMessage || system2FiltersMessage) && (
            <div className="text-2xl mt-16 p-4">
              <h5 className="text-2xl mt-16">
                Sorry, no products matched your search...
              </h5>
            </div>
          )}

          {(filteredProducts.length > 0 || filteredProducts2.length > 0) && (
            <ProductsContainer
              products={filteredProducts}
              products2={filteredProducts2}
              system1Criteria={system1Criteria}
              system2Criteria={system2Criteria}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
