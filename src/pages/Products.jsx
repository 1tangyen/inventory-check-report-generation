import { useEffect } from "react";
import { Filters, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import jsonData from "../assets/dummy.json";
import sourceData from "../assets/source1.json";
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
  const [source, setSource] = useState(Object.values(sourceData));
  const [products2] = useState(dummy2.data);
  const [selectedTitle, setSelectedTitle] = useState("");
  // Use useEffect to filter other options based on selectedTitle

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);
  const [system1Criteria, setSystem1Criteria] = useState(null);
  const [system2Criteria, setSystem2Criteria] = useState(null);
  const [system1FiltersMessage, setSystem1FiltersMessage] = useState("");
  const [system2FiltersMessage, setSystem2FiltersMessage] = useState("");

  // filter function to filter selected options exist in source data
  // console.log("system1Criteria", system1Criteria);
  const handleFilterSubmit = useCallback(
    (system1Criteria) => {
      let filtered = source;

      if (system1Criteria) {
        filtered = filtered.filter((product) => {
          const matchField1 =
            system1Criteria.field1.length === 0 ||
            system1Criteria.field1.includes(product.field1.toLowerCase());
          const matchField2 =
            system1Criteria.field2.length === 0 ||
            system1Criteria.field2.includes(product.field2.toLowerCase());
          const matchField3 =
            system1Criteria.field3.length === 0 ||
            system1Criteria.field3.includes(product.field3.toLowerCase());
          const matchField4 =
            system1Criteria.field4.length === 0 ||
            system1Criteria.field4.includes(product.field4.toLowerCase());
          const matchField5 =
            system1Criteria.field5.length === 0 ||
            system1Criteria.field5.includes(product.field5.toLowerCase());
          const matchField6 =
            system1Criteria.field6.length === 0 ||
            system1Criteria.field6.includes(product.field6.toLowerCase());
          const matchField7 =
            system1Criteria.field7.length === 0 ||
            system1Criteria.field7.includes(product.field7.toLowerCase());
          const matchField8 =
            system1Criteria.field8.length === 0 ||
            system1Criteria.field8.includes(product.field8.toLowerCase());
          const matchField9 =
            system1Criteria.field9.length === 0 ||
            system1Criteria.field9.includes(product.field9.toLowerCase());
          const matchField10 =
            system1Criteria.field10.length === 0 ||
            system1Criteria.field10.includes(product.field10.toLowerCase());
          return (
            matchField1 &&
            matchField2 &&
            matchField3 &&
            matchField4 &&
            matchField5 &&
            matchField6 &&
            matchField7 &&
            matchField8 &&
            matchField9 &&
            matchField10
          );
        });
        setFilteredProducts(filtered);
        setSystem1Criteria(system1Criteria);
        setSystem1FiltersMessage(
          filtered.length > 0
            ? ""
            : "Sorry, no products matched your search from System 1..."
        );
      }
    },
    [filteredProducts, filteredProducts2]
  );

  const handleFilterReset = useCallback(() => {
    window.location.reload();
    setSelectedTitle("");
    setSource(sourceData);
    setSystem1Criteria(null);
    setSystem2Criteria(null);
    setFilteredProducts([]);
    setFilteredProducts2([]);
    setSystem1FiltersMessage("");
    setSystem2FiltersMessage("");
  }, []);
  // Extract initial options from source

  const generateOptions2 = (attribute, dataset) => {
    return useMemo(() => {
      const optionsSet = new Set();
      for (const key in dataset) {
        const item = dataset[key];
        const value = item[attribute];

        if (value != null) {
          optionsSet.add(String(value).toLowerCase());
        }
      }
      const optionsArray = Array.from(optionsSet);
      return optionsArray.sort();
    }, [attribute, dataset]);
  };
  const titlesOptions = generateOptions2("field1", source);
  const companiesOptions = generateOptions2("field2", source);
  const pricesOptions = generateOptions2("field3", source);
  const field4Options = generateOptions2("field4", source);
  const field5Options = generateOptions2("field5", source);
  const field6Options = generateOptions2("field6", source);
  const field7Options = generateOptions2("field7", source);
  const field8Options = generateOptions2("field8", source);
  const field9Options = generateOptions2("field9", source);
  const field10Options = generateOptions2("field10", source);

  // Handle title selection change
  const handleTitleSelectionChange = (newTitle) => {
    setSelectedTitle(newTitle);
  };

  useEffect(() => {
    if (selectedTitle && selectedTitle.length > 0) {
      const normalizedSelectedTitles = selectedTitle.map((item) =>
        item.value.toLowerCase()
      );

      const filteredSource = source.filter((item) =>
        normalizedSelectedTitles.includes(item.field1.toLowerCase())
      );

      setSource(filteredSource);
      // setTitlesOptions(selectedTitle);
    } else {
      // Reset to the original source data
      setSource(Object.values(sourceData));
    }
  }, [selectedTitle]);

  const generateOptions = (attribute, dataset) => {
    return useMemo(() => {
      return [
        ...new Set(dataset.map((product) => product.attributes[attribute])),
      ];
    }, [dataset]);
  };

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
            //sys1 sections
            source={source}
            titlesOptions={titlesOptions}
            handleTitleSelectionChange={handleTitleSelectionChange}
            companiesOptions={companiesOptions}
            pricesOptions={pricesOptions}
            field4Options={field4Options}
            field5Options={field5Options}
            field6Options={field6Options}
            field7Options={field7Options}
            field8Options={field8Options}
            field9Options={field9Options}
            field10Options={field10Options}
            //sys2 sections
            system2HasResults={filteredProducts.length > 0}
            categoryOptions={categoryOptions}
            shippingOptions={shippingOptions}
            featuredOptions={featuredOptions}
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
