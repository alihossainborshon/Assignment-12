import React from 'react'
import { Banner } from '../../../components/Home/Banner'
import { Hero } from '../../../components/Home/Hero'
import { HomeTab } from '../../../components/Home/HomeTab'
import { OurServe } from '../../../components/Home/OurServe'
import { Gallery } from '../../../components/Home/Gallery'
import { FansLove } from '../../../components/Home/FansLove'


export const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <OurServe />
      <HomeTab />
      <Gallery />
      <FansLove />
    </div>
  )
}
