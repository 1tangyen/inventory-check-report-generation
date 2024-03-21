import { useMemo, useState, useEffect, useCallback } from "react";
import { Form, Link } from "react-router-dom";

import FormMultiSelect from "./FormMultiSelect";
import SectionTitle from "./SectionTitle";
import { GrPowerReset } from "react-icons/gr";

const Filters = ({
  onFilterSubmit,
  onReset,
  generateOptions,

  //sys1 sections
  source,

  titlesOptions,
  selectedTitle,
  handleTitleSelectionChange,
  //sys2 sections
  source2,

  categoryOptions,
  selectedCategory,
  handleCategorySelectionChange,
  system2HasResults,
}) => {
  // console.log("source1", source);
  // console.log("source2", source2);
  const [selectedSys1Filters, setSelectedSys1Filters] = useState({
    field1: selectedTitle || [],
    field2: [],
    field3: [],
    field4: [],
    field5: [],
    field6: [],
  });
  const [selectedSys2Filters, setSelectedSys2Filters] = useState({
    category: selectedCategory || [],
    field7: [],
    field8: [],
  });
  // Use generateOptions to create options for each field based on the source

  const field2Options = generateOptions("field2", source);
  const field3Options = generateOptions("field3", source);
  const field4Options = generateOptions("field4", source);
  const field5Options = generateOptions("field5", source);
  const field6Options = generateOptions("field6", source);
  const field7Options = generateOptions("field7", source2);
  const field8Options = generateOptions("field8", source2);

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

  // Submission handlers

  const handleSys1Submit = (event) => {
    event.preventDefault();
    onFilterSubmit(selectedSys1Filters, null);
  };

  const handleSys2Submit = (event) => {
    event.preventDefault();
    onFilterSubmit(null, selectedSys2Filters);
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
    });
    setSelectedSys2Filters({
      field7: [],
      field8: [],
      field9: [],
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
          <Form className=" gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
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
              options={field2Options}
              value={selectedSys1Filters.field2}
              onChange={(options) => handleSys1Change("field2", options)}
              disabled={selectedSys1Filters.field1.length === 0}
              size="w-full"
            />

            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={field3Options}
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
          <Form className=" gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
            <FormMultiSelect
              label="Select Categories"
              name="titles"
              options={categoryOptions}
              value={selectedSys2Filters.category}
              onChange={(selectedOptions) => {
                handleCategorySelectionChange(selectedOptions);
                handleSys2Change("category", selectedOptions);
              }}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field7"
              name="field7"
              options={field7Options}
              value={selectedSys2Filters.field7}
              onChange={(options) => handleSys2Change("field7", options)}
              disabled={selectedSys2Filters.category.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select field8"
              name="field8"
              options={field8Options}
              value={selectedSys2Filters.field8}
              onChange={(options) => handleSys2Change("field8", options)}
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
              disabled={!selectedSys2Filters.category.length}
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
