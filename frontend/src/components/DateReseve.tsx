'use client';

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function DateReserve({onChangeDate} : {onChangeDate : Function}) {
    return(
        <div className=" w-full">
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                <DatePicker  onChange={(value)=>onChangeDate(value)} className=" w-full bg-white text-xl font-semibold"/>
            </LocalizationProvider>
        </div>
    )
}