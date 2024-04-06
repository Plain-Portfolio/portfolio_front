import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join/Join";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToast from "./components/CustomToast";
import "react-toastify/dist/ReactToastify.min.css";
import Post from "./pages/Post";
import Detail from "./pages/Detail/Detail";
import NotFound from "./components/Route/NotFound";
import PrivateRoute from "./components/Route/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import UserProjectList from "./pages/UserProjectList";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomToast />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/read/:id" element={<Detail />} />
              <Route
                path="/:userId/projectList"
                element={<UserProjectList />}
              />
              <Route element={<PrivateRoute />}>
                <Route path="/edit/:id" element={<Post />} />
                <Route path="/post" element={<Post />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
