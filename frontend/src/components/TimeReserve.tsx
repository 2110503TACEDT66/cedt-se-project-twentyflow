'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export default function TimeReserve({onChangeTime, value} : {onChangeTime: Function , value: Dayjs | null}) {
    return(
        <div className=" w-full ">
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                <TimePicker defaultValue={value} onChange={(value)=>onChangeTime(value)} ampm={false}  slotProps={{ textField: { fullWidth: true } }}  />
            </LocalizationProvider>
        </div>
    )
}