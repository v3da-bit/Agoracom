"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  menuDropdown?: any;
  selectedValue?: any;
  setMenu: any;
  className?: string;
}

// eslint-disable-next-line react/display-name
const Select = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "Placeholder",
      menuDropdown = {},
      selectedValue = 0,
      setMenu,
      rounded = "rounded-full",
      className = "",
      disabled = false
    },
    ref
  ) => {

    const [isHover, setIsHover] = useState(false);
    const wrapperRef: any = useRef(null);

    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          if (isHover) {
            setIsHover(false);
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef, isHover]);


    return (
      <div className={`flex-shrink-0 lg:mr-2 mb-2 lg:mb-0 grow lg:grow-0 w-full lg:w-[220px] ${className}`}>
        <select value={selectedValue} disabled={disabled} onChange={(e: any) => setMenu(e.target.value)} className={`text-neutral-800 px-5 mt-1 rounded dark:text-neutral-200 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 ${rounded}`}>
          {Object.keys(menuDropdown)?.map((i: any) => {
            return (
              <option
                key={i}
                value={i}
                className={`cursor-pointer !py-2 !px-3 flex ${i === selectedValue ? "bg-defaultGreen-100 !text-white" : ""} items-center font-normal text-neutral-6000 dark:text-neutral-400 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
              >
                {menuDropdown[i]}
              </option>
            )
          })}
        </select>
      </div>

    )
  }
)

export default Select;
