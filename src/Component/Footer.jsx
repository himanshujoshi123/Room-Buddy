import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-700 to-violet-500 bottom-0 w-full py-6">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="text-white text-xl font-medium">
          Free to list, search & communicate
        </div>
        <nav className="flex flex-wrap space-x-4">
          <a href="" className="text-white hover:underline">
            How to find a room
          </a>
          <a href="" className="text-white hover:underline">
            How to rent your room
          </a>
          <a href="" className="text-white hover:underline">
            Free roommate agreement
          </a>
          <a href="" className="text-white hover:underline">Safety & Security</a>
          <a href="" className="text-white hover:underline">Community standards</a>
        </nav>
        <nav className="flex flex-wrap space-x-4">
          <a href="" className="text-white hover:underline">Help</a>
          <a href="" className="text-white hover:underline">Team</a>
          <a href="" className="text-white hover:underline">Blog</a>
          <a href="" className="text-white hover:underline">Terms</a>
          <a href="" className="text-white hover:underline">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
