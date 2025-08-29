import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../services/localStorageService";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `https://mymatch.social/api/auth/outbound/authentication?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
  })
          .then((data) => {
          console.log("Auth response:", data);
          if (data.result?.token) {
            setToken(data.result.token);
            setIsLoggedin(true);
          } else {
            console.error("No token found in response!");
            navigate("/login"); // fallback về login nếu không có token
          }
        })
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/profile");
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
