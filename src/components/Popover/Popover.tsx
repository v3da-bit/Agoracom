"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Quotes from "../../images/Marketing/Quote-Filled.png";
import Arrow from "../../images/Marketing/Cloud-Arrow.png";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    content?: any;
    className?: string;
}

// eslint-disable-next-line react/display-name
const PopoverSection = React.forwardRef<HTMLInputElement, InputProps>(
    ({content, className}) => {

        const [isHover, setIsHover] = useState(true);



        return (
            <div className={`relative lg:absolute ${className}`}>
                <Popover
                    className="menu-item menu-dropdown relative"
                >
                    <Transition
                        as={Fragment}
                        show={isHover}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            static
                            className="sub-menu relative lg:absolute transform z-10 w-full lg:w-[22vw] rounded-[10px] p-7 !pl-12 !pt-12 text-sm top-full bg-white left-0 top-[5px]"
                        >   
                            <Image 
                                alt="" 
                                src={Quotes} 
                                className="absolute left-5 top-5 w-7 h-7" 
                            />
                            {content}
                            <Image 
                                alt="" 
                                src={Arrow} 
                                className="absolute left-5 -bottom-3 lg:-bottom-4 w-8 h-4" 
                            />
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>

        )
    }
)

export default PopoverSection;
