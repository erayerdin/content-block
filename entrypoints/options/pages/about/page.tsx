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

import { Card, CardBody } from "@heroui/react";
import { SiDiscord, SiGithub, SiGnu } from "@icons-pack/react-simple-icons";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import icon from "@/assets/img/icon-default.svg";
import {
  links as _links,
  description,
  displayName,
  license,
  repository,
  version,
} from "@/package.json";

const AboutPage = () => {
  const { t } = useTranslation();

  const links = [
    {
      description: t("discord_perks_description"),
      fromGradient: "from-purple-600",
      href: _links.discord,
      icon: <SiDiscord color="white" />,
      title: t("join_our_discord_channel"),
      toGradient: "to-purple-700",
    },
    {
      description: t("view_and_contribute_description"),
      fromGradient: "from-gray-600",
      href: repository.url.replace(/^git\+/, "").replace(/\.git$/, ""),
      icon: <SiGithub color="white" />,
      title: t("view_and_contribute"),
      toGradient: "to-gray-700",
    },
    {
      description: t("view_license_description", {
        license,
        name: displayName,
      }),
      fromGradient: "from-stone-600",
      href: _links.license,
      icon: <SiGnu color="white" />,
      title: t("view_license"),
      toGradient: "to-stone-700",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="size-32">
        <img alt="logo" src={icon} />
      </div>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold">{displayName}</h1>
        <p>{version}</p>
        <p className="italic">{description}</p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {links.map(
          ({ description, fromGradient, href, icon, title, toGradient }) => (
            <a href={href} key={title} rel="noreferrer" target="_blank">
              <Card
                className={clsx("bg-gradient-to-br", fromGradient, toGradient)}
              >
                <CardBody className="flex-row gap-4 flex-wrap">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col justify-center">{icon}</div>
                    <div className="w-px bg-white" />
                    <div className="flex flex-col gap-2 w-64">
                      <p className="text-white text-xl font-bold">{title}</p>
                      <p className="text-white">{description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default AboutPage;
