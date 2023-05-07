import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ReRenderPage from "../pages/ReRenderPage/ReRenderPage";
import UseMemoPage from "../pages/ReRenderPage/UseMemoPage";
import RP1 from "../pages/RP1";
import RP2 from "../pages/RP2";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import NestedRoutePage from "../pages/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import { AbcOutlined } from "@mui/icons-material";
import About from "../pages/About";
import MyCards from "../pages/MyCards";
import CreateCardPage from "../pages/CreateCardPage";
import FavCardsPage from "../pages/FavCards";
import InformationCard from "../pages/InformationCard";
import SandBox from "../pages/Sandbox";
import SuperProtectedRouteEdit from "../components/SuperProtectedRouteEdit";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route
        path={ROUTES.FAVCARD}
        element={<ProtectedRoute element={<FavCardsPage />} />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/myCards"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<MyCards />}
          />
        }
      />
      <Route
        path="infor/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<InformationCard />}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRouteEdit
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path="/sandBox"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandBox />}
          />
        }
      >
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
        <Route path="RP1" element={<RP1 />} />
        <Route path="RP2" element={<RP2 />} />
  
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
