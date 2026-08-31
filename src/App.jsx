import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";

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
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      }
    ],
  },
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
