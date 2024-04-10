import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    max-width: 100%;
    border-radius: 10px;
    padding: 24px;
  }
  .Toastify__toast--success {
    font-size: 20px;
  }
`;

export default function CustomToast() {
  return <Container limit={1} />;
}
