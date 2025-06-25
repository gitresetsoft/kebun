
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, MapPin, Calendar, Eye, Heart, Share2 } from 'lucide-react';

interface Plant {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  createdAt: string;
}

const PublicKebunPage: React.FC = () => {
  const { id } = useParams();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [kebunOwner] = useState({ name: 'Garden Enthusiast', joinedAt: '2024-01-15' });

  useEffect(() => {
    // Load plants from localStorage (mock data)
    const storedPlants = localStorage.getItem('kebun_plants');
    if (storedPlants) {
      setPlants(JSON.parse(storedPlants));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Leaf className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {kebunOwner.name}'s Garden
            </h1>
            <p className="text-xl text-green-100 mb-8">
              A beautiful collection of {plants.length} plants and growing
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-green-100">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Public Garden</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Member since {new Date(kebunOwner.joinedAt).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                <span>{Math.floor(Math.random() * 500) + 100} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 animate-slide-up">
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
          <div className="text-center py-16 animate-fade-in">
            <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No plants yet</h3>
            <p className="text-gray-600">This garden is just getting started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
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
                  <p className="text-gray-600 text-sm line-clamp-2">{plant.description}</p>
                  
                  <div className="mt-4 flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Added {new Date(plant.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Garden Stats */}
        {plants.length > 0 && (
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
                  {Math.floor((Date.now() - new Date(kebunOwner.joinedAt).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-gray-600">Days Growing</div>
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
