import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-blue-200 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-blue-100 mb-4">About Us</h3>
            <p className="text-blue-300">
              We are a decentralized voting platform committed to ensuring
              transparency, security, and fairness through blockchain technology.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-blue-100 mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-blue-100 mb-4">Contact Us</h3>
            <p className="text-blue-300">
              123 Blockchain Blvd, Decentral City, 10001
            </p>
            <p className="text-blue-300">Email: support@dvote.io</p>
            <p className="text-blue-300">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-700 pt-4">
          <p className="text-center text-blue-400">
            &copy; 2024 Vote 3.0. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
