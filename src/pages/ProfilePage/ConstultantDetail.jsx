// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import BookingModal from "../../components/Booking/BookingModal";

// const ConsultantDetail = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { id } = useParams();
//   const [consultant, setConsultant] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5005/api/consultant/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch consultant data: ${response.status}`
//           );
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setConsultant(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching consultant data: ", error);
//       });
//   }, [id]);

//   const handleBookNowClick = () => {
//     setShowModal(true);
//   };

//   const closeBookingModal = () => {
//     setShowModal(false);
//   };

//   if (consultant === null) {
//     return <p>Loading...</p>;
//   }

//   const { firstName, lastName, consultantBio, profilePicture } = consultant;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="md:flex space-x-4">
//         <div className="md:w-1/2">
//           <div className="h-64 w-64 bg-gray-200 rounded-full border-4 border-white overflow-hidden">
//             <div className="relative w-full h-full">
//               <img
//                 src={consultant.consultant.profilePicture}
//                 alt={`${firstName} ${lastName}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="md:w-1/2">
//           <div className="p-4">
//             <h2 className="text-2xl font-semibold text-indigo-600">
//               {consultant.consultant.firstName} {consultant.consultant.lastName}
//             </h2>
//             <p className="text-indigo-600">Consultant</p>
//             <p className="text-gray-700 mt-2">
//               {consultant.consultant.consultantBio}
//             </p>
//             <button
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-800"
//               onClick={handleBookNowClick}
//             >
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <Link to="/consultants">
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
//             Back to Consultants
//           </button>
//         </Link>
//       </div>
//       {showModal && (
//         <BookingModal
//           isOpen={showModal}
//           onRequestClose={closeBookingModal}
//           consultant={consultant}
//         />
//       )}
//     </div>
//   );
// };

// export default ConsultantDetail;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookingModal from "../../components/Booking/BookingModal";

const ConsultantDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5005/api/consultant/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch consultant data: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setConsultant(data);
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, [id]);

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
  };

  if (consultant === null) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName, consultantBio, profilePicture } = consultant;

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex space-x-4 items-center">
        <div className="md:w-1/2">
          <div className="h-64 w-64 bg-gray-200 rounded-full border-4 border-white overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={consultant.consultant.profilePicture}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-indigo-600">
              {consultant.consultant.firstName} {consultant.consultant.lastName}
            </h2>
            <p className="text-indigo-600 text-xl">Consultant</p>
            <p className="text-gray-700 mt-2">
              {consultant.consultant.consultantBio}
            </p>
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-indigo-800"
              onClick={handleBookNowClick}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/consultants">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
            Back to Consultants
          </button>
        </Link>
      </div>
      {showModal && (
        <BookingModal
          isOpen={showModal}
          onRequestClose={closeBookingModal}
          consultant={consultant}
        />
      )}
    </div>
  );
};

export default ConsultantDetail;
