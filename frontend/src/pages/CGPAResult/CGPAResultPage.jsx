import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CGPAResult from '../../components/CGPACalculator/CGPAResult';
import Footer from '../../components/Footer/Footer';

const CGPAResultPage = () => {
  return (
    <div>
      <Navbar />
      <CGPAResult />
      <Footer />
    </div>
  );
};

export default CGPAResultPage;