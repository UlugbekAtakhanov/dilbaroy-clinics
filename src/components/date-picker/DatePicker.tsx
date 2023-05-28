import { CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DatePickerProps {
    date: any
    setDate: any
    // !!!!!! work with types on it
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const startDate = format(new Date(date[0]?.startDate), "dd/MM/yyyy")
    const endDate = format(new Date(date[0]?.endDate), "dd/MM/yyyy")
    const datePickerRef = useRef<any>()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // const handleClickOutside = (event: React.MouseEvent) => {
            if (!datePickerRef?.current?.contains(event.target)) {
                setIsDatePickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside)
    }, [datePickerRef])

    return (
        <div ref={datePickerRef} className="relative z-[2] text-[14px] items-center border border-black rounded flex bg-sky-100">
            <span className='ml-2'><CalendarIcon className='w-4' /></span>
            <div className='flex-1 flex justify-evenly cursor-pointer' onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                <span>from: <span className='text-sm text-black font-semibold'>{startDate}</span></span>
                <span>to: <span className='text-sm text-black font-semibold'>{endDate}</span></span>
            </div>
            {isDatePickerOpen && (
                <div className='absolute top-[110%] shadow right-0 z-10'>
                    <DateRange
                        onChange={(item) => {
                            setDate([item.selection])
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date w-full"
                    />
                </div>
            )}
        </div>
    )
}

export default DatePicker