import React from "react";
import { Link } from "react-router-dom";
const HeroBanner = () => {
  return (
    <div className="bg-sky-500 p-10 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-4 text-white">
        Secure, Transparent, and Decentralized Voting
      </h2>
      <p className="mx-10 text-gray-200">
        Participate in elections using a secure and transparent blockchain
        platform. Your vote is immutable and anonymous, ensuring fair and
        tamper-proof results.
      </p>
      <Link
        to={'/main'} 
        className="my-10 m-2 p-1 px-5 text-white rounded-xl border-white border-2 shadow-2xl shadow-white hover:bg-white hover:text-sky-500 
transition ease-in-out duration-300 transform hover:scale-105 animate-pulse"
      >
        Get Started
      </Link>
    </div>
  );
};

export default HeroBanner;
