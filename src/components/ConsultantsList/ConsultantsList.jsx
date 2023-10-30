import React, { useState, useEffect } from "react";
import ConsultantCard from "./ConsultantCard";
import "daisyui/dist/full.css";

function ConsultantsList() {
  const [consultantData, setConsultantData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch consultant data from your API endpoint
    fetch(`http://localhost:5005/api/consultants`)
      .then((response) => response.json())
      .then((data) => {
        if (data.consultants && Array.isArray(data.consultants)) {
          setConsultantData(data.consultants);
        } else {
          console.error(
            "Invalid API response: Missing or invalid 'consultants' property"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, []);

  const filteredConsultants = consultantData.filter((consultant) =>
    consultant.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-indigo-50 p-8">
      <section
        className="bg-indigo-700 text-white py-16 relative"
        style={{
          backgroundImage: `url('/consultant.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn">
            Welcome to POMELO Consultants
          </h1>
          <p className="text-xl animate__animated animate__fadeIn">
            Explore and connect with our talented consultants.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <div className="mx-auto w-3/4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search consultants"
                className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none focus:shadow-outline border border-gray-300 bg-gray-800 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-0 left-0 pl-4 flex items-center h-full pointer-events-none">
                <i className="text-gray-400 fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <ConsultantCard key={consultant._id} consultant={consultant} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ConsultantsList;
