import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../services/localStorageService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LoginGoogleAPI } from "../apis";
import { OAuthConfig } from "../configurations/configuration";


export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

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
            setIsLoggedin(true);
          } else {
            console.error("No token found in response!");
            navigate("/login"); 
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
