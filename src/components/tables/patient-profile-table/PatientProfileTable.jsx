import React, { useMemo, useRef } from 'react'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { COLUMNS } from './columns'

import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import bgLogo from "../../../assets/bg-logo.png"
import logo from "../../../assets/logo.png"
import { useLabPatientAnalysisUpdate } from '../../../hooks/usePatientsData'
import SelectTableColumn from '../SelectTableColumn'
import Statistics from '../Statistics'
import TableTab from '../../tabs/TableTab'
import ReceptionEditInline from '../../edit-inline/ReceptionEditInline'



const PatientProfileTable = ({ patient, analysisList, title }) => {
    const { patientId } = useParams()
    const printTableRef = useRef()

    const { staff: { info: { position } } } = useSelector(state => state)

    const { mutate: mutateAnalysis, isLoading } = useLabPatientAnalysisUpdate()

    const fetchedData = analysisList
    // const fetchedData = patient.analysis
    // table features
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => fetchedData || [], [])
    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state, setGlobalFilter,
        allColumns, getToggleHideAllColumnsProps
    } = tableInstance
    const { globalFilter } = state


    // print handler
    const printHandler = useReactToPrint({
        content: () => printTableRef.current,
        documentTitle: "table",
    })


    // save analysis handler
    const saveHandler = () => {
        const res = rows.reduce((acc, current) => {
            acc.resArr = [...acc.resArr, { analysis_id: current.original.id, result: current.original.result }]
            acc.count = current.original.result ? acc.count + 1 : acc.count
            return acc
        }, { resArr: [], count: 0 })
        const data = { patientId, analysis: res.resArr, analysis_count: res.count }
        mutateAnalysis(data)
    }

    return (
        <div className='relative min-w-[700px]'>
            {/* table section */}
            {/* <div className='items-end justify-between sm:flex mb-8'>
                <div className='flex flex-col sm:flex-row sm:justify-start sm:items-end gap-2 text-[14px] mb-2'>
                    <SelectTableColumn allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
                    <button onClick={printHandler} className='self-end button-green'><PrinterIcon className='w-6 text-white' /></button>
                </div>
                <div className='flex items-end gap-2 p-1'>
                    <Statistics rows={rows} title={"Тахлиллар сони"} />
                </div>
            </div> */}

            {/* printing part */}
            <div ref={printTableRef} className='relative print:min-h-[750px] print:p-4'>
                <div className='hidden print:block'>
                    <img className='w-[180px]' src={logo} alt="logo" />
                </div>

                {/* patient data */}
                <table className='my-4 text-[13px] print:text-[14px] hidden print:block'>
                    <tbody>
                        <tr>
                            <td className='border pl-2 pr-8 py-2 font-bold'>Бемор Ф.И.О.</td>
                            <td className='border pl-2 pr-8 py-2 font-semibold'>{patient.full_name}</td>
                        </tr>
                        <tr>
                            <td className='border pl-2 pr-8 py-2 font-bold'>Рўйхат рақами</td>
                            <td className='border pl-2 pr-8 py-2 font-semibold'>№ {patient.id}/{new Date(patient.created_date).getFullYear()}</td>
                        </tr>
                        <tr>
                            <td className='border pl-2 pr-8 py-2 font-bold'>Яшаш манзили</td>
                            <td className='border pl-2 pr-8 py-2 font-semibold'>{patient.address}</td>
                        </tr>
                        <tr>
                            <td className='border pl-2 pr-8 py-2 font-bold'>Иш жойи ва лавозими</td>
                            <td className='border pl-2 pr-8 py-2 font-semibold'>{patient.workplace}</td>
                        </tr>
                        <tr>
                            <td className='border pl-2 pr-8 py-2 font-bold'>Телефон рақами</td>
                            <td className='border pl-2 pr-8 py-2 font-semibold'>{patient.phone_number}</td>
                        </tr>
                    </tbody>
                </table>

                <div className='relative w-3/4 mx-auto whitespace-normal print:mt-0 text-sm'>
                    <ReceptionEditInline value={`${title} тахлил натижалари`} />
                    <button onClick={printHandler} className='self-end button-green absolute bottom-[2px] -right-16 print:hidden'><PrinterIcon className='w-6 text-white' /></button>
                </div>


                {/* analysis */}
                <Table
                    getTableProps={getTableProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    getTableBodyProps={getTableBodyProps}
                    prepareRow={prepareRow}
                />

                {position === "labarant" && (
                    <div className={`${isLoading ? "opacity-50 pointer-events-none" : ""} mt-4 text-right print:hidden`}>
                        <button onClick={saveHandler} className='button-green'>Сақлаш</button>
                    </div>
                )}

                {/* bg-logo */}
                <div className='hidden print:block w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <img className='w-full' src={bgLogo} alt="img" />
                </div>
            </div>

        </div>
    )
}

export default PatientProfileTable



// analysis table
function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow }) {
    return (
        <table {...getTableProps} className="w-full text-sm print:text-[14px]">

            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className='py-2 text-black border first:text-left' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className='flex justify-center gap-1 pl-4'>
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
                        <tr className='hover:bg-green-50 font-semibold transition-all' {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td className=' pl-4 border' {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
}






