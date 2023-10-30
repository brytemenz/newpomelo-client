import React from "react";
import "daisyui/dist/full.css";
import "./HomePage.css";
import { motion } from "framer-motion"; // Import framer-motion for animations

const consultantData = [
  {
    id: 1,
    name: "Alex Palma",
    title: "Software Engineer",
    imageUrl: "alexPalmer.jpg",
  },
  {
    id: 2,
    name: "Kiruba Berlin",
    title: "UX Designer",
    imageUrl: "kiruba.webp",
  },
  {
    id: 3,
    name: "Pablo Vietta",
    title: "Digital Marketing Expert",
    imageUrl: "PabloVietta.webp",
  },
  {
    id: 4,
    name: "Martin Mensah",
    title: "Project Manager",
    imageUrl: "martin.jpg",
  },
];

const reviewData = [
  {
    id: 1,
    author: "Franklin Osei",
    text: "Great platform to find the right talent.",
  },
  {
    id: 2,
    author: "Maria Garcia",
    text: "Hiring made easy. Highly recommended.",
  },
  {
    id: 3,
    author: "Marco",
    text: "Diverse talent pool. Impressive!",
  },
];

const HomePage = () => {
  return (
    <div>
      <motion.section
        className="bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400 text-white py-16 relative"
        style={{
          backgroundImage: "url('/pomelopink.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4 animate__animated animate__fadeIn">
            Welcome to <span className="text-yellow-400">POMELO!</span>
          </h1>
          <p className="text-lg animate__animated animate__fadeIn">
            You can rely on our talented group of international consultants to
            add sparkle to your CV and let you fly through your next interviews.
          </p>
          <p className="text-lg animate__animated animate__fadeIn">
            Trust the fruit. Trust POMELO.
          </p>
          <a
            href="/jobseeker/signup"
            className="btn btn-primary mt-8 px-10 py-3 text-lg font-semibold animate__animated animate__fadeIn"
            style={{ backgroundColor: "#ffaa4c" }}
          >
            Get Started
          </a>
          <div className="text-white text-3xl animate__animated animate__bounce mt-4"></div>
        </div>
      </motion.section>

      {/* Consultant Carousel - Horizontal Layout */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-8 animate__animated animate__fadeIn">
            Meet Our Consultants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {consultantData.map((consultant) => (
              <motion.div
                key={consultant.id}
                className="bg-white p-4 rounded-lg mx-2 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={consultant.imageUrl}
                  alt={consultant.name}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                    {consultant.name}
                  </h3>
                  <p className="text-sm text-gray-600">{consultant.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-8 animate__animated animate__fadeIn">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality Professionals",
                description:
                  "Our platform provides access to top talent from around the world.",
              },
              {
                title: "Seamless Hiring",
                description:
                  "Streamlined processes to find and hire the right talent.",
              },
              {
                title: "Cost-Effective",
                description: "Flexible hiring options that fit your budget.",
              },
              {
                title: "Diverse Talent",
                description:
                  "Choose from a wide range of skills and expertise.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white rounded shadow-lg"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section with Video Background */}
      <section className="bg-gray-100 py-16 relative">
        {/* Video Background */}
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-8 animate__animated animate__fadeIn">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fas fa-search",
                title: "Search",
                description:
                  "Search for the right consultant for your project.",
              },
              {
                icon: "fas fa-handshake",
                title: "Hire",
                description:
                  "Hire the consultant who matches your requirements.",
              },
              {
                icon: "fas fa-laptop-code",
                title: "Work",
                description:
                  "Collaborate with your consultant on your project.",
              },
              {
                icon: "fas fa-thumbs-up",
                title: "Succeed",
                description:
                  "Achieve success with your project and consultant.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: -50, opacity: 0 }}
              >
                <i
                  className={`${step.icon} text-5xl text-indigo-600 mb-4 relative`}
                ></i>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <motion.section
        className="bg-indigo-700 text-white py-16 relative"
        style={{
          backgroundImage: "url('/pome.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-extrabold mb-8 animate__animated animate__fadeIn">
            What Our Clients Say
          </h2>
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {reviewData.map((review) => (
                  <motion.li
                    key={review.id}
                    className="glide__slide"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-pink-700 p-4 rounded-lg mx-2 text-white">
                      <i className="fas fa-quote-left text-3xl text-white mb-4"></i>
                      <p className="text-lg">{review.text}</p>
                      <p className="text-sm text-gray-300 -mt-2">
                        - {review.author}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left text-white"
                data-glide-dir="<"
              >
                <i className="fas fa-chevron-left text-2xl"></i>
              </button>
              <button
                className="glide__arrow glide__arrow--right text-white"
                data-glide-dir=">"
              >
                <i className="fas fa-chevron-right text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Footer Section */}
      <section className="bg-dark p-4 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 POMELO. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
