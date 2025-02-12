import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import eventSliderDetails from "../data/eventSliderDetails";
import { eventSliderSettings } from "../data/eventSliderSettings";
import axios from "axios";

export default function EventSlider() {
  // get all events from api
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/event/list")
      .then((response) => {
        setEvents(response.data.LatestAuction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative min-h-[90vh] flex justify-center items-center">
      <Swiper {...eventSliderSettings}>
        <SliderButtons />
        {events.map((card, i) => (
          <SwiperSlide key={i}>
            <div className="w-[25rem] opp-card hover:scale-[1.025] hover:cursor-pointer flex flex-col px-[1rem] pb-[1rem] pt-[1.3rem] m-auto">
              <img
                className="w-[25rem] h-[20rem] rounded-tr-[15px] rounded-tl-[15px]"
                src={card.image}
                alt="cardImg"
              />
              <div className="flex flex-col rounded-br-[15px] rounded-bl-[15px] bg-white shadow-md px-5 pb-5 pt-3">
                <p className="text-[1.5rem] w-full font-bold">{card.title}</p>
                <p className="font-bold text-[#00b386]">{card.date}</p>
                <p className="text-gray-500">{card.description}</p>
                {/* <p>
                  {card.rating}/10 ({card.review} reviews)
                </p> */}
                <p className="text-xl mt-4 font-bold">
                  {card.price} <span className="text-gray-500">SOL</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center gap-[1rem] pt-4">
      <button
        className="text-[1.2rem] py-[0.2rem] px-[0.8rem] text-[#00b386] border-none rounded-[5px] bg-gray-100 cursor-pointer"
        onClick={() => swiper.slidePrev()}
      >
        ❰
      </button>
      <button
        className="text-[1.2rem] py-[0.2rem] px-[0.8rem] text-[#00b386] border-none rounded-[5px] bg-gray-100 cursor-pointer"
        onClick={() => swiper.slideNext()}
      >
        ❱
      </button>
    </div>
  );
};
