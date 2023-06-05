import { useMemo, useRef } from 'react'
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps, useGlobalFilter, useSortBy, useTable } from 'react-table'
import { COLUMNS } from './columns'

import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline"
import { useReactToPrint } from 'react-to-print'
import ReceptionEditInline from '../../edit-inline/ReceptionEditInline'
import Spinner from '../../spinner/Spinner'
import GlobalSearch from '../GlobalSearch'
import SelectTableColumn from '../SelectTableColumn'
import { useRoomStatisticsGetData } from '../../../hooks/useStatisticsData'
import { RoomStatProps } from '../../../types/doctorStatTypes'
import { toLocale } from '../../../utils/toLocale'


const RoomStatisticsTable = () => {
    const printTableRef = useRef<HTMLDivElement>(null)

    // fetching patients list
    const { data: roomStatisticsData, isLoading: roomStatsIsLoading, isFetching: roomStatsIsFetching } = useRoomStatisticsGetData({})
    const fetchedData = roomStatisticsData?.data


    // table features
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => fetchedData || [], [fetchedData])
    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state, setGlobalFilter,
        allColumns,
    } = tableInstance
    const { globalFilter } = state

    // print handler
    const printHandler = useReactToPrint({
        content: () => printTableRef.current ? printTableRef?.current : null,
        documentTitle: "table",
    })

    return (
        <div className='p-4 pb-[300px]'>

            <h1 className='mb-4 font-semibold text-center'>Хоналар статистикаси</h1>

            {/* filter section */}
            <GlobalSearch getPatientsFn={useRoomStatisticsGetData} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            {/* table section */}
            {roomStatsIsLoading ? <Spinner /> : (
                <>

                    {/* sorting, filtering */}
                    <div className='flex flex-col md:flex-row relative z-[1]'>
                        <div className='flex-1 flex flex-col sm:flex-row sm:justify-start sm:items-end gap-2 text-[14px] mb-2 w-full'>
                            <SelectTableColumn allColumns={allColumns} />
                            <button onClick={printHandler} className='self-end button-green'><PrinterIcon className='w-6 text-white' /></button>
                        </div>
                    </div>

                    {/* printing table */}
                    <div ref={printTableRef} className='print:p-4'>

                        {/* heading the table */}
                        <div className='relative w-3/4 mx-auto whitespace-normal mt-8 print:mt-0 '>
                            <ReceptionEditInline value={"Статистикани принтерда чиқазиш ва унга сарлавҳа қуйиш учун ҳолос"} />
                        </div>

                        {/* table */}
                        <div className='overflow-x-scroll print:overflow-x-hidden'>
                            {roomStatsIsFetching ? <Spinner /> : (
                                <Table
                                    getTableProps={getTableProps}
                                    headerGroups={headerGroups}
                                    rows={rows}
                                    getTableBodyProps={getTableBodyProps}
                                    prepareRow={prepareRow}
                                />
                            )}
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default RoomStatisticsTable


interface TProps {
    getTableProps: (propGetter?: TablePropGetter<RoomStatProps> | undefined) => TableProps,
    headerGroups: HeaderGroup<RoomStatProps>[],
    rows: Row<RoomStatProps>[],
    getTableBodyProps: (propGetter?: TableBodyPropGetter<RoomStatProps> | undefined) => TableBodyProps,
    prepareRow: (row: Row<RoomStatProps>) => void,
}

function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow }: TProps) {

    // calculation
    const res = rows.reduce((acc, current) => {
        acc = {
            ...acc,
            patAmount: acc.patAmount + current.original.patinets,
            totalAmount: acc.totalAmount + current.original.total_sum
        }
        return acc
    }, { patAmount: 0, totalAmount: 0 })

    return (
        <table  {...getTableProps} className="w-full text-sm print:text-[10px] print:mt-0 whitespace-nowrap">
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className='sticky top-0'>
                            {headerGroup.headers.map(column => (
                                <th className='py-2 text-black bg-cblue' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className='flex items-center justify-start gap-1 px-4'>
                                        {column.render("Header")}
                                        <ChevronDownIcon className={` ${column.isSorted ? column.isSortedDesc ? "-rotate-180" : "rotate-0" : "hidden"} w-3 transition-all`} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>

            <tbody {...getTableBodyProps}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr className='[&:nth-child(even)]:bg-gray-100 hover:[&:nth-child(even)]:bg-cblue/20 hover:bg-cblue/20 font-semibold transition-all' {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td className='py-2 px-4' {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                        </tr>
                    )
                })}
                <tr className='h-12 border'>
                    <td className='font-bold py-2 px-4'>Jami:</td>
                    <td className='font-bold py-2 px-4'>{toLocale(res.patAmount)}</td>
                    <td className='font-bold py-2 px-4'>{toLocale(res.totalAmount)}</td>
                </tr>
            </tbody>

        </table>
    )
}