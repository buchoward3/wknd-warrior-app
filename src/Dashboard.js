import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { api } from './api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    connected_services: [],
    favorite_teams: [],
    perfect_weekends_found: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await api.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectSpotify = async () => {
    try {
      await api.connectSpotify();
    } catch (error) {
      console.error('Failed to connect Spotify:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black">
            <span className="text-amber-400">WKND</span> WARRIOR
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Welcome, {user?.username || 'Warrior'}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-amber-400 hover:text-amber-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Command Center</h2>
          <p className="text-gray-400">Your weekend conquest headquarters</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-amber-400 text-xl animate-pulse">Loading your stats...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-2">🎵</div>
              <h3 className="text-xl font-bold mb-2">Music Services</h3>
              <div className="text-gray-400 mb-4">
                {stats.connected_services?.includes('spotify') ? (
                  <span className="text-green-400">✓ Spotify Connected</span>
                ) : (
                  <span>Not connected</span>
                )}
              </div>
              {!stats.connected_services?.includes('spotify') && (
                <button
                  onClick={handleConnectSpotify}
                  className="px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded hover:bg-amber-300 transition"
                >
                  Connect Spotify
                </button>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-2">🏈</div>
              <h3 className="text-xl font-bold mb-2">Favorite Teams</h3>
              <div className="text-gray-400">
                {stats.favorite_teams?.length > 0 ? (
                  <span className="text-green-400">{stats.favorite_teams.length} teams selected</span>
                ) : (
                  <span>No teams selected</span>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-xl font-bold mb-2">Perfect Weekends</h3>
              <div className="text-3xl font-bold text-amber-400">
                {stats.perfect_weekends_found || 0}
              </div>
              <div className="text-gray-400">Found so far</div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/find-weekends')}
            className="px-8 py-4 bg-amber-400 text-gray-900 font-black text-xl rounded hover:bg-amber-300 transition transform hover:scale-105"
          >
            FIND MY PERFECT WEEKENDS 🚀
          </button>
        </div>

        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <ol className="space-y-3 text-gray-300">
            <li>1. Connect your Spotify to import your top artists</li>
            <li>2. Select your favorite sports teams</li>
            <li>3. We scan the next 6 months for perfect weekends</li>
            <li>4. Get notified when your artists AND teams align in the same city!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
