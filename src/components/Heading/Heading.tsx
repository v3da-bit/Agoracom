import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  fontClass = "",
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-3xl mx-auto " : "max-w-2xl"
        }
      >
        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-semibold ${fontClass}`}
          {...args}
        >
          {children || `Section Heading`}
        </h2>
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading;
