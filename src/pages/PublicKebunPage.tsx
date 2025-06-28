import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, MapPin, Calendar, Eye, Heart, Share2, User, Trophy } from 'lucide-react';
import KebunProfile from '../components/KebunProfile';
import MembersList from '../components/MembersList';
// import AchievementsList from '../components/AchievementsList'; // Assuming AchievementsList component exists
import { readKebun } from '@/data/supabaseUtil';
import Info from '@/components/Info';

const PublicKebunPage: React.FC = () => {
  const { id } = useParams();
  const [kebunData, setKebunData] = useState();
  const [plantsList, setPlantsList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [activeTab, setActiveTab] = useState<'plants' | 'members' | 'achievements'>('plants');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadKebun = async () => {
      setIsLoading(true);
      try {
        const kebunId = id;
        if (!kebunId) {
          console.error('Tiada kebunId ditemui');
          setPlantsList([]);
          setIsLoading(false);
          return;
        }
        const { kebun, plants, members } = await readKebun(kebunId); // Assuming achievements are part of the kebun data
        console.log('Public Kebun',{kebun, plants, members})
        if (kebun) {
          setKebunData(kebun);
          setMembersList(members);
          setPlantsList(plants);
          // setAchievementsList(achievements); // Set achievements list
        } else {
          console.error(`Kebun dengan id ${kebunId} tidak ditemui`);
          setPlantsList([]);
        }
      } catch (error) {
        console.error('Ralat memuat kebun:', error);
        setPlantsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadKebun();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-12 py-2">
        {/* Kebun Profile Section */}
        <div className="animate-fade-in mb-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <KebunProfile isOwner={false} kebun={kebunData} />
          )}
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
            Tanaman
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
            Ahli
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'achievements'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trophy className="h-5 w-5 mr-2" />
            Info
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div className="animate-fade-in">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <MembersList isOwner={false} members={membersList} />
            )}
          </div>
        )}

        {activeTab === 'plants' && (
          <div className="animate-fade-in">
            {/* Actions */}
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Tumbuhan</h2>
                <p className="text-gray-600">Temui tumbuhan yang indah dalam taman ini</p>
              </div>
              
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <Heart className="h-4 w-4 mr-2" />
                  Suka
                </button>
                <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Kongsi
                </button>
              </div>
            </div> */}

            {/* Plants Grid */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              plantsList.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Leaf className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tiada tanaman lagi</h3>
                  <p className="text-gray-600">Taman ini baru sahaja bermula!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {plantsList.map((plant, index) => (
                    <Link
                      key={plant.id}
                      to={`/plant/${plant.id}`}
                      className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Left-side Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
                        <img
                          src={plant.image}
                          alt={plant.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                        />
                      </div>
                    
                      {/* Right-side Content */}
                      <div className="p-4 flex-1">
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                          {plant.title}
                        </h3>
                        <p className="text-sm text-green-600 font-medium">{plant.scientific_name}</p>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(plant.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="animate-fade-in">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              kebunData ? (
                <Info data={kebunData} />
              ) : (
                <div>Info tidak ditemui</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicKebunPage;
