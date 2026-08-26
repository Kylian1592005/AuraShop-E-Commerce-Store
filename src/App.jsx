import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home />, 
    children: [
      {
        index: true, 
        element: <Home />, 
      },
      {
        path: "products", 
        element: <Products />,
      },
      {
        path: "products/:id", 
        element: <ProductDetails />,
      },
    ],
  },
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
