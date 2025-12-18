import React, { useState } from "react";
import bannerImg from "../../assets/photo.jpg";
import { CircleCheckBig, Sparkles, X } from "lucide-react";
import { floatingIcons, features } from "../../assets/dummyBanner";
import { bannerStyles, customStyles } from "../../assets/dummyStyles";
import video from "../../assets/BannerVideo.mp4"
const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={bannerStyles.container}>
      {/* Floating Icons Wrapper */}
      <div className={bannerStyles.floatingIconsWrapper}>
        {floatingIcons.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt || ""}
            className={`${bannerStyles.floatingIcon} ${icon.pos}`}
            style={{
              animationDelay: `${i * 0.35}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
          {/* Left Content */}
          <div className={bannerStyles.leftContent}>
            <span className={bannerStyles.badge}>
              <Sparkles className={bannerStyles.badgeIcon} />
              Courses Available Here
            </span>

            <h1 className={bannerStyles.heading}>
              <span className={bannerStyles.headingSpan1}>Learn Skills That Lead To</span>
              <span className={bannerStyles.headingSpan2}>Internships And Placements.</span>
            </h1>

            <p className={bannerStyles.description}>
              Build Industry-Ready Skills With Expert-Designed Courses And Hands-On Projects. Learn Modern Technologies And Start Your Career Journey Today.
            </p>

            {/* Features */}
            <div className={bannerStyles.featuresGrid}>
              {features.map((feature, i) => (
                <div key={i} className={bannerStyles.featureItem}>
                  <div className={bannerStyles.featureIconContainer}>
                    <span
                      className={`${bannerStyles.featureIcon} text-${feature.color}-500`}
                    >
                      <CircleCheckBig size={16} />
                    </span>
                  </div>
                  <span className={bannerStyles.featureText}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className={bannerStyles.buttonsContainer}>
              <a href="/courses" className={bannerStyles.buttonGetStarted}>
                Get Started
              </a>

              {/* View Demo → Opens Video */}
              <button
                onClick={() => setShowVideo(true)}
                className={bannerStyles.buttonViewDemo}
              >
                View Demo
              </button>
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
        <span><X className={bannerStyles.videoModal.closeIcon}/></span>
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
