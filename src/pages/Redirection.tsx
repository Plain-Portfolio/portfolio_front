import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { AuthContext } from "../components/Context/AuthContext";

type Props = {};

const Redirection = (props: Props) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const code = new URL(document.location.toString()).searchParams.get(
    "code"
  ) as string;

  useEffect(() => {
    console.log({ code: code });
    async function handleKakaoLogin(code: string) {
      try {
        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO_URI}&code=${code}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        const { access_token } = response.data;

        if (access_token) {
          const userResponse = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json;charset=utf-8",
              },
            }
          );

          const { profile } = userResponse.data.kakao_account;

          const { nickname, email } = profile;
          console.log(profile, nickname, email);

          const postData = {
            nickname,
            email,
          };

          const res = await axios
            .post(
              `${process.env.REACT_APP_API_URL}/user/login/kakao/callback`,
              postData
            )
            .then((res) => {
              const data = res.data;

              login({
                token: data.token,
                user: {
                  userId: String(data.userId),
                  email: data.email,
                  nickname: data.nickname,
                },
              });
              navigate("/");
            });
        }
      } catch (error) {
        console.error("Error during Kakao login:", error);
      }
    }

    handleKakaoLogin(code);
  }, []);

  return (
    <Layout>
      <div>카카오 소셜 로그인 중입니다. 잠시만 기다려주세요.</div>
    </Layout>
  );
};

export default Redirection;
