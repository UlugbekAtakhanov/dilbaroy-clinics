import { format } from 'date-fns'
import { useState } from 'react'
import DatePicker from '../date-picker/DatePicker'
import GlobalFilter from './GlobalFilter'

interface GlobalSearchProps {
    getPatientsFn: any,
    globalFilter: any,
    setGlobalFilter: any
}

const GlobalSearch = ({ getPatientsFn, globalFilter, setGlobalFilter }: GlobalSearchProps) => {

    const [date, setDate] = useState([{ startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), endDate: new Date(Date.now()), key: 'selection' }])
    const startDate = format(date[0].startDate, "yyyy-MM-dd")
    const endDate = format(date[0].endDate, "yyyy-MM-dd")


    const searchTerm = { from: startDate, to: endDate }
    const { refetch, isFetching } = getPatientsFn({ searchTerm })


    const searchHandler = () => {
        refetch()
    }


    return (
        <div className={`${isFetching ? "opacity-50 pointer-events-none" : ""} flex flex-col gap-2 my-4 md:items-center md:flex-row`}>
            <div className='flex-1 leading-3'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>

            <div className='flex-[2]'>
                <DatePicker date={date} setDate={setDate} />
            </div>

            <div className='self-end'>
                <button onClick={searchHandler} className='text-[14px] button-red p-[2px] px-3 h-full block'>Қидириш</button>
            </div>

        </div>
    )
}

export default GlobalSearch