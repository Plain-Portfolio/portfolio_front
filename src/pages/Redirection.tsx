import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const Redirection = (props: Props) => {
  const navigate = useNavigate();

  const { string } = useParams();

  const code = new URL(document.location.toString()).searchParams.get("code");

  useEffect(() => {
    console.log({ code: code });
    async function fetchCallback() {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/login/kakao/callback`, {
          code: code,
        })
        .then((r) => {
          console.log(r.data);
        })
        .then(() => navigate("/"));
    }
    fetchCallback();
  }, []);

  return <div>recirection</div>;
};

export default Redirection;
