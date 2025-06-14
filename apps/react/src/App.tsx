import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { Shipments } from "./pages/Shipments";
// import { EditShipment } from "./pages/EditShipment";
import Nav from "./components/main/Nav";
import { Toaster } from "react-hot-toast";
// import { ManageStaffs } from "./pages/ManageStaffs";
// import { CreateUser } from "./pages/CreateUser";
// import { Blog } from "./pages/Blog";
import { User } from "./pages/Test";
import { TestShipment } from "./pages/TestShipment";
import { TestBookShipment } from "./pages/TestBookShipment";

import Footer from "./components/main/Footer";
import { Dashboard } from "./pages/Dashboard";
import { Tracking } from "./pages/Tracking";
// import { BookShipment } from "./pages/BookShipment";
// import { CreateBlog } from "./pages/CreateBlog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TestDashboard } from "./pages/TestDashboard";
import { EditShipment } from "./pages/EditShipment";
import { NotFound } from "./pages/404";
import { ManageStaffs } from "./pages/ManageStaffs";
import { CreateUser } from "./pages/CreateUser";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white">
        <Nav />
      </div>

      {children}

      {!isError && (
        <div className="border border-t-neutral-300 fixed bottom-0  bg-white left-0 w-full">
          <Footer />
        </div>
      )}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/user",
    element: <User />,
    children: [
      // {
      //   path: "shipment",
      //   element: <Shipments />,
      // },
      // { path: "dashboard", element: <Dashboard /> },
      // { path: "bookShipment", element: <BookShipment /> },
      {
        path: "shipment",
        element: <TestShipment />,
      },
      { path: "dashboard", element: <TestDashboard /> },
      { path: "bookShipment", element: <TestBookShipment /> },
      { path: "editShipment/:awbNumber", element: <EditShipment /> },
      {
        path: "manageStaffs",
        element: <ManageStaffs />,
      },
      {
        path: "createUser",
        element: <CreateUser />,
      },
    ],
  },

  {
    path: "/",
    element: <Layout children={<Home />} />,
  },

  {
    path: "/login",
    element: <Layout children={<Login />} />,
  },
  //   {
  //     path: "/register",
  //     element: <Layout children={<Register />} />,
  //   },
  {
    path: "/tracking/:awbNumber",
    element: <Layout children={<Tracking />} />,
  },
  //   {
  //     path: "/shipments",
  //     element: <Layout children={<Shipments />} />,
  //   },
  //   {
  //     path: "/shipments/edit/:awbNumber",
  //     element: <Layout children={<EditShipment />} />,
  //   },
  //   {
  //     path: "/bookShipments",
  //     element: <Layout children={<BookShipment />} />,
  //   },
  {
    path: "/dashboard",
    element: <Layout children={<Dashboard />} />,
  },
  //   {
  //     path: "/superAdmin/manageStaffs",
  //     element: <Layout children={<ManageStaffs />} />,
  //   },
  //   {
  //     path: "/superAdmin/createUser",
  //     element: <Layout children={<CreateUser />} />,
  //   },
  // {
  //   path: "/blog",
  //   element: <Layout children={<Blog />} />,
  // },
  // {
  //   path: "/createBlog",
  //   element: <Layout children={<CreateBlog />} />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
