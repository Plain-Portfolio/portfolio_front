import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const Redirection = (props: Props) => {
  const navigate = useNavigate();
  const { string } = useParams();
  const code = new URL(document.location.toString()).searchParams.get("code");
  console.log(string, code);
  useEffect(() => {
    async function fetchCallback() {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/login/${string}/callback`,
          code
        )
        .then((r) => {
          console.log(r.data);
          navigate("/");
        });
    }
    //fetchCallback();
  }, []);
  return <div>로그인 중입니다.</div>;
};
export default Redirection;
