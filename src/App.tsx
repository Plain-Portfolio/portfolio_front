import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join/Join";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToast from "./components/CustomToast";
import "react-toastify/dist/ReactToastify.min.css";
import Post from "./pages/Post";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomToast />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
