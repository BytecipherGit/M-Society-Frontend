import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarView, SuperHeaderView } from "..";

export const SocietyIndex = () => {
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        <Outlet />
      </div>
    </>
  );
};
