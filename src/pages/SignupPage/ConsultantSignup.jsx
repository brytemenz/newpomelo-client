import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function ConsultantSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [consultantBio, setConsultantBio] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleConsultantBio = (e) => setConsultantBio(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, firstName, lastName, consultantBio };

    authService
      .consignup(requestBody)
      .then((response) => {
        navigate("/login");
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
            loop // Add the loop attribute
            src="../sign2.mp4"
            alt="Jobseeker"
            className="w-full h-auto"
          />
        </div>

        <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Create Your Consultant Account
          </h1>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Email Address"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleFirstName}
                placeholder="First Name"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
                placeholder="Last Name"
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 bg-white"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="consultantBio"
                value={consultantBio}
                onChange={handleConsultantBio}
                placeholder="Tell us about yourself..."
                className="w-full p-3 text-sm border rounded-lg focus:ring focus:ring-indigo-400 h-32 bg-white"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </form>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConsultantSignup;
