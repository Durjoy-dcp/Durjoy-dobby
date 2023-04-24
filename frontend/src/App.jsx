import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Gallery from "./Components/Gallery";
import Home from "./Components/Home";
import ImageUpload from "./Components/ImageUpload";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import Main from "./Layout/Main";
import Private from "./Private";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Singup></Singup>,
        },
        {
          path: "/imageupload",
          element: (
            <Private>
              <ImageUpload></ImageUpload>
            </Private>
          ),
        },
        {
          path: "/gallery",
          element: (
            <Private>
              <Gallery></Gallery>
            </Private>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
