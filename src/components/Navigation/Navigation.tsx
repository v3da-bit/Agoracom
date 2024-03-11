import React, { FC } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";

interface Props {
  className?: string;
  loggedIn?: boolean
}

const Navigation: FC<Props> = ({ className = "flex", loggedIn }) => {
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      {
        NAVIGATION_DEMO_2.map((item: any) => {
          if ((loggedIn && !item.auth) || !loggedIn) {
            return (
              <NavigationItem key={item.id} menuItem={item} />
            )
          }
        })
      }
    </ul>
  );
};

export default Navigation;
