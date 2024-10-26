import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Logbook from "./pages/Logbook";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="users" element={<Users />} />
            <Route path="Settings" element={<Settings />} />
            <Route path="logbook" element={<Logbook />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="#" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
