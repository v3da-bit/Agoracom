"use client";

import React, { FC, useState } from "react";
import Heading from "../Heading/Heading";
import Movie from "../Movie/Movie";
import PrevBtn from "../NextPrev/PrevBtn";
import NextBtn from "../NextPrev/NextBtn";

const TrailerSection: FC<any> = ({heading}) => {

    const movies: any = [
        {
            id: 1,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
          {
            id: 2,
            title: "Faana",
            backdrop_path: "https://q9c3t4p4.rocketcdn.me/wp-content/uploads/2022/11/Smile-Cast-Paramount-Plus-Every-Actor-Character.jpg"
          },
          {
            id: 3,
            title: "Faana",
            backdrop_path: "https://q9c3t4p4.rocketcdn.me/wp-content/uploads/2022/11/Smile-Cast-Paramount-Plus-Every-Actor-Character.jpg"
          },
          {
            id: 4,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
          {
            id: 5,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
          {
            id: 6,
            title: "Faana",
            backdrop_path: "https://q9c3t4p4.rocketcdn.me/wp-content/uploads/2022/11/Smile-Cast-Paramount-Plus-Every-Actor-Character.jpg"
          },
          {
            id: 7,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
          {
            id: 8,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
          {
            id: 9,
            title: "Faana",
            backdrop_path: "https://cdn.dnaindia.com/sites/default/files/2021/09/08/995292-money-hesit.jpg"
          },
    ];

    const slideLeft = () => {
        let slider: any = document.getElementById('slider101');
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        let slider: any = document.getElementById('slider101');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

  return (
    <div>
      <Heading desc={""} isCenter>
        {heading}
      </Heading>
      <div className='relative flex items-center group'>
        <PrevBtn
            onClick={slideLeft}
            className={`w-9 h-9 xl:w-12 xl:h-12 text-lg text-neutral-900 absolute -start-3 xl:-start-6 z-[1]`}
        />
        {/* <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        /> */}
        <div
          id={'slider101'}
        //    
          className='w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative'
        >
          {movies.map((item: any, id: number) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <NextBtn
            onClick={slideRight}
            className={`w-9 h-9 xl:w-12 xl:h-12 text-neutral-900 text-lg absolute -end-3 xl:-end-6 z-[1]`}
        />
        {/* <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        /> */}
      </div>
    </div>
  );
};

export default TrailerSection;
