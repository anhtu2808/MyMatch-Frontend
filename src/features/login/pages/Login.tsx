import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../../../assets/learning.jpg';
import logo_name from '../../../assets/logo_name.png'

//const clientId = '852138222140-kn3ihsd232asnpnpl42ifd3163n7he77.apps.googleusercontent.com';
import { GOOGLE_CLIENT_ID } from '../../../utils/constants';

const Login: React.FC = () => {
    const navigate = useNavigate();

  const onSuccess = (response: any) => {
    console.log('Login Success:', response);
    // Gửi token về backend hoặc xử lý tại client
    navigate('/'); // Điều hướng về trang chính sau khi đăng nhập thành công
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-container">
        {/* Background Netflix-style image */}
        <div className="login-bg">
          <img
            src={backgroundImage}
            alt="background"
          />
          <div className="overlay" />
        </div>

        <div className='logo'>
            <img src={logo_name} alt="logo" />
          </div>

        {/* Login card */}
        <div className="login-card">
          <h1 className="login-title">Đăng nhập</h1>
          <div>*Vui lòng đăng nhập gmail sinh viên</div>
          <br/>
          <div className="google-login">
            <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
