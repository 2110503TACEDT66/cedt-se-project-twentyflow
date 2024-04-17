import * as React from "react";

interface ChartBarProps {
  data: number[];
}

const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  return (
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf62054f50401c620392c6d08a2c84f9688bdfccf0ca240e3020ec383dd1d0b0?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
      alt="Chart bar"
      className="grow shrink-0 aspect-[3.7] basis-0 w-fit max-md:max-w-full"
    />
  );
};

interface VerticalLineProps {
  className?: string;
}

const VerticalLine: React.FC<VerticalLineProps> = ({ className = "" }) => {
  return (
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/63ad27c09e8a5af47fe738c09d33b0dac993630e2ad8f9a5623241a7921380b5?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
      alt=""
      className={`shrink-0 w-px border border-solid aspect-[0.01] border-slate-500 stroke-[1px] stroke-slate-500 ${className}`}
    />
  );
};

interface DayLabelProps {
  day: string;
}

const DayLabel: React.FC<DayLabelProps> = ({ day }) => {
  return (
    <div className="flex flex-col text-xs text-center whitespace-nowrap text-slate-500">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/54f758f1bcbfcee53fcd3ef40a712bb5471f6114a50cbc092109434b0e1de53f?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
        alt=""
        className="w-px border border-solid aspect-[0.2] border-slate-500 stroke-[1px] stroke-slate-500"
      />
      <div className="mt-2.5">{day}</div>
    </div>
  );
};

function MyComponent() {
  const chartData = [100, 200, 300, 400, 500, 600, 700];

  return (
    <div className="mt-16 w-full max-w-[1368px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-11 py-5 w-full text-2xl font-bold text-center bg-white rounded-xl text-slate-500 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="max-md:max-w-full">Weekly Revenue</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/067c22c0683ded28be4ab9c2ad1ef68c4ff78ef49afe1a9ad4cf2de2b6662344?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
              alt="Weekly revenue chart"
              className="self-end mt-7 max-w-full aspect-[3.33] w-[540px]"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow py-5 w-full bg-white rounded-xl max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col px-12 text-center whitespace-nowrap text-slate-500 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <h2 className="flex-auto text-2xl font-bold">Customers</h2>
                <div className="flex gap-1.5 self-start mt-1.5 text-xs">
                  <div className="shrink-0 h-3 rounded-sm bg-slate-500 w-[17px]" />
                  <div>New</div>
                </div>
              </div>
              <div className="flex gap-1.5 self-end text-xs">
                <div className="shrink-0 self-start h-3 bg-purple-300 rounded-sm w-[17px]" />
                <div>Returning</div>
              </div>
            </div>
            <div className="flex gap-3.5 self-center mt-6 max-md:flex-wrap">
              <div className="flex flex-col self-start px-5 text-xs text-right whitespace-nowrap text-slate-500">
                <div>1000</div>
                <div className="mt-5">750</div>
                <div className="mt-6">500</div>
                <div className="mt-6">250</div>
                <div className="mt-6">0</div>
              </div>
              <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <div className="flex gap-0 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                  <VerticalLine />
                  <ChartBar data={chartData} />
                </div>
                <div className="flex gap-5 justify-between items-start mx-7 max-md:flex-wrap max-md:pr-5 max-md:mr-2.5 max-md:max-w-full">
                  <DayLabel day="Sun" />
                  <div className="flex flex-col">
                    <div className="flex gap-5 justify-between">
                      <VerticalLine className="shrink-0 aspect-[0.2]" />
                      <VerticalLine className="shrink-0 aspect-[0.2]" />
                    </div>
                    <div className="flex gap-5 justify-between mt-2.5 text-xs text-center whitespace-nowrap text-slate-500">
                      <div>Mon</div>
                      <div>Tue</div>
                    </div>
                  </div>
                  <DayLabel day="Wed" />
                  <div className="flex flex-col">
                    <div className="flex gap-5 justify-between">
                      <VerticalLine className="shrink-0 aspect-[0.2]" />
                      <VerticalLine className="shrink-0 aspect-[0.2]" />
                    </div>
                    <div className="flex gap-5 justify-between mt-2.5 text-xs text-center whitespace-nowrap text-slate-500">
                      <div>Thu</div>
                      <div>Fri</div>
                    </div>
                  </div>
                  <DayLabel day="Sat" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;