import * as React from "react";


const StatCard: React.FC<StatCardProps> = ({
  icon,
  changePercentage,
  changeDirection,
  value,
  label,
}) => {
  const changeColor = changeDirection === "up" ? "text-green-400" : "text-red-500";

  return (
    <div className="flex flex-col grow px-9 py-10 mx-auto w-full text-base font-semibold text-center bg-white rounded-xl text-slate-500 max-md:px-5 max-md:mt-8">
      <div className={`flex gap-5 justify-between ${changeColor}`}>
        <img src={icon} alt="" className="shrink-0 aspect-[1.59] fill-slate-500 w-[51px]" />
        <div className="self-start">{changePercentage}</div>
      </div>
      <div className="mt-6 text-4xl font-bold">{value}</div>
      <div className="mt-4">{label}</div>
    </div>
  );
};

const MyComponent: React.FC = () => {
  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/448f56d703b15b951f9128b3e3a64206e29ca3aa8aa275c8dd7cbb698493550e?apiKey=1a3387e3f7804194b69cc4aab4fb102b&",
      changePercentage: "+ 11% today",
      changeDirection: "up" as const,
      value: "95,253",
      label: "Total Customers",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b72e439f92cf0907bf2f5c1c2eb6b130f6f4ad3ba29bb4aa7f61a8f70abf314?apiKey=1a3387e3f7804194b69cc4aab4fb102b&",
      changePercentage: "+ 11% today",
      changeDirection: "up" as const,
      value: "10,711",
      label: "Customers This Month",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f49e4e621605ead9515a195676458197dca23c26efd8eedbf68247955688d330?apiKey=1a3387e3f7804194b69cc4aab4fb102b&",
      changePercentage: "+ 11% today",
      changeDirection: "up" as const,
      value: "1,061",
      label: "Active Customers",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e131edd651de5749e6ea15e0f60d51ee425de9924109e2f323c5394e3ccaf529?apiKey=1a3387e3f7804194b69cc4aab4fb102b&",
      changePercentage: "- 11% today",
      changeDirection: "down" as const,
      value: "11,111",
      label: "Total Revenue",
    },
  ];

  return (
    <div className="px-5 mt-16 w-full max-w-[1368px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;