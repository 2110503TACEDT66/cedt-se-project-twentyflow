import * as React from "react";

interface ChartBarProps {
  borderColor: string;
  fillColor: string;
  aspectRatio: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ borderColor, fillColor, aspectRatio }) => (
  <img
    loading="lazy"
    src="{{ext_url}}"
    className={`shrink-0 w-px border border-solid ${aspectRatio} ${borderColor} ${fillColor} stroke-[1px] ${borderColor}`}
    alt=""
  />
);

interface LabeledChartBarProps extends ChartBarProps {
  label: string;
}

const LabeledChartBar: React.FC<LabeledChartBarProps> = ({ label, ...chartBarProps }) => (
  <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
    <ChartBar {...chartBarProps} />
    <div className="mt-3 text-xs text-center whitespace-nowrap text-slate-500">{label}</div>
  </div>
);

const CalendarDay: React.FC<{ day: number; isActive?: boolean }> = ({ day, isActive = false }) => (
  <div
    className={`justify-center items-center self-stretch ${
      isActive ? "px-1.5 text-white bg-orange-600 h-[30px] rounded-[29px] w-[30px]" : "my-auto"
    }`}
  >
    {day}
  </div>
);

function MyComponent() {
  const chartData = [
    { month: "Jan", value: 10000 },
    { month: "Feb", value: 20000 },
    { month: "Mar", value: 15000 },
    { month: "April", value: 25000 },
    { month: "May", value: 30000 },
    { month: "June", value: 28000 },
    { month: "July", value: 35000 },
    { month: "Aug", value: 32000 },
    { month: "Sep", value: 40000 },
    { month: "Oct", value: 45000 },
    { month: "Nov", value: 50000 },
    { month: "Dec", value: 55000 },
  ];

  const calendarData = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31],
  ];

  return (
    <div className="mt-16 w-full max-w-[1368px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <section className="flex flex-col w-[76%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-7 pt-8 pb-5 w-full bg-white rounded-xl max-md:pl-5 max-md:mt-8 max-md:max-w-full">
            <h2 className="text-2xl font-bold text-center text-slate-500 max-md:max-w-full">Yearly Revenue</h2>
            <div className="flex gap-2 self-end mt-8 max-md:flex-wrap">
              <div className="flex flex-col self-start text-xs text-right whitespace-nowrap text-slate-500">
                <div>60000</div>
                <div className="mt-7">45000</div>
                <div className="mt-8">30000</div>
                <div className="mt-8">15000</div>
                <div className="self-end mt-8 border border-solid border-slate-500">0</div>
              </div>
              <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5d1e45be92bd87e5a2636045e2a6fe634241a821435a3297c7d5d0ffd2f6587?apiKey=1a3387e3f7804194b69cc4aab4fb102b&" alt="" className="border border-solid aspect-[9.09] border-slate-500 stroke-[1px] stroke-slate-500 w-[9px]" />
                <div className="flex gap-0 max-md:flex-wrap max-md:max-w-full">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7e83446994ed4074afe1e6748039c3cb40bf93fed5be3d1382febc72268a02a?apiKey=1a3387e3f7804194b69cc4aab4fb102b&" alt="" className="shrink-0 w-px border border-solid aspect-[0.01] border-slate-500 stroke-[1px] stroke-slate-500" />
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/54bf31d50bccb855a2a9f5ad026a3f4d4ccf4c7945000873213159d5ea1751e7?apiKey=1a3387e3f7804194b69cc4aab4fb102b&" alt="" className="grow shrink-0 aspect-[5.56] basis-0 w-fit max-md:max-w-full" />
                </div>
                <div className="flex gap-5 mx-8 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
                  <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                    <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                      {chartData.slice(0, 7).map((data, index) => (
                        <ChartBar
                          key={index}
                          borderColor="border-slate-500"
                          fillColor="fill-slate-500"
                          aspectRatio="aspect-[0.17]"
                        />
                      ))}
                    </div>
                    <div className="flex gap-5 justify-between mt-3 text-xs text-center whitespace-nowrap text-slate-500 max-md:flex-wrap max-md:max-w-full">
                      {chartData.slice(0, 7).map((data) => (
                        <div key={data.month}>{data.month}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                    <div className="flex gap-5 justify-between max-md:pr-5">
                      {chartData.slice(7).map((_, index) => (
                        <ChartBar
                          key={index}
                          borderColor="border-slate-500"
                          fillColor="fill-slate-500"
                          aspectRatio="aspect-[0.17]"
                        />
                      ))}
                    </div>
                    <div className="flex gap-5 justify-between mt-3 text-xs text-center whitespace-nowrap text-slate-500">
                      {chartData.slice(7).map((data) => (
                        <div key={data.month}>{data.month}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start px-6 pt-6 pb-3 mx-auto w-full text-base font-semibold leading-5 text-center text-gray-600 bg-white rounded-lg shadow-lg max-md:px-5 max-md:mt-8">
            <div className="flex gap-5 justify-between self-stretch text-sm leading-4">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4f65425f12ceaeed3e4278a33a5d09404e54bc55120dc89226bf528d3f75973?apiKey=1a3387e3f7804194b69cc4aab4fb102b&" alt="Previous month" className="shrink-0 w-4 aspect-square" />
              <div>September 2021</div>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f77028cb62432b0de321180fa31312786c7f96f97257880cdd64af9b3a85594e?apiKey=1a3387e3f7804194b69cc4aab4fb102b&" alt="Next month" className="shrink-0 w-4 aspect-square" />
            </div>
            <div className="flex gap-2 justify-between self-stretch px-1 py-1 mt-6 text-xs tracking-widest leading-3 uppercase text-neutral-300">
              <div>SAN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            {calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-2 justify-between py-2 pr-2.5 mt-2 whitespace-nowrap">
                {week.map((day, dayIndex) => (
                  <CalendarDay key={dayIndex} day={day} isActive={day === 19} />
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MyComponent;