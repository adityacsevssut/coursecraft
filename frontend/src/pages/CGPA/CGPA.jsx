import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CGPACalculator from '../../components/CGPACalculator/CGPACalculator';
import Footer from '../../components/Footer/Footer';

const CGPA = () => {
  return (
    <div>
      <Navbar />
      <CGPACalculator />
      <Footer />
    </div>
  );
};

export default CGPA;