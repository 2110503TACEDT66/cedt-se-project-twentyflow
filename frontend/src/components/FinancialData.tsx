import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const FinancialData = ({
  icon,
  amount,
  description,
  textColor,
  label,
}: {
  icon: IconDefinition;
  amount: string;
  description: string;
  textColor: string;
  label: string;
}) => {
  return (
    <div className="bg-white rounded-md h-full flex-grow relative">
      <FontAwesomeIcon
        icon={icon}
        className="absolute top-0 left-5 h-[55px] m-5 text-main-100"
      />
      <small
        className="absolute top-0 right-0 mt-5 mr-5 text-xl"
        style={{ color: textColor }}
      >
        {description}
      </small>
      <h1 className="absolute bottom-9 left-0 ml-10 text-3xl font-extrabold text-main-100">
        {amount}
      </h1>
      <h1 className="absolute bottom-0 left-0 mb-3 ml-10 text-main-100 font-bold">
        {label}
      </h1>
    </div>
  );
};

export default FinancialData;
