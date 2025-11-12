import React from "react";
import developerPhoto from "../../../assets/developer.jpg"; // Developer photo path
import { FaGithub } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

export const AboutUs = () => {
  const projects = [
    {
      name: "Tourism Management System",
      link: "https://github.com/developer/tourism-management",
    },
    {
      name: "Library Management System",
      link: "https://github.com/developer/library-system",
    },
    {
      name: "E-Commerce Website",
      link: "https://github.com/developer/e-commerce",
    },
  ];

  return (
    <section className="">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-10">
        {/* Header */}
        
        <h1 className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo" className="w-12" />
          <span className="text-4xl font-bold font-dancing text-gradient text-white bg-gradient-to-r from-blue-700 via-blue-900 to-black px-6 py-2 rounded-full">
            About the Developer
          </span>
        </h1>

        {/* Developer Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-8 rounded-2xl shadow-lg">
          <img
            src={developerPhoto}
            alt="Developer"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="text-left flex-1 space-y-4">
            <h2 className="text-3xl font-semibold font-marcellus text-gray-800">
              Ali Hossain Borshon
            </h2>
            <p className="text-gray-600">
              Hi! I am a full-stack web developer and a passionate learner. I
              specialize in React, Node.js, Express, and MongoDB. I enjoy
              creating projects that solve real-world problems and provide a
              great user experience.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Projects ({projects.length})
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {projects.map((project, idx) => (
                  <li key={idx}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <Link
                href="https://github.com/developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black text-2xl"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
