
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Leaf, Camera, Edit, Eye, Trash2 } from 'lucide-react';

interface Plant {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    // Load plants from localStorage (mock data)
    const storedPlants = localStorage.getItem('kebun_plants');
    if (storedPlants) {
      setPlants(JSON.parse(storedPlants));
    } else {
      // Set some sample plants
      const samplePlants: Plant[] = [
        {
          id: '1',
          title: 'Monstera Deliciosa',
          scientificName: 'Monstera deliciosa',
          description: 'A beautiful tropical plant with large, fenestrated leaves. Perfect for indoor decoration.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Peace Lily',
          scientificName: 'Spathiphyllum wallisii',
          description: 'Elegant flowering houseplant known for its white blooms and air-purifying qualities.',
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
          createdAt: new Date().toISOString(),
        },
      ];
      setPlants(samplePlants);
      localStorage.setItem('kebun_plants', JSON.stringify(samplePlants));
    }
  }, []);

  const deletePlant = (plantId: string) => {
    const updatedPlants = plants.filter(plant => plant.id !== plantId);
    setPlants(updatedPlants);
    localStorage.setItem('kebun_plants', JSON.stringify(updatedPlants));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your garden collections and plant discoveries
              </p>
            </div>
            <Link
              to="/dashboard/plants/new"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 hover-lift"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Plant
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Plants</p>
                <p className="text-3xl font-bold text-gray-900">{plants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Photos Taken</p>
                <p className="text-3xl font-bold text-gray-900">{plants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-3xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Plant Collection</h2>
            <Link 
              to={`/kebun/${user?.id}`} 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Public Page
            </Link>
          </div>

          {plants.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No plants yet</h3>
              <p className="text-gray-600 mb-8">Start building your collection by adding your first plant</p>
              <Link
                to="/dashboard/plants/new"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Plant
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
              {plants.map((plant, index) => (
                <div 
                  key={plant.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={plant.image}
                      alt={plant.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plant.title}</h3>
                    <p className="text-sm text-green-600 font-medium mb-3">{plant.scientificName}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plant.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Link
                          to={`/plant/${plant.id}`}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="View plant"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Edit plant"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePlant(plant.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete plant"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
