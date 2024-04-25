'use client';

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs";

export default function DateReserve({onChangeDate,value} : {onChangeDate : Function , value : Dayjs | null}) {
    return(
        <div className=" w-full">
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                <DatePicker value={value}  onChange={(value)=>onChangeDate(value)} className=" w-full bg-white text-xl font-semibold"/>
            </LocalizationProvider>
        </div>
    )
}