import { MenuAlt3Icon } from "@heroicons/react/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "@tremor/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavDropDown = ({ navList }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="lg:hidden">
        <Icon
          icon={MenuAlt3Icon}
          variant="simple"
          className="cursor-pointer text-black"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade ml-5 min-w-[190px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          {navList.map((item, idx) => (
            <DropdownMenu.Item
              key={idx}
              className={`group relative my-0.5 flex cursor-pointer select-none items-center gap-2 rounded-md border border-white text-sm leading-none text-slate-800 hover:border-slate-400 ${
                location === item.path || (item.path === "" && !location)
                  ? "bg-gray-200"
                  : ""
              } px-2 py-1.5`}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {React.createElement(item.icon, {
                className: "ml-1 max-w-[20px]",
              })}
              <span>{item.name}</span>
              {idx !== navList.length - 1 ? (
                <DropdownMenu.Separator className="m-[5px] h-[1px] bg-violet6" />
              ) : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NavDropDown;
