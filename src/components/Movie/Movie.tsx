import React, { FC, useState } from "react";
import Button from "../Button/Button";

const Movie: FC<any> = ({item}) => {

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  
  
  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        className='w-full h-auto block'
        src={`${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <div className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          <div>
            <Button
              className="!text-sm mb-2"
              sizeClass="py-2 px-3 sm:px-4"
              pattern="primary"
            >
              Watch Trailer
            </Button>
            <br />
            <Button
              className="!text-sm"
              sizeClass="py-2 px-3 sm:px-4"
              pattern="primary"
            >
              More Info
            </Button>
          </div>
        </div>
        {/* <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          Like
        </p> */}
      </div>
    </div>
  );
};

export default Movie;
