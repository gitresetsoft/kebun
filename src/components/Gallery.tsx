import React, { useState } from 'react'
import { Galleries, Kebun } from '@/data/kebun'
import { Modal } from './ui/modal'

interface GalleryProps {
  data: Kebun
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)
  const [selectedGalleryDescription, setSelectedGalleryDescription] = useState<string | null>(null)

  const handleGalleryClick = (galleryKey: string, galleryImage: string, galleryDescription: string) => {
    setSelectedGallery(galleryKey)
    setSelectedGalleryImage(galleryImage)
    setSelectedGalleryDescription(galleryDescription)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGallery(null)
    setSelectedGalleryImage(null)
    setSelectedGalleryDescription(null)
  }

  const filteredGallery = data.gallery;

  return (
    <div>
      <span className="text-xl font-bold mb-1">Landskap</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {filteredGallery.landscape ? filteredGallery.landscape.map((gallery, index) => (
          <div key={gallery.title} className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => handleGalleryClick(gallery.title, gallery.images ? gallery.images[0] : '', gallery.description ? gallery.description : '')}>
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={gallery.images ? gallery.images[0] : ''}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                {gallery.title}
              </h3>
              <p className="text-sm text-green-600 font-medium">{gallery.description}</p>
            </div>
          </div>
        )) : 'Tiada data landskap ditemui'}
      </div>

      <span className="text-xl font-bold mb-1">Aktiviti</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {filteredGallery.activity ? filteredGallery.activity.map((gallery, index) => (
          <div key={gallery.title} className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => handleGalleryClick(gallery.title, gallery.images ? gallery.images[0] : '', gallery.description ? gallery.description : '')}>
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={gallery.images ? gallery.images[0] : ''}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                {gallery.title}
              </h3>
              <p className="text-sm text-green-600 font-medium">{gallery.description}</p>
            </div>
          </div>
        )) : 'Tiada data landskap ditemui'}
      </div>

      <span className="text-xl font-bold mb-1">Lain-lain</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {filteredGallery.etc ? filteredGallery.etc.map((gallery, index) => (
          <div key={gallery.title} className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => handleGalleryClick(gallery.title, gallery.images ? gallery.images[0] : '', gallery.description ? gallery.description : '')}>
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={gallery.images ? gallery.images[0] : ''}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                {gallery.title}
              </h3>
              {gallery.title.toLowerCase().includes('logo') ? <span className="italic text-sm">Lihat maksud disebalik Logo</span> : <p className="text-sm text-green-600 font-medium">{gallery.description}</p>}
            </div>
          </div>
        )) : 'Tiada data landskap ditemui'}
      </div>


      {isModalOpen && selectedGallery && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-8 text-center">
            {/* <h2 className="text-2xl font-bold mb-4">{selectedGallery}</h2> */}
            {selectedGalleryImage && <img src={selectedGalleryImage} alt={`Modal for ${selectedGallery}`} className="mb-4" />}
            {selectedGallery.toLowerCase().includes('logo') ? <div className="text-left" dangerouslySetInnerHTML={{ __html: selectedGalleryDescription ? selectedGalleryDescription : 'Tiada deskripsi' }}></div> : <p>{selectedGalleryDescription ? selectedGalleryDescription : ''}</p>}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Gallery