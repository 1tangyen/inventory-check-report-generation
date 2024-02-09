import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import jsonData from "../assets/dummy.json";
import { useLoaderData } from "react-router-dom";

// const url = "/products";

// export const loader = async ({ request }) => {
//   const response = await customFetch(url);
//   const products = response.data.data;
//   const meta = response.data.meta;
//   return { products, meta };
// };

export const loader = async ({ request }) => {
  // Directly return jsonData; assume this is the correct format
  return jsonData;
};

const Products = () => {
  //using dummy
  const { data: products, meta } = useLoaderData();

  return (
    <>
      <Filters />
      {/* <ProductsContainer /> */}
      <ProductsContainer products={products} meta={meta} />
      {/* <PaginationContainer /> */}
    </>
  );
};
export default Products;
