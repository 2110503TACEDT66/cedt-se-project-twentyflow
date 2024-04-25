'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export default function TimeReserve({onChangeTime, value, disable} : {onChangeTime: Function , value: Dayjs | null , disable: boolean}) {
    return(
        <div className=" w-full ">
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                {
                    disable 
                    ? <TimePicker defaultValue={value} onChange={(value)=>onChangeTime(value)} disabled ampm={false} slotProps={{ textField: { fullWidth: true } }}  /> :
                    <TimePicker defaultValue={value} onChange={(value)=>onChangeTime(value)} ampm={false}  slotProps={{ textField: { fullWidth: true } }}  />
                }
            </LocalizationProvider>
        </div>
    )
}