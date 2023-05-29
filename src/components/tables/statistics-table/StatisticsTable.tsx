import { useMemo, useRef } from 'react'
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps, useGlobalFilter, useSortBy, useTable } from 'react-table'
import { COLUMNS } from './columns'

import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline"
import { useReactToPrint } from 'react-to-print'
import ReceptionEditInline from '../../edit-inline/ReceptionEditInline'
import Spinner from '../../spinner/Spinner'
import GlobalSearch from '../GlobalSearch'
import SelectTableColumn from '../SelectTableColumn'
import { useDoctorStatisticsGetData } from '../../../hooks/useStatisticsData'
import { DoctorStatProps } from '../../../types/doctorStatTypes'
import { toLocale } from '../../../utils/toLocale'


const StatisticsTable = () => {
    const printTableRef = useRef<HTMLDivElement>(null)

    // fetching patients list
    const { data: docStatisticsData, isLoading: docStatsIsLoading, isFetching: docStatsIsFetching } = useDoctorStatisticsGetData({})
    const fetchedData = docStatisticsData?.data

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

    console.log(rows)

    return (
        <div className='p-4 pb-[200px]'>

            <h1 className='mb-4 font-semibold text-center'>Статистика</h1>

            {/* filter section */}
            <GlobalSearch getPatientsFn={useDoctorStatisticsGetData} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            {/* table section */}
            {docStatsIsLoading ? <Spinner /> : (
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
                            {docStatsIsFetching ? <Spinner /> : (
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

export default StatisticsTable


interface TProps {
    getTableProps: (propGetter?: TablePropGetter<DoctorStatProps> | undefined) => TableProps,
    headerGroups: HeaderGroup<DoctorStatProps>[],
    rows: Row<DoctorStatProps>[],
    getTableBodyProps: (propGetter?: TableBodyPropGetter<DoctorStatProps> | undefined) => TableBodyProps,
    prepareRow: (row: Row<DoctorStatProps>) => void,
}

interface AccProps {
    patCount: number,
    totalAmount: number,
    totalRefund: number,
    roomAmount: number,
    foodAmount: number,
    ekgAmount: number,
    rentgenAmount: number
}

function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow }: TProps) {
    const res = rows.reduce((acc: AccProps, current: Row<DoctorStatProps>) => {
        const item = current?.cells
        // calculation
        const r = current.original.patients.reduce((t, curr) => {
            const ekg_amount = curr.service.find(item => item.service_name === "EKG")?.service_price ?? 0
            const rentgen_amount = curr.service.find(item => item.service_name === "Rentgen")?.service_price ?? 0
            return {
                ...t,
                total_amount: curr.total_amount,
                total_refund: curr.total_refund,
                room_amount: curr.room_amount,
                food_amount: curr.food_amount,
                ekg_amount,
                rentgen_amount
            }
        }, { total_amount: 0, total_refund: 0, room_amount: 0, food_amount: 0, ekg_amount: 0, rentgen_amount: 0 })
        acc = {
            ...acc,
            patCount: acc.patCount + item[1]?.value,
            totalAmount: acc.totalAmount + r.total_amount,
            totalRefund: acc.totalRefund + r.total_refund,
            roomAmount: acc.roomAmount + r.room_amount,
            foodAmount: acc.foodAmount + r.food_amount,
            ekgAmount: acc.ekgAmount + r.ekg_amount,
            rentgenAmount: acc.rentgenAmount + r.rentgen_amount,
        }
        // const item = current?.cells
        // acc = {
        //     ...acc,
        //     patCount: acc.patCount + item[1]?.value,
        //     totalAmount: acc.totalAmount + item[2]?.value,
        //     totalRefund: acc.totalRefund + item[3]?.value,
        //     roomAmount: acc.roomAmount + item[4]?.value,
        //     foodAmount: acc.foodAmount + item[5]?.value,
        //     ekgAmount: acc.ekgAmount + item[6]?.value,
        //     rentgenAmount: acc.rentgenAmount + item[7]?.value,
        // }
        return acc
    }, { patCount: 0, totalAmount: 0, totalRefund: 0, roomAmount: 0, foodAmount: 0, ekgAmount: 0, rentgenAmount: 0 })


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
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.patCount)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.totalAmount)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.totalRefund)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.roomAmount)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.foodAmount)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.ekgAmount)}</td>
                    <td className='text-center font-bold py-2 px-4'>{toLocale(res.rentgenAmount)}</td>
                </tr>
            </tbody>

        </table>
    )
}