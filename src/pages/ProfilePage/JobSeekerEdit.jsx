import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const EditJobSeekerProfile = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", description);

    if (cvFile) {
      formData.append("cvFile", cvFile);
    }

    try {
      const response = await fetch(
        `https://newpomelo.onrender.com/api/jobseeker/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Job seeker profile updated successfully!");
        // Handle success, e.g., redirect to the job seeker's profile page
      } else {
        console.error("Error updating job seeker profile");
        // Handle the error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any network or other errors
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetch(`http://localhost:5005/api/jobseeker/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDescription(data.description);
          setIsDataFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching job seeker data:", error);
        });
    }
  }, [id, isDataFetched]);

  return (
    <div className="container profile-container">
      <div className="profile-header text-center">
        <h1 className="profile-title">
          {firstName} {lastName}
        </h1>
        <p className="profile-info">Job Seeker</p>
      </div>
      <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCvFile">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Update CV
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setCvFile(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Link
        to={`/job-seeker-profile/edit/${id}`}
        className="btn btn-secondary edit-profile-link"
      >
        Cancel
      </Link>
    </div>
  );
};

export default EditJobSeekerProfile;
