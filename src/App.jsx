import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import Logbook from "./pages/Logbook";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";

const App = () => {
  return (
    <>
    <DarkModeProvider>

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
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

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </DarkModeProvider>

    </>
  );
};

export default App;
