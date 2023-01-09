import React from "react";
import Slide from "./Slide";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slider = () => {
  const sliders = [
    {
      image: "img/SlideFirst.png",
      title: (
        <h3>
          <span>Кермит</span> уже здесь!
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал первый слайд"),
      wrapperStyles: {backgroundPositionX: '100%'},
      buttonStyles: {},
    },
    {
      image: "img/pokek_2.jpg",
      title: (
        <h3 style={{color: '#fff'}}>
          <span>ЪУЪ!</span> Не смотри сюда!
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал второй слайд"), 
      wrapperStyles: {backgroundPositionY: '60%'},
      
    },
    {
      image: "img/pokek_3.jpg",
      title: (
        <h3 style={{color: '#fff'}}>
          <span></span>ЪЕЪ)
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал третий слайд"),
      wrapperStyles: {backgroundPositionY: '50%'},
    },
  ];

  return (
    <div className="sliderSectionContainer">
      {/* <div className="arrowBtn arrowRightBtn" onClick={() => swiper.slideNext()}></div> */}
      <div className="sliderWrapper">
        <div className="sliderContainer">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000 }}
            speed={900}
            navigation
            pagination={{ clickable: true }}
          >
            {sliders.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <Slide {...slide} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
      {/* <div className="arrowBtn arrowLeftBtn"></div> */}
    </div>
  );
};

export default Slider;
