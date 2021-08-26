// libs
import React from "react";
import Image from 'next/image'
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';

// styles
import styles from "../styles/pages/home.module.css"
import 'swiper/swiper-bundle.css';

const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad modi, culpa doloribus in eum dolores veniam repellendus architecto aspernatur provident ea nulla amet. Quis!"

const Home = () => {
  return (
    <div className="">

        {/* Introduction */}
        <section className="text-pred relative">
          <div className={`max-w-6xl mx-auto ${styles.sectionInner}`}>

            {/* Section title */}
            <VerticalTitle label={"La colline Saint-Serge"}/>

            {/* Titles */}
            <h4 className="uppercase text-2xl text-center">Au cœur de Paris...</h4>
            <h2 className="text-center font-serif italic uppercase text-6xl mb-20">Un lieu bien gardé</h2>

            {/* Body */}
            <div className="flex w-11/12 mx-auto">

              {/* Text */}
              <div className="w-1/2 mr-10">
                <p className="block text-xl font-normal mb-5 leading-8">{lorem}</p>
                <p className="block text-xl font-serif text-lg leading-">{lorem.repeat(3)}</p>
                <Link href="#">
                  <a className="inline-flex justify-center items-center w-32 h-10 border-2 border-plightmaroon text-xs mt-10 uppercase">En savoir plus</a>
                </Link>
              </div>

              {/* Image */}
              <div className="">
                <img className="" src="https://i.picsum.photos/id/499/600/600.jpg?hmac=8DVR1iJ06_QxDOBazkF1SWTM6fyRennwVQf2ebe27_k" alt="" />
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

const Carousel = ({}) => {
  return (
    <Swiper
      // install Swiper modules
      // modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      // navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  )
}

const VerticalTitle = ({label}) => (
  <div className="absolute left-0 top-32 flex items-center">
    <div className="h-2 w-12 bg-pred mr-8"></div>
    <div className="uppercase text-sm transform -rotate-90 -translate-x-24">{label}</div>
  </div>
) 

export async function getStaticProps(context) {

  return {
    props: {
    },
    revalidate: 10,
  }
}
  
  


export default Home;
