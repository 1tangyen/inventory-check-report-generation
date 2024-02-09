import { FeatureProducts, Hero } from "../components";

import { customFetch } from "../utils";
const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(url);
  console.log(response);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      {/* <FeatureProducts /> */}
    </>
  );
};
export default Landing;
