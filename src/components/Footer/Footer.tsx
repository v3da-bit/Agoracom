import React from "react";
import Logo from "../Logo/Logo";
import SocialsList1 from "../SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
  socialMedia?: boolean;
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "INVESTORS",
    menus: [
      { href: "/", label: "My Home" },
      { href: "/marketplace#", label: "Small Cap Marketplace" },
      { href: "/broadcastcenter", label: "Broadcast Center" },
      { href: "/", label: "Conferences" },
      { href: "/hub-requests/new", label: "Request New Hub" },
      { href: "/help-center", label: "Quick Tips" },
      { href: "/help-center/ratings-and-ranks", label: "Ratings & Rankings" },
    ],
  },
  {
    id: "1",
    title: "COMPANIES",
    menus: [
      { href: "/services/investor_relations", label: "Investor Relations" },
      { href: "/services/success_stories", label: "Success Stories" },
      // { href: "/clients", label: "Clients" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/services", label: "Contact" },
    ],
  },
  {
    id: "2",
    title: "RESOURCES",
    menus: [
      { href: "/about-and-contact", label: "About Us" },
      { href: "/", label: "Blogs" },
      { href: "/help-center/rules", label: "Rules" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms and Conditions" },
    ],
  },
  {
    id: "4",
    title: "CONTACT",
    menus: [],
    socialMedia: true
  },
];

const Footer: React.FC = () => {
  
  
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-100 dark:text-neutral-200">
          {menu.title}
        </h2>
        {
          menu.menus.length > 0 ? (
            <ul className="mt-5 space-y-4">
              {menu.menus.map((item, index) => (
                <li key={index}>
                  <a
                    key={index}
                    className="text-neutral-200 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : <></>
        }
        {
          // console.log(menu.socialMedia)
          menu.socialMedia ? (
            <div className="col-span-2 flex items-center md:col-span-3 mt-5">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          ) : <></>
        }
      </div>
    );
  };

  return (
    <>
      {/* music player */}
      <MusicPlayer />

      {/* footer */}
      <div className="nc-Footer relative bg-defaultBlue-100 py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-2 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col sm:xs:flex-row">
            <div className="col-span-2 md:col-span-2">
              <Logo isFooter={true} />
            </div>
            <div className="col-span-2 items-center md:col-span-2">
              <p className="text-neutral-100 text-[0.85rem] dark:text-neutral-100 text-justify">
                AGORACOM is the Web 2.0 online marketplace and forum for citizens of the small-cap investment community.
                People communicate in a monitored and secure environment free of trolling and general nonsense.
              </p>
              <p className="text-neutral-100 text-[0.85rem] font-semibold dark:text-neutral-100 text-left lg:mt-6 mt-4">© 2019 Agoracom, All right reserved.</p>
            </div>
            {/* <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div> */}
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  );
};

export default Footer;
