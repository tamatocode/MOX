import React from "react";
import { Instagram, Twitter, Facebook, Youtube, X, FacebookIcon, YoutubeIcon } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { URLS } from "../Constant";
import { LinkedInIcon } from "../icons/linkedin-icon";
import { XIcon } from "../icons/x-icon";

const SMBtnContactUs = () => {
  return (
    <div className="flex items-center gap-8 m-auto relative w-full justify-center mb-24">
      {/* Instagram Button */}
      {/* <SocialButton color="bg-blue-600" borderColor="border-blue-600">
      <a href={URLS.X_RECURX} target="_blank" rel="noopener noreferrer">

<InstagramLogoIcon className="h-7 w-7 text-white duration-300 font-semibold" />
</a>
      </SocialButton> */}

      {/* Twitter/X Button */}
      <SocialButton color="bg-blue-600" borderColor="border-blue-600">

      <a href={URLS.X_RECURX} target="_blank" rel="noopener noreferrer">

<XIcon className="h-7 w-7 text-white duration-300 font-semibold" />
</a>
      </SocialButton>

      {/* Facebook Button */}
      <SocialButton color="bg-blue-600" borderColor="border-blue-600">
      <a href={URLS.X_RECURX} target="_blank" rel="noopener noreferrer">

        <LinkedInIcon className="h-7 w-7 text-white duration-300 font-semibold" />
      </a>

      </SocialButton>

      {/* Youtube Button */}
      {/* <SocialButton color="bg-blue-600" borderColor="border-blue-600">

        <a href={URLS.X_RECURX} target="_blank" rel="noopener noreferrer">
        <YoutubeIcon className="h-7 w-7 text-white duration-300 font-semibold" />
        </a>
      </SocialButton> */}
    </div>
  );
};

const SocialButton = ({ children, color, borderColor }) => {
  return (
    <div className="social-button cursor-pointer">
      <button className="relative w-18 h-18 rounded-full group cursor-pointer">
        <div
          className={`floater w-full h-full absolute top-0 left-0 ${color} rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl`}
        ></div>
        <div
          className={`icon relative z-10 w-full h-full flex items-center justify-center border-2 ${borderColor} rounded-full`}
        >
          {children}
        </div>
      </button>
    </div>
  );
};

export default SMBtnContactUs;