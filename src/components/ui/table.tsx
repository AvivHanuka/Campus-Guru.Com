import clsx from "clsx";
import { ReactElement } from "react";

import { Pagination } from "./pagination";

type TableParams = {
  headers: string[];
  items: any;
  renderComponent: (item: any) => ReactElement<any, any>;
};

export const Table = ({ headers, items, renderComponent }: TableParams) => {
  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300 ">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header + index}
              scope="col"
              className={clsx(
                `text-sm lg:text-base text-center tw-table-th`,
                index === headers.length - 1 && "border-none"
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <Pagination items={items} renderComponent={renderComponent} />
    </table>
  );
};
