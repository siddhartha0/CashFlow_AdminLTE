import React from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import nopicsuser from "../../assets/pics/nopicsuser.png";

// eslint-disable-next-line react/display-name
const UserDropDownMenu = React.forwardRef((props, ref) => {
  console.log(ref.current);
  return (
    <div className="flex flex-col bg-white p-4 gap-4" ref={ref}>
      <div className="flex gap-4">
        <div>
          <img src={nopicsuser} className="h-8 rounded-full" alt="profile" />
        </div>
        <div>
          <header className="text-cash text-sm font-bold">
            Siddhartha Sunuwar
          </header>
          <span className="text-xs">siddhartha@gmail.com</span>
        </div>
      </div>
      <hr className="text-grey text-opacity-[0.3] " />

      <div className="flex place-items-center gap-4 justify-items-start cursor-pointer">
        <IoSettingsOutline />
        <span>Settings</span>
      </div>

      <div className="flex place-items-center gap-4 justify-items-start cursor-pointer">
        <IoLogOutOutline />
        <span>Log out</span>
      </div>
    </div>
  );
});

export default UserDropDownMenu;
