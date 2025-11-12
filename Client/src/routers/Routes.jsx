import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../Pages/MainPages/Home/Home";
import { Community } from "../Pages/MainPages/Community/Community";
import { AboutUs } from "../Pages/MainPages/AboutUs/AboutUs";
import { Trips } from "../Pages/MainPages/Trips/Trips";
import { Login } from "../Pages/MainPages/Login/Login";
import { SignUp } from "../Pages/MainPages/SignUp/SignUp";
import { DashboardLayout } from "./../layouts/DashboardLayout";
import { TouristProfile } from "../Pages/DashboardPages/TouristPage/TouristProfile";
import { MyBooking } from "../Pages/DashboardPages/TouristPage/MyBooking";
import { AddStory } from "../Pages/DashboardPages/TouristPage/AddStory";
import { BecomeAGuide } from "../Pages/DashboardPages/TouristPage/BecomeAGuide";
import { GuideProfile } from "../Pages/DashboardPages/GuidePage/GuideProfile";
import { MyAssignedTours } from "../Pages/DashboardPages/GuidePage/MyAssignedTours";
import { AdminProfile } from "../Pages/DashboardPages/AdminPage/AdminProfile";
import { AddPackage } from "../Pages/DashboardPages/AdminPage/AddPackage";
import { ManageUsers } from "../Pages/DashboardPages/AdminPage/ManageUsers";
import { ManageCandidates } from "../Pages/DashboardPages/AdminPage/ManageCandidates";
import { PackageDetails } from "../Pages/MainPages/PackageDetails/PackageDetails";
import { MyOrder } from "../Pages/DashboardPages/TouristPage/MyOrder";
import { ManageStories } from "../Pages/DashboardPages/TouristPage/ManageStories";
import { UpdateStory } from "../components/Update/UpdateStory";
import { PrivateRoute } from "./PrivateRoute";
import { TouristRoute } from "./TouristRoute";
import { TouristUserRoute } from "./TouristUserRoute";
import { TouristGuideRoute } from "./TouristGuideRoute";
import { GuideRoute } from "./GuideRoute";
import { AdminRoute } from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/trips",
        element: <Trips />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/viewDetails/:id",
    element: (
      <PrivateRoute>
        <PackageDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/updateStory/:id",
    element: (
      <PrivateRoute>
        <TouristGuideRoute>
          <UpdateStory />
        </TouristGuideRoute>
      </PrivateRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Tourist Routes
      // --------------------------
      {
        path: "touristProfile",
        element: (
          <PrivateRoute>
            <TouristRoute>
              <TouristProfile />,
            </TouristRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myBookings",
        element: (
          <PrivateRoute>
            <TouristUserRoute>
              <MyBooking />
            </TouristUserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myOrder",
        element: (
          <PrivateRoute>
            <TouristRoute>
              <MyOrder />,
            </TouristRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addStory",
        element: (
          <PrivateRoute>
            <TouristGuideRoute>
              <AddStory />,
            </TouristGuideRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageStories",
        element: (
          <PrivateRoute>
            <TouristGuideRoute>
              <ManageStories />,
            </TouristGuideRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "becomeAGuide",
        element: (
          <PrivateRoute>
            <TouristRoute>
              <BecomeAGuide />,
            </TouristRoute>
          </PrivateRoute>
        ),
      },

      // Guide Routes
      // --------------------------
      {
        path: "guideProfile",
        element: (
          <PrivateRoute>
            <GuideRoute>
              <GuideProfile />
            </GuideRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myAssignedTours",
        element: (
          <PrivateRoute>
            <GuideRoute>
              <MyAssignedTours />
            </GuideRoute>
          </PrivateRoute>
        ),
      },

      // Admin Routes
      // --------------------------
      {
        path: "adminProfile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile />,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addPackage",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddPackage />,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCandidates",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCandidates />,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
