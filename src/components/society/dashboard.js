import React from "react";
import {} from "..";
import { SocietySidebarView } from "./side-bar";
import { SocietyHeaderView } from "./society-header";

export const SocietyDashboardView = () => {
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />
      </div>
    </>
  );
};
