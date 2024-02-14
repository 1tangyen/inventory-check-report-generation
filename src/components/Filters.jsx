import { useMemo, useState } from "react";
import { Form, Link } from "react-router-dom";

import FormMultiSelect from "./FormMultiSelect";
import SectionTitle from "./SectionTitle";
import { GrPowerReset } from "react-icons/gr";
const Filters = ({ onFilterSubmit, products, onReset }) => {
  const generateOptions = (attribute) =>
    useMemo(
      () => [
        ...new Set(products.map((product) => product.attributes[attribute])),
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

  // Unified state for all selected options
  const [selectedFilters, setSelectedFilters] = useState({
    titles: [],
    companies: [],
    prices: [],
    category: [],
    shipping: [],
    featured: [],
  });

  // Handle change for any filter selection
  const handleChange = (filter, options) =>
    setSelectedFilters((prev) => ({ ...prev, [filter]: options || [] }));

  // Handle system1 submission
  const handleSys1Submit = (event) => {
    event.preventDefault();
    onFilterSubmit({
      titles: selectedFilters.titles.map((option) => option.value),
      companies: selectedFilters.companies.map((option) => option.value),
      prices: selectedFilters.prices.map((option) => option.value),
    });
  };

  const handleSys2Submit = (event) => {
    event.preventDefault();
    onFilterSubmit({
      category: selectedFilters.category.map((option) => option.value),
      shipping: selectedFilters.shipping.map((option) => option.value),
      featured: selectedFilters.featured.map((option) => option.value),
    });
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedFilters({
      titles: [],
      companies: [],
      prices: [],
      category: [],
      shipping: [],
      featured: [],
    });
    onReset();
  };

  return (
    <>
      <div className="bg-base-200 rounded-md p-4">
        <div className="flex justify-end">
          <button onClick={handleReset} className="btn btn-accent btn-primary">
            <GrPowerReset className="h-6 w-6" />
            Reset
          </button>
        </div>
        <div className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8">
          <SectionTitle text="system1" />
          <Form className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
            <FormMultiSelect
              label="Select Titles"
              name="titles"
              options={titlesOptions}
              value={selectedFilters.titles}
              onChange={(options) => handleChange("titles", options)}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Companies"
              name="companies"
              options={companiesOptions}
              value={selectedFilters.companies}
              onChange={(options) => handleChange("companies", options)}
              disabled={selectedFilters.titles.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedFilters.prices}
              onChange={(options) => handleChange("prices", options)}
              disabled={selectedFilters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Companies"
              name="companies"
              options={companiesOptions}
              value={selectedFilters.companies}
              onChange={(options) => handleChange("companies", options)}
              disabled={selectedFilters.titles.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedFilters.prices}
              onChange={(options) => handleChange("prices", options)}
              disabled={selectedFilters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedFilters.prices}
              onChange={(options) => handleChange("prices", options)}
              disabled={selectedFilters.titles.length === 0}
              size="w-full"
            />
          </Form>
          {/* BUTTONS */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedFilters.titles.length}
              onClick={handleSys1Submit}
            >
              Search Products
            </button>
          </div>
        </div>
        <div className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8">
          <SectionTitle text="system2" />
          <Form className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
            <FormMultiSelect
              label="Select Categories"
              name="titles"
              options={categoryOptions}
              value={selectedFilters.category}
              onChange={(options) => handleChange("category", options)}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Shipping"
              name="companies"
              options={shippingOptions}
              value={selectedFilters.shipping}
              onChange={(options) => handleChange("shipping", options)}
              disabled={selectedFilters.category.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Feature"
              name="prices"
              options={featuredOptions}
              value={selectedFilters.featured}
              onChange={(options) => handleChange("featured", options)}
              disabled={selectedFilters.category.length === 0}
              size="w-full"
            />
          </Form>
          {/* BUTTONS */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedFilters.category.length}
              onClick={handleSys2Submit}
            >
              Search Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
