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

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { defaultFilter, Filter } from "@/types/filter";

const dummyFilters = Array.from({ length: 50 }).map((_, i) => ({
  ...defaultFilter(),
  description: `A veeeeeeeeery long description for filter ${i + 1}`,
  domains: ["example\\.com"],
  prompt: "Block all things",
  selectors: ["#ads", "#banners"],
  title: `Filter ${i + 1}`,
}));

const FilterListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // TODO: impl real listing of filters
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    // 50% empty, 50% dummy data
    // eslint-disable-next-line sonarjs/pseudo-random
    setFilters(Math.random() > 0.5 ? dummyFilters : []);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button
        onPress={async () => {
          const filter = defaultFilter();
          await navigate(`/filter/${filter.id}`);
        }}
        type="button"
      >
        <PlusIcon />
        <span>{t("add_filter")}</span>
      </Button>
      <div className="flex flex-col gap-2">
        {filters.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <p>{t("no_filters_found")}</p>
          </div>
        ) : (
          filters.map((filter) => (
            <Card key={filter.id}>
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-lg">{filter.title}</p>
                  <p>{filter.description}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{filter.prompt}</p>
              </CardBody>
              <Divider />
              <CardFooter className="gap-2">
                {filter.domains.map((domain) => (
                  <Chip color="primary" key={domain}>
                    {domain}
                  </Chip>
                ))}
                {filter.selectors.map((selector) => (
                  <Chip color="secondary" key={selector}>
                    {selector}
                  </Chip>
                ))}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FilterListPage;
