import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 w-full mt-10 py-6 px-4 md:px-12 text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl text-gray-800">🌍 TravelPlanner</h2>
          <p className="text-sm">Plan smarter. Travel better.</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Social / Contact */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-black" aria-label="Twitter">🐦</a>
          <a href="#" className="hover:text-black" aria-label="Instagram">📸</a>
          <a href="#" className="hover:text-black" aria-label="Email">✉️</a>
        </div>
      </div>

      {/* Personal Credit */}
      <p className="text-xs text-center mt-4 text-gray-500">
        Made with <span className="text-pink-500">♥</span> by Anjali Sidda – AI Travel Planner
      </p>

      {/* Copyright */}
      <p className="text-xs text-center text-gray-400 mt-1">
        © {new Date().getFullYear()} TravelPlanner. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
