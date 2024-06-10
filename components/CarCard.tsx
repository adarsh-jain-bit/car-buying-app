"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import CarDetails from "./CardDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {

  const { city_mpg, year, make, model, transmission, drive } = car;
// console.log(generateCarImageUrl())
  const [isOpen, setIsOpen] = useState(false);
  const [carImageUrl, setCarImageUrl] = useState<string | null>(null)
  const carRent = calculateCarRent(city_mpg, year);
  // console.log(generateCarImageUrl();)
  useEffect(() => {
    const fetchCarImage = async () => {
      try {
        const imageUrl = await generateCarImageUrl();
        setCarImageUrl(imageUrl);
      } catch (error) {
        setCarImageUrl("https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        console.error("Error fetching car image:", error);
      }
    };

    fetchCarImage();
  }, []);
  // console.log(carImageUrl)
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
      {carImageUrl ? (
      <Image src={carImageUrl} alt="Car" layout="fill" priority className='object-cover' />
    ) : (
      <p>Loading...</p>
    )}
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;