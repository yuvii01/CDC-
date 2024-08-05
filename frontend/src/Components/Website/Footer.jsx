import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#61677A] text-white py-5 mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/images/logo.png"
              alt="CrepDogCrew Logo"
              className="mb-4 w-40"
            />
            <p className="text-center md:text-left">
              Stay updated with the latest trends in sneakers. Join our
              community today.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start bg-[#61677a] p-6 rounded-3xl">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-100">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start bg-[#61677A] p-6 rounded">
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-100">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start bg-[#272829] p-6 rounded-3xl">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-100">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png"
                    alt="YouTube"
                    className="w-6 h-6"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              &copy; 2024 CrepDogCrew. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
