import React, { useState } from "react";
import bannerImg from "../../assets/photo.jpg";
import { X } from "lucide-react";
import { bannerStyles, customStyles } from "../../assets/dummyStyles";
import video from "../../assets/BannerVideo.mp4"
const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={bannerStyles.container}>
      <div className={bannerStyles.contentWrapper}>
        <div className={bannerStyles.grid}>
          {/* Left Content */}
          <div className={bannerStyles.leftContent}>

            {/* Heading Card with Get Started Button */}
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl animate-fade-in mb-4 relative">
              <div className="absolute top-3 right-3">
                <a href="/courses" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-semibold text-xs sm:text-sm shadow-lg transition-all">
                  Get Started
                </a>
              </div>
              <h1 className={`${bannerStyles.heading} pr-24`}>
                <span className={bannerStyles.headingSpan1}>Develop career-ready skills</span>
                <span className={bannerStyles.headingSpan2}>with smart learning and progress tracking.</span>
              </h1>
            </div>

            {/* Description Card */}
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl animate-fade-in">
              <p className={bannerStyles.description}>
                Learn smarter, track progress, and build career-ready skills—all in one platform.
              </p>
            </div>

          </div>

          {/* Right Image */}
          <div className={bannerStyles.imageContainer}>
            <img
              src={bannerImg}
              alt="Digital product illustration"
              className={bannerStyles.image}
            />
          </div>
        </div>
      </div>

      {/* 🎬 Video Modal */}
      {showVideo && (
        <div className={bannerStyles.videoModal.overlay}>
          <div className={bannerStyles.videoModal.container}>
            {/* Embedded YouTube video (replace with your link) */}
            <iframe
              className={bannerStyles.videoModal.iframe}
              src={video}
              title="Demo Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className={bannerStyles.videoModal.closeButton}
            >
              <span><X className={bannerStyles.videoModal.closeIcon} /></span>
            </button>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{customStyles}</style>

      {/* Inline Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;
