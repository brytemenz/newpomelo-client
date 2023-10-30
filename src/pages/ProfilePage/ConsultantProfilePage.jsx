import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";

const ConsultantProfilePage = () => {
  const { isLoading: authLoading, user } = useContext(AuthContext);
  const [loadingConsultant, setLoadingConsultant] = useState(true);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    consultant: null,
    bookings: [],
  });

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        if (!storedToken) {
          setLoadingConsultant(false);
          return;
        }

        console.log("Fetching consultant data...");
        const response = await fetch(
          "http://localhost:5005/api/consultant/profile",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched consultant data:", data);
          setProfileData(data);
          setLoadingConsultant(false);
        } else {
          console.log("Error loading consultant data.");
          setError("Error loading consultant data.");
          setLoadingConsultant(false);
        }
      } catch (error) {
        console.error("Error loading consultant data:", error);
        setError("Error loading consultant data.");
        setLoadingConsultant(false);
      }
    };

    if (storedToken) {
      fetchConsultantData();
    }
  }, [storedToken]);

  if (authLoading || loadingConsultant) {
    return <p>Loading ...</p>;
  }

  if (!user) {
    return <p>Not logged in.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData.consultant) {
    return <p>Not logged in or data not available.</p>;
  }

  const { firstName, lastName, consultantBio, profilePicture } =
    profileData.consultant;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: `url('/testcover.png')` }}
      >
        <div className="container mx-auto flex items-center justify-center h-full">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-48 h-48  rounded-full"
          />
        </div>
      </div>

      <div className="container mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-500">{user.userType}</p>
          <p className="text-gray-600">{consultantBio}</p>
        </div>
      </div>

      <div className="container mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profileData.bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">
                Session with {booking.jobseeker || "Unknown Jobseeker"}
              </h3>
              <p>
                Session Date: {new Date(booking.sessionDate).toLocaleString()}
              </p>
              <p>Package Booked: {booking.packageType}</p>
              <Button className="btn-success">Send Meeting Link</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Video Chat</h2>
        <VideoChatComponent />
      </div>

      <div className="container mx-auto mt-6">
        <Link to={`/projects/edit/${user._id}`}>
          <Button className="btn-info">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConsultantProfilePage;
