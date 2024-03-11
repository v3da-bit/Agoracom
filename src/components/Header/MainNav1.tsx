import React, { FC, useState } from "react";
import Logo from "@/components/Logo/Logo";
import Navigation from "@/components/Navigation/Navigation";
import MenuBar from "@/components/MenuBar/MenuBar";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";
import SearchModal from "./SearchModal";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AvatarDropdown from "./AvatarDropdown";
import UnseenMessage from "./UnseenMessage";
import Link from "next/link";

export interface MainNav1Props { }

const MainNav1: FC<MainNav1Props> = ({ }) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });

  const navigate = () => {
    // e.preventDefault();
    // e.stopPropagation();
    router.push("/auth/register");
  }

  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">
          <div className="flex items-center lg:hidden flex-auto">
            <MenuBar loggedIn={loggedIn} />
          </div>

          <div className="flex justify-center lg:justify-start flex-auto items-center space-x-4 sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Logo className={open ? 'hidden' : 'inline-block'} />
            {!open ? (
              <Navigation className="hidden lg:flex" loggedIn={loggedIn} />
            ) : <></>}
          </div>

          <div className="flex-auto flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              <SearchModal open={open} setOpen={setOpen} />
              <SwitchDarkMode />
              {
                loggedIn ? (
                  <>
                    <AvatarDropdown userData={currentUser} />
                    <Link href="/profile?compose=true"><UnseenMessage /></Link>
                  </>
                ) : (
                  <>
                    <div className="px-1"></div>
                    <Button
                      sizeClass="py-3 px-4 sm:px-6"
                      pattern="primary"
                      onClick={navigate}
                    >
                      Sign up
                    </Button>
                  </>
                )
              }
            </div>
            <div className="flex items-center lg:hidden">
              {/* {
                !open ? (
                  <SwitchDarkMode />
                ) : <></>
              } */}
              <SearchModal open={open} setOpen={setOpen} />
              <AvatarDropdown userData={currentUser} isMobile={true} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
