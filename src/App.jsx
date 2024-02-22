import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  About,
  ReportStatus,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";
// loaders
// import { loader as landingLoader } from "./pages/Landing";
// import { loader as SingleProductLoader } from "./pages/SingleProduct";
// import { loader as productsLoader } from "./pages/Products";
// actions

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader,
        errorElement: ErrorElement,
      },
      {
        path: "products",
        element: <Products />,
        // loader: productsLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "reports/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        // loader: SingleProductLoader,
      },
      {
        path: "reports",
        element: <ReportStatus />,
        errorElement: <Error />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
