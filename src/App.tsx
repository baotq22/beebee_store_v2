import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home.tsx";
import UserDetail from "./page/UserDetails.tsx";
import UserLogin from "./page/Login.tsx";
import { createContext, useEffect } from "react";
import ProductDetail from "./page/ProductDetails.tsx";
import ProductChosen from "./page/productListChosen.tsx";
import AllProduct from "./page/AllProducts.tsx";
import AllUser from "./page/AllUsers.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import { loginSuccess } from "./slices/userLoginSlice.ts";
import NotFound from "./page/NotFound.tsx";

export const UserContext = createContext(null)
export const ProductContext = createContext(null)
export const ProductChosenContext = createContext([])

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/all-products",
    element: <AllProduct getProduct={function (): void {
      throw new Error("Function not implemented.");
    } } removeProduct={function (): void {
      throw new Error("Function not implemented.");
    } } />,
  },
  {
    path: "/users/:userId",
    element: <UserDetail />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/product-chosen-list",
    element: <ProductChosen />
  },
  {
    path: "/all-users",
    element: <AllUser />
  },
  {
    path: "/not-found",
    element: <NotFound />
  }
]);

function App() {
  // const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('username');
    const passwordLocalStorage = localStorage.getItem('password');
    const idLocalStorage = localStorage.getItem('id');
    if (userLocalStorage && passwordLocalStorage)  {
      store.dispatch(loginSuccess({
        username: userLocalStorage,
        password: passwordLocalStorage,
        id: idLocalStorage
      }))
    }
  }, [])
  // const [user, setUser] = useState();
  // const [product, setProduct] = useState();
  // const [productList, setProductList] = useState([]);
  return (
    <Provider store={store}>
      {/* <ProductChosenContext.Provider value={{ productList, setProductList }} > */}
        {/* <ProductContext.Provider value={{ product, setProduct }}> */}
          {/* <UserContext.Provider value={{ user, setUser }}> */}
            <RouterProvider router={router} />
          {/* </UserContext.Provider> */}
        {/* </ProductContext.Provider> */}
      {/* </ProductChosenContext.Provider> */}
    </Provider>
  )
}

export default App
