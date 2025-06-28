import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import MemberSelector from '../components/MemberSelector';
import { readPlant, updateRecord } from '@/data/supabaseUtil';
import { Plant } from '@/data/plants';
import { Kebun } from '@/data/kebun';
import { Member } from '@/data/members';

interface data { plant: Plant; member: Member; kebun: Kebun; }

const EditPlantPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    scientific_name: '',
    description: '',
    image: '',
    plantedBy: '',
  });

  useEffect(() => {
    // Fetch plant data from the utility function
    const fetchPlantData = async () => {
      try {
        const plantData = await readPlant(id);
        if (plantData) {
          setFormData({
            title: plantData.plant.title,
            scientific_name: plantData.plant.scientific_name,
            description: plantData.plant.description,
            image: plantData.plant.image,
            plantedBy: plantData.plant.planted_by || '',
          });
        }
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchPlantData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatePlant = async () => {
      try {
        await updateRecord('mykebun_plant', id, formData);
        toast({
          title: "Plant updated successfully!",
          description: "Your plant information has been updated.",
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating plant data:', error);
      }
    };

    updatePlant();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Plant</h1>
          <p className="text-gray-600">Update your plant information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors duration-200">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Plant preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                )}
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Plant Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Fiddle Leaf Fig"
              />
            </div>

            {/* Scientific Name */}
            <div>
              <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700 mb-2">
                Scientific Name *
              </label>
              <input
                type="text"
                id="scientificName"
                name="scientificName"
                required
                value={formData.scientific_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Ficus lyrata"
              />
            </div>

            {/* Planted By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planted By
              </label>
              <MemberSelector
                value={formData.plantedBy}
                onValueChange={(value) => setFormData(prev => ({ ...prev, plantedBy: value }))}
                placeholder="Select who planted this"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about your plant..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center py-3 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="h-5 w-5 mr-2" />
                Update Plant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlantPage;
