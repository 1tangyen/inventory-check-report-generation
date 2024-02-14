import { useMemo, useState } from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormMultiSelect from "./FormMultiSelect";
import SectionTitle from "./SectionTitle";
import { GrPowerReset } from "react-icons/gr";
const Filters2 = ({ onFilterSubmit, products, onReset }) => {
  // Compute the options for the select inputs
  const titlesOptions = useMemo(
    () => [...new Set(products.map((product) => product.attributes.title))],
    [products]
  );
  const companiesOptions = useMemo(
    () => [...new Set(products.map((product) => product.attributes.company))],
    [products]
  );
  const pricesOptions = useMemo(
    () => [...new Set(products.map((product) => product.attributes.price))],
    [products]
  );

  // Set state for the selected options
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const handleTitlesChange = (selectedOptions) => {
    setSelectedTitles(selectedOptions || []);
    // Reset selections for other fields when titles are cleared
    if (!selectedOptions || selectedOptions.length === 0) {
      setSelectedCompanies([]);
      setSelectedPrices([]);
    }
  };

  const handleCompaniesChange = (selectedOptions) => {
    setSelectedCompanies(selectedOptions || []);
  };

  const handlePricesChange = (selectedOptions) => {
    setSelectedPrices(selectedOptions || []);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterSubmit({
      titles: selectedTitles.map((option) => option.value),
      companies: selectedCompanies.map((option) => option.value),
      prices: selectedPrices.map((option) => option.value),
    });
  };

  // Reset handler
  const handleReset = () => {
    setSelectedTitles([]);
    setSelectedCompanies([]);
    setSelectedPrices([]);
    onReset();
  };

  return (
    <>
      <div className="bg-base-200 rounded-md p-4">
        <div className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8">
          <SectionTitle text="system2" />
          <Form className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
            <FormMultiSelect
              label="Select Titles"
              name="titles"
              options={titlesOptions}
              value={selectedTitles}
              onChange={handleTitlesChange}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Companies"
              name="companies"
              options={companiesOptions}
              value={selectedCompanies}
              onChange={handleCompaniesChange}
              disabled={selectedTitles.length === 0}
              size="w-full"
            />
            <FormMultiSelect
              label="Select Prices"
              name="prices"
              options={pricesOptions}
              value={selectedPrices}
              onChange={handlePricesChange}
              disabled={selectedTitles.length === 0}
              size="w-full"
            />
          </Form>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={selectedTitles.length === 0}
              onClick={handleSubmit}
            >
              Search Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters2;
