// ConsultantCard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ConsultantCard({ consultant }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <img
        src={consultant.profilePicture || ""}
        className="w-full h-48 object-cover rounded-t-lg"
        alt={`${consultant.firstName} ${consultant.lastName}`}
      />
      <div className="p-4">
        <h5 className="text-lg font-semibold consultant-name">
          {consultant.firstName} {consultant.lastName}
        </h5>
        <h6 className="text-gray-600 text-sm consultant-info">
          {consultant.consultantBio} Consultant
        </h6>
        <Link
          to={`/consultant/detail/${consultant._id}`}
          className="mt-4 inline-block text-indigo-600 hover:underline"
        >
          View Profile
        </Link>
        <button
          onClick={handleLike}
          className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          {liked ? (
            <i className="fas fa-heart text-2xl text-red-500"></i>
          ) : (
            <i className="far fa-heart text-2xl"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default ConsultantCard;
