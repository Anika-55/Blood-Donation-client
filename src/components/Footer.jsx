import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h1 className="text-2xl font-bold mb-2">BloodCare</h1>
          <p className="text-sm">
            Saving lives, one donation at a time. Join us in our mission to
            ensure every patient receives the blood they need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:underline">
                Donate Blood
              </Link>
            </li>
            <li>
              <Link to="/centers" className="hover:underline">
                Blood Centers
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold mb-2">Contact Us</h2>
          <ul className="space-y-1 text-sm">
            <li>123 Life Street, Dhaka, Bangladesh</li>
            <li>
              Email:{" "}
              <a href="mailto:support@bloodcare.org" className="underline">
                support@bloodcare.org
              </a>
            </li>
            <li>Phone: +880 123 456 789</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4 text-white">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="mailto:support@bloodcare.org"
              className="hover:text-gray-200"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-red-700 text-center text-sm py-4 mt-6">
        &copy; {new Date().getFullYear()} BloodCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
