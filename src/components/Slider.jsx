import React from "react";
import Slide from "./Slide";

const Slider = () => {
  const sliders = [
    {
      image: "/img/SlideFirst.png",
      title: (
        <h3>
          <span>Stan Smith</span>, Forever!
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал первый слайд"),
    },
    {
      image: "/img/SlideFirst.png",
      title: (
        <h3>
          <span>2</span> слайд
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал второй слайд"),
    },
    {
      image: "/img/SlideFirst.png",
      title: (
        <h3>
          <span>3</span> слайд
        </h3>
      ),
      onBtnClick: () => alert("Ты нажал третий слайд"),
    },
  ];
  const [currentSlide, setCurrentSlide] = React.useState(0);
  return (
    <div className="sliderSectionContainer">
      <div
        className="arrowBtn arrowRightBtn"
        onClick={() =>
          setCurrentSlide((prev) => {
            if (prev < 1) {
              return sliders.length - 1;
            } else {
              return prev - 1;
            }
          })
        }
      ></div>
      <div className="sliderWrapper">   
        <div
          className="sliderContainer"
          style={{ transform: `translateX(${currentSlide * -100}%)` }}
        >
          {sliders.map((slide, slideIndex) => (
            <Slide key={slideIndex} {...slide} />
          ))}
        </div>
      </div>
      <div
        className="arrowBtn arrowLeftBtn"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === sliders.length - 1 ? 0 : prev + 1
          )
        }
      ></div>
    </div>
  );
};

export default Slider;
