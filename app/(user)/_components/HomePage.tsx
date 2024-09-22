import React from 'react'
import HeroSection from './HeroSection'
import SubHeroSection from './SubHeroSection'
import ProductSection from './ProductSection'


const HomePage = () => {
  return (
    <div className='flex flex-col gap-32'>
      <div>
        <HeroSection />
      </div>
      <div>
        <SubHeroSection />
      </div>
      <div>
        <ProductSection/>
      </div>
      
    </div>
  )
}

export default HomePage