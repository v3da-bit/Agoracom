import React, { FC, useState } from "react";
import ButtonCircle from "@/components/Button/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/components/Badge/Badge";
import Input from "@/components/Input/Input";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Heading from "../Heading/Heading";
import { useRouter } from "next/navigation";

export interface SectionSubscribe2Props {
  className?: string;
}

const NewsLetter: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  return (
    <div
      className={`nc-SectionSubscribe2 flex py-14 flex-col lg:flex-col text-center dark:bg-transparent items-center ${className}`}
    >
      <Heading desc={""} isCenter fontClass="!text-3xl">
        <span className="text-white">Love Our Great Content? Join AGORACOM To Engage, Discover & Win</span>
      </Heading>
      <div className="flex-shrink-0 -mt-4 lg:mb-0 lg:w-1/4">
        <form className="relative" onSubmit={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/auth/register?email=${email}`)
        }}>
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="text-neutral-800 dark:text-neutral-200"
          />
          <ButtonCircle
            type="submit"
            disabled={!email}
            className="absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
