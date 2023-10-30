import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("jobseeker");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, userType };

    authService
      .login(requestBody)
      .then((response) => {
        const { authToken, userType } = response.data;
        storeToken(authToken);
        authenticateUser();

        if (userType === "consultant") {
          navigate("/consult");
        } else if (userType === "jobseeker") {
          setLoginSuccess(true);
          setTimeout(() => {
            navigate("/jsprofile");
          }, 2000); // Navigate to the profile page after 2 seconds
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto flex items-center">
        <div className="w-1/2 p-4">
          <video
            autoPlay
            loop
            src="../login.mp4"
            alt="Jobseeker"
            className="w-full h-auto"
          />
        </div>

        <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to Pomelo
          </h1>
          {loginSuccess ? (
            // Render a success message or animation here
            <p className="text-green-500 text-xl mb-4">
              Login Successful! Redirecting...
            </p>
          ) : (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter your email"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Enter your password"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />

              <label>Log in as:</label>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              >
                <option value="consultant">Consultant</option>
                <option value="jobseeker">Jobseeker</option>
              </select>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </button>
            </form>
          )}

          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          {!loginSuccess && (
            <p className="mt-4 text-center text-gray-600">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-indigo-600">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
