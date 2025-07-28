// Copyright (C) 2025 Eray Erdin
//
// This file is part of content-block.
//
// content-block is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// content-block is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with content-block.  If not, see <https://www.gnu.org/licenses/>.

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";

import icon from "@/assets/img/icon-default.svg";

const OptionsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    {
      isActive: location.pathname.startsWith("/filter"),
      label: t("filters"),
      to: "/filters",
    },
    {
      isActive: location.pathname === "/about",
      label: t("about"),
      to: "/about",
    },
  ];

  return (
    <div className="flex flex-col">
      <Navbar>
        <NavbarBrand>
          <div className="size-8">
            <img alt="icon" src={icon} />
          </div>
        </NavbarBrand>
        <NavbarContent>
          {links.map(({ isActive, label, to }) => (
            <NavbarItem isActive={isActive} key={to}>
              <Link to={to}>{label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <div className="px-4 pb-4">
        <Outlet />
      </div>
    </div>
  );
};

export default OptionsLayout;
