// src/pages/Faculty/Faculty.jsx
import React from "react";
import { Mail, Linkedin, Instagram, Star } from "lucide-react";
import sampleTeachers from "../../assets/dummyFaculty"; // dummy data
import { facultyStyles } from "../../assets/dummyStyles"; // styles

const Faculty = () => {
  return (
    <div className={facultyStyles.container}>
      {/* Stylish Cinematic Header */}
      <div className={facultyStyles.header}>
        <div className={facultyStyles.headerContent}>
          <h1 className={facultyStyles.title}>Meet Our Faculty</h1>
          <div className={facultyStyles.titleDivider}></div>
          <p className={facultyStyles.subtitle}>
            Learn from industry experts and academic pioneers dedicated to your success
          </p>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className={facultyStyles.facultySection}>
        <div className={facultyStyles.facultyContainer}>
          <div className={facultyStyles.facultyGrid}>
            {sampleTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={facultyStyles.card}
              >
                <div className={facultyStyles.teacherCard}>
                  {/* Circular Image */}
                  <div className={facultyStyles.imageContainer}>
                    <div className={facultyStyles.imageWrapper}>
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className={facultyStyles.image}
                      />
                    </div>

                    {/* Experience Badge */}
                    <div className={facultyStyles.experienceBadge}>
                      <div className={facultyStyles.experienceBadgeContent}>
                        {teacher.experience} Exp
                      </div>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className={facultyStyles.teacherInfo}>
                    <h3 className={facultyStyles.teacherName}>{teacher.name}</h3>
                    <p className={facultyStyles.teacherQualification}>
                      {teacher.qualification}
                    </p>
                    <p className={facultyStyles.teacherBio}>{teacher.bio}</p>
                  </div>

                  {/* Static Rating Display */}
                  <div className={facultyStyles.ratingContainer}>
                    <div className={facultyStyles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`${facultyStyles.starIcon} ${
                            i < Math.round(teacher.initialRating)
                              ? facultyStyles.starButtonActive
                              : facultyStyles.starButtonInactive
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className={facultyStyles.socialContainer}>
                    <a
                      href={`mailto:${teacher.email}`}
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconEmail}`}
                      title={`Email ${teacher.name}`}
                    >
                      <Mail className={facultyStyles.socialIconSvg} />
                    </a>

                    <a
                      href={teacher.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconLinkedin}`}
                      title={`${teacher.name} on LinkedIn`}
                    >
                      <Linkedin className={facultyStyles.socialIconSvg} />
                    </a>

                    <a
                      href={teacher.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconInstagram}`}
                      title={`${teacher.name} on Instagram`}
                    >
                      <Instagram className={facultyStyles.socialIconSvg} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{facultyStyles.animations}</style>
    </div>
  );
};

// Simple motion stub (no Framer Motion needed)
const motion = {
  div: ({ children, initial, animate, transition, className }) => (
    <div className={className}>{children}</div>
  ),
};

export default Faculty;
