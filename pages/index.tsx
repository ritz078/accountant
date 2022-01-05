import type { NextPage } from "next";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";

const stats = [
  {
    name: "Revenue",
    stat: "71,897",
    icon: PlusCircleIcon,
    color: "green",
  },
  {
    name: "Expenses",
    stat: "58.16",
    icon: MinusCircleIcon,
    color: "red",
  },
  {
    name: "Profit",
    stat: "58.16",
    icon: TrendingUpIcon,
    color: "green",
  },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-row flex-1">
      <div className="w-8/12">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          FY 2021-22
        </h3>
        <dl className="mt-5 grid grid-cols-1 shadow rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 overflow-hidden divide-y md:grid-cols-3 md:divide-y-0">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative pt-5 px-4 pb-6 sm:pt-6 sm:px-6 overflow-hidden"
            >
              <dt>
                <div className="absolute bg-white/[0.2] rounded-md p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-200 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <span className="mr-1 text-white">₹</span>
                <p className="text-2xl font-semibold text-white">{item.stat}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="w-4/12" />
    </div>
  );
};

export default Home;
