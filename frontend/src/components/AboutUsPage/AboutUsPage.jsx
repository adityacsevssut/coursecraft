import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Star, BadgeCheck, ShieldUser, MessageCircleCode } from "lucide-react";
import AboutBanner from "../../assets/AboutBannerImage.png"
import {
  counterTargets,
  statsMeta,
  missionVisionValues,
  teamMembers,
  values,
  testimonials,
} from "../../assets/dummyAbout";
import { aboutUsStyles, aboutUsAnimations } from "../../assets/dummyStyles";

const AboutUsPage = () => {
  const [counterValues, setCounterValues] = useState({
    students: 0,
    courses: 0,
    successRate: 0,
    countries: 0,
    certificates: 0,
    support: 0,
  });

  // Animated counter effect using imported counterTargets
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = [];

    Object.keys(counterTargets).forEach((key) => {
      let current = 0;
      const target = counterTargets[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounterValues((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, []);

  // Helper to format display number per stat key
  const formatStatNumber = (key) => {
    if (key === "support") return "24/7";
    if (key === "successRate") return `${counterValues.successRate}%`;
    const val = counterValues[key] ?? 0;
    // certificates might be large -> show with commas and plus
    if (key === "certificates") return `${val.toLocaleString()}+`;
    return `${val.toLocaleString()}+`;
  };

  return (
    <div className={aboutUsStyles.container}>
      {/* Enhanced Hero Section */}
      <section className={aboutUsStyles.heroSection}>
        {/* Animated Background */}
        <div className={aboutUsStyles.heroBackground}>
          {/* Background image (slightly reduced opacity and scaled for parallax feel) */}
          <div
            className={aboutUsStyles.heroImageContainer}
            style={{
              backgroundImage: `url(${AboutBanner})`,
              opacity: 0.85,
            }}
          />


          {/* Top-and-bottom vignette */}
          <div
            className={aboutUsStyles.heroVignette}
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.72) 100%)",
            }}
          />

          {/* Soft tint */}
          <div className={aboutUsStyles.heroTint} />
        </div>

        <div className={aboutUsStyles.heroContent}>
          {/* Trust Badge */}
          <div className={aboutUsStyles.trustBadge}>
            <Star className={aboutUsStyles.trustIcon} />
            Trusted by 100+ students worldwide And Increasing
          </div>

          {/* Main Heading */}
          <h1 className={aboutUsStyles.mainHeading}>
            About CourseCraft
          </h1>

          {/* Subheading */}
          <p className={aboutUsStyles.subHeading}>
            Empowering millions to achieve dreams through
            <span className={aboutUsStyles.inlineHighlight}>
              accessible education
            </span>
          </p>

          {/* Stats Preview */}
          <div className={aboutUsStyles.statsGrid}>
            {statsMeta.slice(0, 4).map((stat, index) => (
              <div
                key={index}
                className={aboutUsStyles.statCard}
                style={{ minWidth: 120 }}
              >
                <div className={aboutUsStyles.statNumber}>
                  {formatStatNumber(stat.key)}
                </div>
                <div className={aboutUsStyles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Sections (from imported missionVisionValues) */}
      {missionVisionValues.map((section, index) => (
        <section
          key={section.type}
          className={`${aboutUsStyles.sectionContainer} ${section.bgColor} ${index % 2 === 1 ? "bg-white" : ""
            }`}
        >
          <div className={aboutUsStyles.sectionGrid}>
            <div
              className={`${aboutUsStyles.sectionContentGrid} ${index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
            >
              {/* Image Section */}
              <div
                className={`${aboutUsStyles.sectionImageContainer} ${index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
              >
                <div className={aboutUsStyles.sectionImage}>
                  <DotLottieReact src={section.dotLottie} loop autoplay />
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`${aboutUsStyles.sectionContent} ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
              >
                <div className={aboutUsStyles.sectionBadge}>
                  <section.icon
                    className={`${aboutUsStyles.sectionIcon} ${section.color}`}
                  />
                  <span className={aboutUsStyles.sectionBadgeText}>
                    {section.subtitle}
                  </span>
                </div>

                <h2 className={aboutUsStyles.sectionTitle}>
                  {section.title}
                </h2>

                <p className={aboutUsStyles.sectionDescription}>
                  {section.description}
                </p>

                <div className={aboutUsStyles.featuresContainer}>
                  {section.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={aboutUsStyles.featureItem}
                    >
                      <div
                        className={`${aboutUsStyles.featureIcon} ${section.color}`}
                      >
                        <BadgeCheck className={aboutUsStyles.featureIconSvg} />
                      </div>
                      <span className={aboutUsStyles.featureText}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced Values Principles Section */}
      <section className={aboutUsStyles.valuesSection}>
        <div className={aboutUsStyles.sectionGrid}>
          <div className={aboutUsStyles.valuesHeader}>
            <div className={aboutUsStyles.valuesBadge}>
              <ShieldUser className={aboutUsStyles.valuesBadgeIcon} />
              <span className={aboutUsStyles.valuesBadgeText}>
                Our Guiding Principles
              </span>
            </div>
            <h2 className={aboutUsStyles.valuesTitle}>
              Core Values That Define Us
            </h2>
            <p className={aboutUsStyles.valuesSubtitle}>
              The foundation of everything we do at CourseCraft
            </p>
          </div>

          <div className={aboutUsStyles.valuesGrid}>
            {values.map((value, index) => (
              <div
                key={index}
                className={aboutUsStyles.valueCard}
              >
                <div
                  className={`${aboutUsStyles.valueGradient} ${value.color}`}
                ></div>

                <h3
                  className={aboutUsStyles.valueCardTitle}
                  title={value.title}
                >
                  {value.title}
                </h3>

                <p className={aboutUsStyles.valueCardDescription}>
                  {value.description}
                </p>

                <ul className={aboutUsStyles.valueFeatures}>
                  {value.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={aboutUsStyles.valueFeatureItem}
                    >
                      <div
                        className={`${aboutUsStyles.valueFeatureDot} ${value.color}`}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  className={`${aboutUsStyles.valueUnderline} ${value.color}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={aboutUsStyles.ctaSection}>
        <div className={aboutUsStyles.ctaOrb1}></div>
        <div className={aboutUsStyles.ctaOrb2}></div>

        <div className={aboutUsStyles.ctaContent}>
          <h2 className={aboutUsStyles.ctaTitle}>
            Ready to Transform Your Future?
          </h2>
          <p className={aboutUsStyles.ctaDescription}>
            Join millions of learners who have transformed their lives with
            LearnHub. Start your journey today with a 7-day free trial.
          </p>
          <div className={aboutUsStyles.ctaButtons}>
            <a
              href="/contact"
              className={aboutUsStyles.ctaButton}
            >
              <MessageCircleCode className={aboutUsStyles.ctaButtonIcon} />
              Talk to Advisor
            </a>
          </div>
        </div>
      </section>

      <style jsx>{aboutUsAnimations}</style>
    </div>
  );
};

export default AboutUsPage;