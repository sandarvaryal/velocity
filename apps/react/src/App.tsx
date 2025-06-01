// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import { Shipments } from "./pages/Shipments";
// // import { EditShipment } from "./pages/EditShipment";
// // import Nav from "./components/Nav";
// // import { Toaster } from "react-hot-toast";
// // import { ManageStaffs } from "./pages/ManageStaffs";
// // import { CreateUser } from "./pages/CreateUser";
// // import { BookShipment } from "./pages/BookShipment";
// // import Footer from "./components/Footer";
// // import { Dashboard } from "./pages/Dashboard";
// // import { Tracking } from "./pages/Tracking";

// // const Layout = ({ children }: { children: React.ReactNode }) => {
// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       <div className="">
// //         <Nav />
// //       </div>

// //       <div className="flex-grow">{children}</div>

// //       <div className="border border-t-neutral-300 fixed bottom-0 left-0 w-full bg-white">
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // };

// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <Layout children={<Home />} />,
// //   },
// //   {
// //     path: "/login",
// //     element: <Layout children={<Login />} />,
// //   },
// //   {
// //     path: "/register",
// //     element: <Layout children={<Register />} />,
// //   },
// //   {
// //     path: "/tracking",
// //     element: <Layout children={<Tracking />} />,
// //   },
// //   {
// //     path: "/shipments",
// //     element: <Layout children={<Shipments />} />,
// //   },
// //   {
// //     path: "/shipments/edit/:awbNumber",
// //     element: <Layout children={<EditShipment />} />,
// //   },
// //   {
// //     path: "/bookShipments",
// //     element: <Layout children={<BookShipment />} />,
// //   },
// //   {
// //     path: "/dashboard",
// //     element: <Layout children={<Dashboard />} />,
// //   },
// //   {
// //     path: "/superAdmin/manageStaffs",
// //     element: <Layout children={<ManageStaffs />} />,
// //   },
// //   {
// //     path: "/superAdmin/createUser",
// //     element: <Layout children={<CreateUser />} />,
// //   },
// // ]);

// // function App() {
// //   return (
// //     <>
// //       <RouterProvider router={router} />
// //       <Toaster />
// //     </>
// //   );
// // }

// // export default App;

// //eta bata

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { Shipments } from "./pages/Shipments";
// import { EditShipment } from "./pages/EditShipment";
// import Nav from "./components/Nav";
// import { Toaster } from "react-hot-toast";
// import { ManageStaffs } from "./pages/ManageStaffs";
// import { CreateUser } from "./pages/CreateUser";

// import Footer from "./components/Footer";
// import { Dashboard } from "./pages/Dashboard";
// import { Tracking } from "./pages/Tracking";
// import { BookShipment } from "./pages/BookShipment";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const { isError } = useQuery({
//     queryKey: ["verify"],
//     queryFn: async () => {
//       await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
//         withCredentials: true,
//       });
//       return true;
//     },
//     retry: false,
//   });

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className=" bg-neutral-50">
//         <Nav />
//       </div>

//       <div className="flex-grow">{children}</div>

//       {!isError && (
//         <div className="border border-t-neutral-300 fixed bottom-0 left-0 w-full bg-neutral-50">
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout children={<Home />} />,
//   },

//   {
//     path: "/login",
//     element: <Layout children={<Login />} />,
//   },
//   {
//     path: "/register",
//     element: <Layout children={<Register />} />,
//   },
//   {
//     path: "/tracking",
//     element: <Layout children={<Tracking />} />,
//   },
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
//   {
//     path: "/dashboard",
//     element: <Layout children={<Dashboard />} />,
//   },
//   {
//     path: "/superAdmin/manageStaffs",
//     element: <Layout children={<ManageStaffs />} />,
//   },
//   {
//     path: "/superAdmin/createUser",
//     element: <Layout children={<CreateUser />} />,
//   },
// ]);

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <Toaster />
//     </>
//   );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Shipments } from "./pages/Shipments";
import { EditShipment } from "./pages/EditShipment";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";
import { ManageStaffs } from "./pages/ManageStaffs";
import { CreateUser } from "./pages/CreateUser";

import Footer from "./components/Footer";
import { Dashboard } from "./pages/Dashboard";
import { Tracking } from "./pages/Tracking";
import { BookShipment } from "./pages/BookShipment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    path: "/",
    element: <Layout children={<Home />} />,
  },

  {
    path: "/login",
    element: <Layout children={<Login />} />,
  },
  {
    path: "/register",
    element: <Layout children={<Register />} />,
  },
  {
    path: "/tracking/:awbNumber",
    element: <Layout children={<Tracking />} />,
  },
  {
    path: "/shipments",
    element: <Layout children={<Shipments />} />,
  },
  {
    path: "/shipments/edit/:awbNumber",
    element: <Layout children={<EditShipment />} />,
  },
  {
    path: "/bookShipments",
    element: <Layout children={<BookShipment />} />,
  },
  {
    path: "/dashboard",
    element: <Layout children={<Dashboard />} />,
  },
  {
    path: "/superAdmin/manageStaffs",
    element: <Layout children={<ManageStaffs />} />,
  },
  {
    path: "/superAdmin/createUser",
    element: <Layout children={<CreateUser />} />,
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
