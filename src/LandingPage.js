import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4">
            <span className="text-amber-400">WKND</span> WARRIOR
          </h1>
          <p className="text-2xl text-gray-300">Conquer Your Weekend</p>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xl mb-8">
            Find perfect weekends where your favorite artists AND sports teams 
            are playing in the same city. Never miss an epic weekend again!
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-amber-400 text-gray-900 font-bold text-lg rounded hover:bg-amber-300 transition"
          >
            Start Conquering
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold text-lg rounded hover:bg-amber-400 hover:text-gray-900 transition"
          >
            Login
          </button>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-2">Connect Music</h3>
            <p className="text-gray-400">Link Spotify to find your artists</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏈</div>
            <h3 className="text-xl font-bold mb-2">Pick Teams</h3>
            <p className="text-gray-400">Select your favorite sports teams</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Find Weekends</h3>
            <p className="text-gray-400">Discover perfect weekend matches</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
