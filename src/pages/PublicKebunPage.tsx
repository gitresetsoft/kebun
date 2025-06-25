
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, MapPin, Calendar, Eye, Heart, Share2, User } from 'lucide-react';
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

const PublicKebunPage: React.FC = () => {
  const { id } = useParams();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [activeTab, setActiveTab] = useState<'plants' | 'members'>('plants');

  useEffect(() => {
    // Load plants from localStorage (mock data)
    const storedPlants = localStorage.getItem('kebun_plants');
    if (storedPlants) {
      setPlants(JSON.parse(storedPlants));
    }
  }, [id]);

  const getMemberName = (memberId: string) => {
    const members = JSON.parse(localStorage.getItem('kebun_members') || '[]');
    const member = members.find((m: any) => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Kebun Profile Section */}
        <div className="animate-fade-in mb-8">
          <KebunProfile isOwner={false} />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg animate-slide-up">
          <button
            onClick={() => setActiveTab('plants')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'plants'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Leaf className="h-5 w-5 mr-2" />
            Plants ({plants.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'members'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="h-5 w-5 mr-2" />
            Members
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div className="animate-fade-in">
            <MembersList isOwner={false} />
          </div>
        )}

        {activeTab === 'plants' && (
          <div className="animate-fade-in">
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Plant Collection</h2>
                <p className="text-gray-600">Discover the beautiful plants in this garden</p>
              </div>
              
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </button>
                <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Plants Grid */}
            {plants.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No plants yet</h3>
                <p className="text-gray-600">This garden is just getting started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plants.map((plant, index) => (
                  <Link
                    key={plant.id}
                    to={`/plant/${plant.id}`}
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
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                        {plant.title}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mb-3">{plant.scientificName}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{plant.description}</p>
                      
                      {plant.plantedBy && (
                        <p className="text-xs text-green-600 mb-2 font-medium">
                          By {getMemberName(plant.plantedBy)}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Added {new Date(plant.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Garden Stats */}
        {plants.length > 0 && activeTab === 'plants' && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Garden Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{plants.length}</div>
                <div className="text-gray-600">Total Plants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {new Set(plants.map(p => p.scientificName.split(' ')[0])).size}
                </div>
                <div className="text-gray-600">Plant Families</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {JSON.parse(localStorage.getItem('kebun_members') || '[]').length}
                </div>
                <div className="text-gray-600">Garden Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Math.floor(Math.random() * 50) + 10}
                </div>
                <div className="text-gray-600">Community Likes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicKebunPage;
