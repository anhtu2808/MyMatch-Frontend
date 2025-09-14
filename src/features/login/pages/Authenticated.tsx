import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../services/localStorageService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getProfileAPI } from "../../profile/apis";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser } from "../../../store/Slice";
import { LoginGoogleAPI } from "../apis";
import { OAuthConfig } from "../configurations/configuration";


export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const dispatch = useAppDispatch();

  const fetchProfileAndSetUser = async () => {
    try{
    const response = await getProfileAPI()
    dispatch(
      setUser({
        id: response?.result.id,
        studentId: response?.result?.student?.id,
        email: response?.result?.email,
        campus: response?.result?.student?.campus,
        studentCode: response?.result?.student?.studentCode,
        role: response?.result?.role,
        token: response?.result?.token,
      })
    )
  } catch (error) {
    console.log("Failed to fetch profile:", error);
  }
  }

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

       if (authCode) {
        const redirectUri = OAuthConfig.redirectUri

        LoginGoogleAPI(authCode, redirectUri)
          .then((data) => {
          console.log("Auth response:", data);
          if (data.result?.token) {
            setToken(data.result.token);
            fetchProfileAndSetUser().then(() => { // làm như này để tránh việc điều hướng sớm
            setIsLoggedin(true);
            });
          } else {
            console.error("No token found in response!");
            navigate("/login"); // fallback về login nếu không có token
          }
        })
        .catch((err) => console.error("Auth failed:", err));
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}
