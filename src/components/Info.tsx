import React, { useState } from 'react'
import { Infos, Kebun } from '@/data/kebun'
import { Modal } from './ui/modal'

interface InfoProps {
  data: Kebun
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const filteredInfo = data.info;

  return (
    <div>
      <h2>Awards</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInfo.awards.map((award, index) => (
          <div key={award.title} className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={award.images ? award.images[0] : ''}
                alt={`Award ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                onClick={() => handleImageClick(award.images ? award.images[0] : '')}
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                {award.title}
              </h3>
              <p className="text-sm text-green-600 font-medium">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-3">Sponsors</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInfo.sponsors.map((sponsor, index) => (
          <div key={sponsor.title} className="group flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:bg-gray-50 transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={sponsor.images ? sponsor.images[0] : ''}
                alt={`Sponsor ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                onClick={() => handleImageClick(sponsor.images ? sponsor.images[0] : '')}
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                {sponsor.title}
              </h3>
              <p className="text-sm text-green-600 font-medium">{sponsor.description}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedImage && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-8 text-center">
            <img 
              src={selectedImage} 
              alt="Award or Sponsor" 
              className="w-45 h-auto mx-auto mb-4 object-cover" 
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Info