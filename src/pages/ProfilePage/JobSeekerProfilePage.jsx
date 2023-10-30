import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";

const JobSeekerProfilePage = () => {
  const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
  const [loadingJobSeeker, setLoadingJobSeeker] = useState(true);
  const [error, setError] = useState(null);

  // Define state to store jobSeeker data and bookings
  const [profileData, setProfileData] = useState({
    jobSeeker: null,
    bookings: [],
  });

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJobSeekerData = async () => {
      try {
        if (!storedToken) {
          setLoadingJobSeeker(false);
          return;
        }

        console.log("Fetching job seeker data...");
        const response = await fetch(
          "https://newpomelo.onrender.com/api/jobseeker/profile",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched job seeker data:", data);

          // Check if data contains the jobSeeker property
          if (data.jobSeeker) {
            // Set the profileData state with the data
            setProfileData(data);
          } else {
            setError("Job seeker data not available.");
          }

          setLoadingJobSeeker(false);
        } else {
          console.log("Error loading job seeker data.");
          setError("Error loading job seeker data.");
          setLoadingJobSeeker(false);
        }
      } catch (error) {
        console.error("Error loading job seeker data:", error);
        setError("Error loading job seeker data.");
        setLoadingJobSeeker(false);
      }
    };

    if (storedToken) {
      fetchJobSeekerData();
    }
  }, [storedToken]);

  if (authLoading || loadingJobSeeker) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return <p>Not logged in.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData.jobSeeker) {
    return <p>Job seeker data not available.</p>;
  }

  const { firstName, lastName, jobSeekerBio } = profileData.jobSeeker;

  return (
    <div className="container profile-container">
      <div className="cover-picture">
        <img
          src="/testcover.png"
          alt="Cover"
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>

      <div className="profile-header text-center">
        <img
          src="/kiruba.webp"
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle"
        />
        <button className="edit-profile-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
        <p className="profile-info">{user.userType}</p>
      </div>

      <Card>
        <div>
          <p>
            While you wait for the consultant, watch this video to get started
          </p>
          <iframe
            width="100%"
            height="400" // Set the desired height value (e.g., 400)
            src="https://www.youtube.com/embed/0MprWWQILbc"
            frameBorder="0"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
      </Card>

      <div className="video-chat-container">
        <VideoChatComponent />
      </div>

      <Link to={`/jsprofile/edit/${user._id}`}>
        <Button variant="success" className="edit-profile-link">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default JobSeekerProfilePage;
