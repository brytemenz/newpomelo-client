import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL:
        process.env.REACT_APP_SERVER_URL || "https://newpomelo.onrender.com",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  consignup = (requestBody) => {
    return this.api.post(
      "https://newpomelo.onrender.com/api/consultant",
      requestBody
    );
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  jssignup = (requestBody) => {
    return this.api.post(
      "https://newpomelo.onrender.com/api/jobseeker",
      requestBody
    );
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("http://localhost:5005/auth/verif");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
