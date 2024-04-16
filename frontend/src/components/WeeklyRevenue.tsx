import React from "react";
import { LineChart } from "@mui/x-charts";

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  return (
    <div className="mt-[-30px] ml-10 absolute w-[88%]">
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            color: "#7D5CB5",
            showMark: true,
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        height={180}
      />
    </div>
  );
};

export default MyComponent;
