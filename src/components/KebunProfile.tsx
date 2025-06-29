import React, { useState, useEffect } from 'react';
import { Camera, Edit3, Facebook, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Kebun } from '@/data/kebun';
import { Modal } from '@/components/ui/modal';

interface KebunProfileProps {
  kebun: Kebun;
  isOwner?: boolean;
}

const KebunProfile: React.FC<KebunProfileProps> = ({ kebun, isOwner = false }) => {
  const [profileData, setProfileData] = useState<Kebun>(kebun);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);

  useEffect(() => {
    setProfileData(kebun);
  }, [kebun]);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleImageClick = () => {
    setIsImageViewModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-400 to-emerald-500">
          <img
            src={profileData.image}
            alt="Garden cover"
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {isOwner && (
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "destructive" : "secondary"}
                size="sm"
                className="backdrop-blur-md bg-white/90 hover:bg-white"
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-3">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <Input
                  value={editData.image}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  placeholder="Enter cover image URL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Describe your garden..."
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: profileData.description }}></p>
            </div>
          )}
        </div>
        

        {/* Social Media Links Overlay */}
        <div className="flex space-x-4 bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg max-w-[120px] mx-auto mb-2">
          <a href="https://www.facebook.com/groups/651810512473697" target="_blank" rel="noopener noreferrer" className="text-white flex items-center">
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </a>
        </div>
      </div>

      {/* Image View Modal */}
      <Modal isOpen={isImageViewModalOpen} onClose={() => setIsImageViewModalOpen(false)}>
        <img 
          src={profileData.image} 
          alt="Garden cover" 
          className="w-full h-auto object-contain max-h-[80vh]" 
        />
      </Modal>
    </>
  );
};

export default KebunProfile;
