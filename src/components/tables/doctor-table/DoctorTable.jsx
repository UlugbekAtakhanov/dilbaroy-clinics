import React, { useMemo, useRef } from 'react'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { COLUMNS } from './columns'

import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline"
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useDoctorPatientsGetData } from '../../../hooks/usePatientsData'
import { addSinglePatient } from '../../../redux/singlePatientSlice'
import ReceptionEditInline from '../../edit-inline/ReceptionEditInline'
import Spinner from '../../spinner/Spinner'
import GlobalSearch from '../GlobalSearch'
import SelectTableColumn from '../SelectTableColumn'
import Statistics from '../Statistics'


const DoctorTable = () => {
    const dispatch = useDispatch()
    const printTableRef = useRef()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const serviceSearchParamsTerm = searchParams.get("service")


    // fetching patients list
    const { isLoading: patientsIsLoading, isFetching: patientsIsFetching, data: patients } = useDoctorPatientsGetData({ dispatch, serviceSearchParamsTerm, navigate })
    const fetchedData = patients?.data
    const total = patients?.total



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
        allColumns, getToggleHideAllColumnsProps
    } = tableInstance
    const { globalFilter } = state


    // print handler
    const printHandler = useReactToPrint({
        content: () => printTableRef.current,
        documentTitle: "table",
    })

    // go to profile
    const goToProfileHandler = (row) => {
        navigate(`/patients/${row.original.id}/${row.original.slug_name}`)
        dispatch(addSinglePatient(row.original))
    }

    const newRows = rows.filter(item => item.original.doctor !== null)

    return (
        <div className='p-4 pb-[300px]'>

            <h1 className='mb-4 font-semibold text-center'>Беморлар рўйхати</h1>

            {/* filter section */}
            <GlobalSearch getPatientsFn={useDoctorPatientsGetData} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            {/* table section */}
            {patientsIsLoading ? <Spinner /> : (
                <>

                    {/* sorting, filtering */}
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-end relative z-[1]'>
                        <div className='flex flex-col sm:flex-row sm:justify-start sm:items-end gap-2 text-[14px] mb-2 w-full'>
                            <SelectTableColumn allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
                            <button onClick={printHandler} className='self-end button-green hidden sm:block'><PrinterIcon className='w-6 text-white' /></button>
                        </div>
                        <div className='sm:flex items-end gap-4 justify-end'>
                            <Statistics rows={newRows} total={total} />
                        </div>
                    </div>

                    {/* printing table */}
                    <div ref={printTableRef}>
                        <div className='relative w-3/4 mx-auto whitespace-normal mt-8 print:mt-0'>
                            <ReceptionEditInline value={"Статистикани принтерда чиқазиш ва унга сарлавҳа қуйиш учун ҳолос"} />
                        </div>
                        <div className='overflow-x-scroll print:overflow-x-visible'>
                            {patientsIsFetching ? <Spinner /> : (
                                <Table
                                    getTableProps={getTableProps}
                                    headerGroups={headerGroups}
                                    rows={newRows}
                                    getTableBodyProps={getTableBodyProps}
                                    prepareRow={prepareRow}
                                    goToProfileHandler={goToProfileHandler}
                                />
                            )}
                        </div>

                        <div className='flex flex-col sm:flex-row justify-end items-end sm:gap-4 mt-4'>
                            <Statistics rows={newRows} total={total} />
                        </div>
                    </div>


                </>
            )}
        </div>
    )
}

export default DoctorTable

function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow, goToProfileHandler }) {
    return (
        <table  {...getTableProps} className="w-full text-sm print:text-[10px]  print:mt-0 whitespace-nowrap">
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className='sticky top-0'>
                            {headerGroup.headers.map(column => (
                                <th className='py-2 text-black bg-green-400' {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                        <tr onClick={() => goToProfileHandler(row)} className='[&:nth-child(even)]:bg-gray-100 hover:[&:nth-child(even)]:bg-green-200 hover:bg-green-200 font-semibold transition-all' {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td className='py-2 px-4' {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
}