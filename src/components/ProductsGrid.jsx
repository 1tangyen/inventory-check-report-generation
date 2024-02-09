import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
// const ProductsGrid = () => {
//   const { products } = useLoaderData();

//using dummy
import React, { useState } from "react";
import FormTable from "./FormTable"; // Ensure the path is correct

const ProductsGrid = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Define columns for FormTable based on product attributes
  const columns = [
    { Header: "Product", accessor: "title" },
    { Header: "Company", accessor: "company" },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ value }) => formatPrice(value),
    }, // Assuming formatPrice formats the price
    { Header: "Category", accessor: "category" },
  ];

  // Prepare data for FormTable, mapping products to match column accessors
  const data = products.map((product) => ({
    ...product.attributes,
    id: product.id,
    price: formatPrice(product.attributes.price),
  }));

  // Handle row selection logic
  const handleRowSelect = (selectedRowIds) => {
    setSelectedProducts(selectedRowIds);
  };

  // Handle "Select All" logic
  const handleSelectAll = (selectedRowIds) => {
    setSelectedProducts(selectedRowIds);
  };

  return (
    <FormTable
      data={data}
      columns={columns}
      onRowSelect={handleRowSelect}
      isSelectable={true}
      onSelectAll={handleSelectAll}
      selectedRows={selectedProducts}
    />
  );
};

export default ProductsGrid;
