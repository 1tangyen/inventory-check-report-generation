import axios from "axios";

const devUrl = "https://strapi-store-server.onrender.com/api/";
const testUrl = "placeholder";
const productionUrl = "placeholder";

export const customFetch = axios.create({
  baseURL: devUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};
