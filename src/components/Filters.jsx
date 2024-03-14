import { useMemo, useState } from "react";
import { Form, Link } from "react-router-dom";

import FormMultiSelect from "./FormMultiSelect";
import SectionTitle from "./SectionTitle";
import { GrPowerReset } from "react-icons/gr";

const Filters = ({
  system2HasResults,
  onFilterSubmit,
  onReset,
  source,
  titlesOptions,
  selectedTitle,
  handleTitleSelectionChange,

  categoryOptions,
  shippingOptions,
  featuredOptions,
}) => {
  // State for selected options for both systems
  const [selectedSys1Filters, setSelectedSys1Filters] = useState({
    field1: selectedTitle || [],
    field2: [],
    field3: [],
    field4: [],
    field5: [],
    field6: [],
    field7: [],
    field8: [],
    field9: [],
    field10: [],
  });

  const [selectedSys2Filters, setSelectedSys2Filters] = useState({
    category: [],
    shipping: [],
    featured: [],
  });

  const generateOptions = (attribute, dataset) => {
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

  const companiesOptions = generateOptions("field2", source);
  const pricesOptions = generateOptions("field3", source);
  const field4Options = generateOptions("field4", source);
  const field5Options = generateOptions("field5", source);
  const field6Options = generateOptions("field6", source);
  const field7Options = generateOptions("field7", source);
  const field8Options = generateOptions("field8", source);
  const field9Options = generateOptions("field9", source);
  const field10Options = generateOptions("field10", source);
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
  // console.log("selectedSys1Filters", selectedSys1Filters);
  // Handle system1 submission
  const handleSys1Submit = (event) => {
    event.preventDefault();
    onFilterSubmit(
      {
        field1: selectedSys1Filters.field1.map((option) => option.value),
        field2: selectedSys1Filters.field2.map((option) => option.value),
        field3: selectedSys1Filters.field3.map((option) => option.value),
        field4: selectedSys1Filters.field4.map((option) => option.value),
        field5: selectedSys1Filters.field5.map((option) => option.value),
        field6: selectedSys1Filters.field6.map((option) => option.value),
        field7: selectedSys1Filters.field7.map((option) => option.value),
        field8: selectedSys1Filters.field8.map((option) => option.value),
        field9: selectedSys1Filters.field9.map((option) => option.value),
        field10: selectedSys1Filters.field10.map((option) => option.value),
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
      field1: [],
      field2: [],
      field3: [],
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
              value={selectedSys1Filters.field1} // Ensure this reflects the current selection
              onChange={(selectedOptions) => {
                handleTitleSelectionChange(selectedOptions);
                handleSys1Change("field1", selectedOptions);
              }}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Companies"
              name="companies"
              options={companiesOptions}
              value={selectedSys1Filters.field2}
              onChange={(options) => handleSys1Change("field2", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedSys1Filters.field3}
              onChange={(options) => handleSys1Change("field3", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field4"
              name="field4"
              options={field4Options}
              value={selectedSys1Filters.field4}
              onChange={(options) => handleSys1Change("field4", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select field5"
              name="field5"
              options={field5Options}
              value={selectedSys1Filters.field5}
              onChange={(options) => handleSys1Change("field5", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field6"
              name="field6"
              options={field6Options}
              value={selectedSys1Filters.field6}
              onChange={(options) => handleSys1Change("field6", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field7"
              name="field7"
              options={field7Options}
              value={selectedSys1Filters.field7}
              onChange={(options) => handleSys1Change("field7", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field8"
              name="field8"
              options={field8Options}
              value={selectedSys1Filters.field8}
              onChange={(options) => handleSys1Change("field8", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field9"
              name="field9"
              options={field9Options}
              value={selectedSys1Filters.field9}
              onChange={(options) => handleSys1Change("field9", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field10"
              name="field10"
              options={field10Options}
              value={selectedSys1Filters.field10}
              onChange={(options) => handleSys1Change("field10", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />
          </Form>
          {/* BUTTONS */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedSys1Filters.field1.length}
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
