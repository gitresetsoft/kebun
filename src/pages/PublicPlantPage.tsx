import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Heart,
  Share2,
  Camera,
  MapPin,
} from 'lucide-react';
import { readPlant } from '@/data/supabaseUtil';
import { Plant } from '@/data/plants';
import { Kebun } from '@/data/kebun';
import { Modal } from '@/components/ui/modal';

const PublicPlantPage: React.FC = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [kebunData, setKebunData] = useState<Kebun | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  // const [planterInfo, setPlanterInfo] = useState<{
  //   name: string;
  //   avatar: string;
  // } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlantImageModalOpen, setIsPlantImageModalOpen] = useState(false);
  // const [isPlanterAvatarModalOpen, setIsPlanterAvatarModalOpen] = useState(false);

  useEffect(() => {
    const loadPlant = async () => {
      setIsLoading(true);
      try {
        const plantId = id;
        if (!plantId) {
          console.error('Tiada plantId ditemui');
          setPlant(null);
          setIsLoading(false);
          return;
        }
        const { plant, kebun } = await readPlant(plantId);
        console.log('Public Plant', { plant, kebun });
        if (plant) {
          setPlant(plant);
          setKebunData(kebun);
          // if (plant.planted_by) {
          //   if (member) {
          //     setPlanterInfo({ name: member.name, avatar: member.avatar });
          //   }
          // }
        } else {
          console.error(`Tumbuhan dengan id ${plantId} tidak ditemui`);
          setPlant(null);
        }
      } catch (error) {
        console.error('Ralat memuatkan tumbuhan:', error);
        setPlant(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlant();
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
        console.log('Ralat berkongsi:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!plant || isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Memuatkan tumbuhan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        <h1 className='text-4xl font-bold text-gray-900 md:mb-3'>
          {plant.title}
        </h1>
        <p className='text-xl text-green-600 font-semibold italic mb-2 md:mb-4'>
          {plant.scientific_name}
        </p>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in'>
          {/* Plant Image */}
          <div className='relative h-96 bg-gray-200'>
            <img
              src={plant.image}
              alt={plant.title}
              className='w-full h-full object-cover cursor-pointer'
              onClick={() => setIsPlantImageModalOpen(true)}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>

            {/* Action Buttons */}
            <div className='absolute top-4 right-4 flex space-x-2'>
              {/* <button
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button> */}
              <button
                onClick={handleShare}
                className='p-3 bg-white/90 text-gray-700 rounded-full backdrop-blur-md hover:bg-white transition-all duration-200'
              >
                <Share2 className='h-5 w-5' />
              </button>
            </div>
            
            {/* Meta Information */}
              <div className='absolute bottom-0 left-0 w-full p-3 flex flex-wrap gap-2 text-sm z-10 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm'>
                <div className='flex items-center bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-lg p-2'>
                  📆
                  {new Date(plant.created_at).toLocaleDateString('ms-MY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {/* {planterInfo && (
                  <div 
                    className='flex items-center bg-gradient-to-r from-blue-500/80 to-green-500/80 rounded-lg p-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-green-600/80 transition-all duration-200'
                    onClick={() => setIsPlanterAvatarModalOpen(true)}
                  >
                    <img
                      src={planterInfo.avatar}
                      alt={planterInfo.name}
                      className='w-5 h-5 rounded-full mx-2'
                    />
                    {planterInfo.name}
                  </div>
                )} */}
                <div className='flex items-center bg-gradient-to-r from-yellow-500/80 to-orange-500/80 rounded-lg p-2'>
                  <a
                    href={`/kebun/${plant?.kebun_id}`}
                    className='h-4 w-auto mb-1'
                  >
                    {kebunData ? '🌱' + kebunData.name : 'Tiada data kebun'}
                  </a>
                </div>
              </div>
          </div>

          {/* Plant Details */}
          <div className='p-8'>

            {/* Description */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                Tentang tumbuhan ini
              </h2>
              <div
                className='text-gray-700 leading-relaxed text-lg space-y-4'
                dangerouslySetInnerHTML={{ __html: plant.description }}
              />
            </div>

            {/* Plant Care Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              <div className={`rounded-xl p-6 ${plant.difficulty <= 4 ? 'bg-green-50' : plant.difficulty <= 7 ? 'bg-orange-50' : 'bg-red-50'}`}>
                <div className='flex justify-between items-center'>
                  <h3 className='font-semibold text-gray-900'>
                    Tahap Penjagaan
                  </h3>
                  <span className='text-sm text-gray-600'>
                    {plant.difficulty <= 4 ? 'Mudah' : plant.difficulty <= 7 ? 'Sederhana' : 'Susah'}: {plant.difficulty}/10
                  </span>
                </div>
                <div className='flex items-center'>
                  <span className='text-sm text-gray-600'>🌱</span>
                  {[...Array(plant.difficulty)].map((_, index) => (
                    index > 0 ? <span key={index} className='text-sm text-gray-600 ml-2'>🌱</span> : ''
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            {/* <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
              <button
                onClick={handleLike}
                className={`flex items-center justify-center px-6 py-3 rounded-xl transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`}
                />
                {isLiked ? 'Disukai' : 'Sukai tumbuhan ini'}
              </button>

              <Link
                to='/signup'
                className='flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200'
              >
                <MapPin className='h-5 w-5 mr-2' />
                Mulakan Taman Anda Sendiri
              </Link>
            </div> */}

          </div>
        </div>

        
        {/* Back Navigation */}
        <div className='p-5 mt-12 md:mb-2 animate-fade-in rounded-lg bg-gradient-to-l from-green-400/30 to-green-300/30 shadow-xl'>
          <a
            href={`/kebun/${plant?.kebun_id}`}
            className='flex items-start text-gray-600 hover:text-green-600 transition-colors duration-200'
          >
            <ArrowLeft className='h-8 w-8 mr-3 mt-1 shrink-0' />
            <div className='flex flex-col leading-snug'>
              <span>Kembali ke:</span>
              <span className='font-bold italic text-green-500'>{kebunData.name}</span>
            </div>
          </a>
        </div>
        {/* To Kebun */}
        {/* <div className='mt-12 animate-fade-in'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Lebih dari taman ini
          </h2>
          <div className='text-center py-8 bg-white rounded-xl'>
            <p className='text-gray-600'>
              Lihat semua pokok yang ditanam di kebun ini:
            </p>
            <Link
              to={`/kebun/${plant?.kebun_id}`}
              className='inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium'
            >
              {kebunData.name}
              <ArrowLeft className='h-4 w-4 ml-1 rotate-180' />
            </Link>
          </div>
        </div> */}
      </div>

      {/* Plant Image Modal */}
      <Modal isOpen={isPlantImageModalOpen} onClose={() => setIsPlantImageModalOpen(false)}>
        <img 
          src={plant.image} 
          alt={plant.title} 
          className="w-full h-auto object-contain max-h-[80vh]" 
        />
      </Modal>

      {/* Planter Avatar Modal */}
      {/* <Modal isOpen={isPlanterAvatarModalOpen} onClose={() => setIsPlanterAvatarModalOpen(false)}>
        <div className="p-8 text-center">
          <img 
            src={planterInfo?.avatar} 
            alt={planterInfo?.name} 
            className="w-45 h-auto rounded-full mx-auto mb-4 object-cover" 
          />
          <h3 className="text-xl font-semibold text-gray-900">{planterInfo?.name}</h3>
          <p className="text-gray-600"></p>
        </div>
      </Modal> */}
    </div>
  );
};

export default PublicPlantPage;
