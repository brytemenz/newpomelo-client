import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { ConsultantContext } from "../../context/consultant.context";

function Navbar() {
  const consultant = useContext(ConsultantContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const getProfileLink = () => {
    if (user) {
      console.log(user);
      if (user.userType === "consultant") {
        return `/consultant-profile/${user._id}`;
      } else {
        return `/job-seeker-profile/${user._id}`;
      }
    } else {
      // Handle the case when the user is not available
      return "/";
    }
  };

  return (
    <nav className="bg-dark p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          POMELO.
        </Link>

        <div className="hidden lg:flex space-x-4">
          {isLoggedIn ? (
            <>
              <NavLink
                to={getProfileLink()}
                className="text-white nav-link hover:text-indigo-400 uppercase font-bold"
                activeClassName="active"
              >
                Profile
              </NavLink>
              <NavLink
                to="/consultants"
                className="text-white nav-link uppercase font-bold"
                activeClassName="active"
              >
                Our Consultants
              </NavLink>
              <Link
                to="/"
                onClick={logOutUser}
                className="text-white nav-link hover:text-indigo-400 uppercase font-bold"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/jobseeker/signup"
                className="text-white nav-link hover:text-indigo-400 uppercase font-bold"
              >
                Book a consultant
              </Link>
              <Link
                to="/consultant/signup"
                className="text-white nav-link hover:text-indigo-400 uppercase font-bold"
              >
                Apply as a consultant
              </Link>
              <Link
                to="/login"
                className="text-white nav-link hover:text-indigo-400 uppercase font-bold"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {isLoggedIn && user && (
          <Link to={getProfileLink()} className="relative text-white">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-white ">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </span>
              </div>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
