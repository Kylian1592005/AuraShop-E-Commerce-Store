import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, 
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
