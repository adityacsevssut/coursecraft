import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import HomeCourses from '../../components/HomeCourses/HomeCourses'
import Testimonial from '../../components/Testimonial/Testimonial'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
    <Banner/>
    <HomeCourses/>
    <Testimonial/>
    <Footer/>
    </div>
  )
}

export default Home