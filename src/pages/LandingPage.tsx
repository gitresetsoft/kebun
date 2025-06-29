import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Camera, Users, Shield, Sparkles, Heart } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Mulakan kebun impian anda hari ini 🌱
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Ada <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">kebun cantik</span>?
              <br />
              <h2 className="text-3xl">Macam-macam tanaman?</h2>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Mari tunjukkan kebun, menyusun dan berkongsi koleksi kebun & tanaman secara digital.  <br/>
              <span className="text-sm md:text-xl mt-4">Sesuai untuk semua peringkat umur</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                // to="/signup"
                to="/kebun/315b5436-9eeb-4385-8cb8-2cd37615b57f" //sample kebun
                className="group bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 flex items-center hover-lift"
              >
                Jom Berkebun!
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              {/* <div className="flex items-center px-6 py-3 bg-gray-100 rounded-xl text-gray-700 font-mono text-sm">
                <span className="text-gray-500 mr-2">$</span>
                kebun cipta kebun saya
                <button className="ml-3 p-1 hover:bg-gray-200 rounded transition-colors duration-200">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Semua yang anda perlukan untuk mengurus kebun
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Daripada menyimpan gambar sehinggalah berkongsi dengan komuniti yan lain - kami sediakan semua yang diperlukan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover-lift animate-scale-in">
              {/* <div className="p-3 bg-green-100 rounded-xl w-fit mb-6 group-hover:bg-green-200 transition-colors duration-200">
                <Camera className="h-8 w-8 text-green-600" />
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gambar Tanaman 📸</h3>
              <p className="text-gray-600 leading-relaxed">
                Tangkap gambar tumbuhan dengan mudah, lengkap dengan nama dan maklumat. Simpan sebagai koleksi atau rujukan anda.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              {/* <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                <Users className="h-8 w-8 text-blue-600" />
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Perkongsian Awam 🌱</h3>
              <p className="text-gray-600 leading-relaxed">
                Kongsi koleksi kebun anda dengan komuniti atau dapatkan inspirasi daripada pencinta tanaman lain.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              {/* <div className="p-3 bg-purple-100 rounded-xl w-fit mb-6 group-hover:bg-purple-200 transition-colors duration-200">
                <Shield className="h-8 w-8 text-purple-600" />
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Selamat & Sulit 🔐</h3>
              <p className="text-gray-600 leading-relaxed">
                Data peribadi kebun anda dilindungi. Anda tentukan apa yang ingin dikongsi dan dengan siapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <Leaf className="h-16 w-16 text-white/80 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ayuh mulakan perjalanan berkebun anda hari ini
            </h2>

            <p className="text-xl text-green-100 mb-10 leading-relaxed">
              Sertai ratusan pencinta tanaman yang sudah mula menyusun, menyimpan dan berkongsi kebun mereka secara digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 hover-lift flex items-center justify-center"
              >
                <Heart className="mr-2 h-5 w-5" />
                Cipta Kebun Anda
              </Link>
              <Link 
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Log Masuk
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;
