
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, Share2, Camera, MapPin } from 'lucide-react';

interface Plant {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  plantedBy?: string;
  createdAt: string;
}

const PublicPlantPage: React.FC = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [planterInfo, setPlanterInfo] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    // Load plant from localStorage (mock data)
    const storedPlants = localStorage.getItem('kebun_plants');
    if (storedPlants) {
      const plants: Plant[] = JSON.parse(storedPlants);
      const foundPlant = plants.find(p => p.id === id);
      setPlant(foundPlant || null);
      
      // Get planter info
      if (foundPlant?.plantedBy) {
        const members = JSON.parse(localStorage.getItem('kebun_members') || '[]');
        const member = members.find((m: any) => m.id === foundPlant.plantedBy);
        if (member) {
          setPlanterInfo({ name: member.name, avatar: member.avatar });
        }
      }
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: plant?.title,
          text: plant?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
          {/* Plant Image */}
          <div className="relative h-96 bg-gray-200">
            <img
              src={plant.image}
              alt={plant.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/90 text-gray-700 rounded-full backdrop-blur-md hover:bg-white transition-all duration-200"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Plant Details */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{plant.title}</h1>
              <p className="text-xl text-green-600 font-semibold mb-4">{plant.scientificName}</p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Added {new Date(plant.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {planterInfo && (
                  <div className="flex items-center">
                    <img
                      src={planterInfo.avatar}
                      alt={planterInfo.name}
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    Planted by {planterInfo.name}
                  </div>
                )}
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  1 photo
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this plant</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{plant.description}</p>
            </div>

            {/* Plant Care Info (Mock) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Care Level</h3>
                <div className="flex items-center">
                  <div className="w-full bg-green-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm text-gray-600">Moderate</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Light Requirements</h3>
                <p className="text-gray-600">Bright, indirect light</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleLike}
                className={`flex items-center justify-center px-6 py-3 rounded-xl transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like this plant'}
              </button>
              
              <Link
                to="/signup"
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Start Your Own Garden
              </Link>
            </div>
          </div>
        </div>

        {/* Related Plants (Mock) */}
        <div className="mt-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More from this garden</h2>
          <div className="text-center py-8 bg-white rounded-xl">
            <p className="text-gray-600">Explore more plants from this collection</p>
            <Link
              to={`/kebun/1`}
              className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              View Garden Collection
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPlantPage;
