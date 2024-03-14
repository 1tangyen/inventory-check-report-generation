import { useMemo, useState } from "react";
import { Form, Link } from "react-router-dom";

import FormMultiSelect from "./FormMultiSelect";
import SectionTitle from "./SectionTitle";
import { GrPowerReset } from "react-icons/gr";

const Filters = ({
  system2HasResults,
  onFilterSubmit,
  onReset,
  titlesOptions,
  companiesOptions,
  pricesOptions,
  field4Options,
  field5Options,
  field6Options,
  field7Options,
  field8Options,
  field9Options,
  field10Options,
  categoryOptions,
  shippingOptions,
  featuredOptions,
}) => {
  // State for selected options for both systems
  const [selectedSys1Filters, setSelectedSys1Filters] = useState({
    titles: [],
    companies: [],
    prices: [],
  });
  const [selectedSys2Filters, setSelectedSys2Filters] = useState({
    category: [],
    shipping: [],
    featured: [],
  });

  // Handle change for system1 filters
  const handleSys1Change = (filter, selectedOption) => {
    setSelectedSys1Filters((prevFilters) => ({
      ...prevFilters,
      [filter]: selectedOption || [],
    }));
  };

  // Handle change for system2 filters
  const handleSys2Change = (filter, selectedOption) => {
    setSelectedSys2Filters((prevFilters) => ({
      ...prevFilters,
      [filter]: selectedOption || [],
    }));
  };

  // Handle system1 submission
  const handleSys1Submit = (event) => {
    event.preventDefault();
    onFilterSubmit(
      {
        titles: selectedSys1Filters.titles.map((option) => option.value),
        companies: selectedSys1Filters.companies.map((option) => option.value),
        prices: selectedSys1Filters.prices.map((option) => option.value),
      },
      null // No system2 filters yet
    );
  };

  // Handle system2 submission
  const handleSys2Submit = (event) => {
    event.preventDefault();
    onFilterSubmit(
      null, // Keep system1 filters as they are
      {
        category: selectedSys2Filters.category.map((option) => option.value),
        shipping: selectedSys2Filters.shipping.map((option) => option.value),
        featured: selectedSys2Filters.featured.map((option) => option.value),
      }
    );
  };

  // Unified reset for both systems
  const handleReset = () => {
    setSelectedSys1Filters({
      titles: [],
      companies: [],
      prices: [],
      field4: [],
      field5: [],
      field6: [],
      field7: [],
      field8: [],
      field9: [],
      field10: [],
    });
    setSelectedSys2Filters({
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
              value={selectedSys1Filters.titles}
              onChange={(options) => handleSys1Change("titles", options)}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Companies"
              name="companies"
              options={companiesOptions}
              value={selectedSys1Filters.companies}
              onChange={(options) => handleSys1Change("companies", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedSys1Filters.prices}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field4"
              name="companies"
              options={field4Options}
              value={selectedSys1Filters.field4}
              onChange={(options) => handleSys1Change("companies", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select field5"
              name="prices"
              options={field5Options}
              value={selectedSys1Filters.field5}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field6"
              name="prices"
              options={field6Options}
              value={selectedSys1Filters.field6}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field7"
              name="prices"
              options={field7Options}
              value={selectedSys1Filters.field7}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field8"
              name="prices"
              options={field8Options}
              value={selectedSys1Filters.field8}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field9"
              name="prices"
              options={field9Options}
              value={selectedSys1Filters.field9}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field10"
              name="prices"
              options={field10Options}
              value={selectedSys1Filters.field10}
              onChange={(options) => handleSys1Change("prices", options)}
              disabled={selectedSys1Filters.titles.length === 0}
              size="w-full"
            />
          </Form>
          {/* BUTTONS */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedSys1Filters.titles.length}
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
              value={selectedSys2Filters.category}
              onChange={(options) => handleSys2Change("category", options)}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Shipping"
              name="companies"
              options={shippingOptions}
              value={selectedSys2Filters.shipping}
              onChange={(options) => handleSys2Change("shipping", options)}
              disabled={selectedSys2Filters.category.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Feature"
              name="prices"
              options={featuredOptions}
              value={selectedSys2Filters.featured}
              onChange={(options) => handleSys2Change("featured", options)}
              disabled={selectedSys2Filters.category.length === 0}
              size="w-full"
            />
          </Form>
          {/* BUTTONS */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={!selectedSys2Filters.category.length}
              disabled={
                !selectedSys2Filters.category.length || !system2HasResults
              }
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
