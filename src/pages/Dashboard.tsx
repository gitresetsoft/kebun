
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Leaf, Calendar, Edit3, Eye, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import KebunProfile from '../components/KebunProfile';
import MembersList from '../components/MembersList';

interface Plant {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  plantedBy?: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [activeTab, setActiveTab] = useState<'plants' | 'members' | 'profile'>('plants');

  useEffect(() => {
    // Load plants from localStorage
    const storedPlants = localStorage.getItem('kebun_plants');
    if (storedPlants) {
      setPlants(JSON.parse(storedPlants));
    }
  }, []);

  const getMemberName = (memberId: string) => {
    const members = JSON.parse(localStorage.getItem('kebun_members') || '[]');
    const member = members.find((m: any) => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your garden and watch it flourish</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg">
          <button
            onClick={() => setActiveTab('plants')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'plants'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Leaf className="h-5 w-5 mr-2" />
            Plants
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'members'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5 mr-2" />
            Members
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="h-5 w-5 mr-2" />
            Garden Profile
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <KebunProfile isOwner={true} />
          </div>
        )}

        {activeTab === 'members' && (
          <div className="animate-fade-in">
            <MembersList isOwner={true} />
          </div>
        )}

        {activeTab === 'plants' && (
          <div className="animate-fade-in">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Plant Collection</h2>
                <p className="text-gray-600">You have {plants.length} plants in your garden</p>
              </div>
              
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <Link
                  to="/kebun/1"
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Page
                </Link>
                <Link
                  to="/dashboard/plants/new"
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Plant
                </Link>
              </div>
            </div>

            {/* Plants Grid */}
            {plants.length === 0 ? (
              <div className="text-center py-16 animate-scale-in">
                <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No plants yet</h3>
                <p className="text-gray-600 mb-8">Start building your digital garden by adding your first plant!</p>
                <Link
                  to="/dashboard/plants/new"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Plant
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
                {plants.map((plant, index) => (
                  <div
                    key={plant.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={plant.image}
                        alt={plant.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      
                      {/* Edit Button */}
                      <Link
                        to={`/dashboard/plants/${plant.id}/edit`}
                        className="absolute top-2 right-2 p-2 bg-white/90 text-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                        {plant.title}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mb-3">{plant.scientificName}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{plant.description}</p>
                      
                      {plant.plantedBy && (
                        <p className="text-xs text-gray-500 mb-2">
                          Planted by {getMemberName(plant.plantedBy)}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Added {new Date(plant.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
