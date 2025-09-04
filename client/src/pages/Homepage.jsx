import React from 'react'
import Hero from '../components/Hero';
import NewArrivals from '../components/NewArrivals';
import Featured from '../components/Featured';
import Featuredrentals from '../components/FeaturedRentals';
import Forsellers from '../components/Forsellers';
import Forbuyers from '../components/Forbuyers';
import Gossipbanner from '../components/Gossipbanner';

const Homepage = () => {
  return (
    <div>
        <Hero />
        <br /><br />
        <NewArrivals />
        <Featured />
        <Featuredrentals />
        <Gossipbanner />
        <Forsellers />
        <Forbuyers />
    </div>
  )
}

export default Homepage;