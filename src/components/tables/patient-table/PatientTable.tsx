import { useMemo, useRef } from "react";
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps, useGlobalFilter, useSortBy, useTable } from "react-table";
import { COLUMNS } from "./columns";

import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { usePatientsGetData } from "../../../hooks/usePatientsData";
import { PatientProps } from "../../../types/patientTypes";
import ReceptionEditInline from "../../edit-inline/ReceptionEditInline";
import Spinner from "../../spinner/Spinner";
import GlobalSearch from "../GlobalSearch";
import SelectTableColumn from "../SelectTableColumn";
import Statistics from "../Statistics";

const PatientTable = () => {
    const printTableRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams({
        startDate: JSON.stringify(Date.now() - 1000 * 60 * 60 * 24 * 30),
        endDate: JSON.stringify(Date.now()),
        columns: "Бемор Ф.И.О.,Палаталар,Шифокор,Таҳрирлаш",
    });

    // fetching patients list
    const { isLoading: patientsIsLoading, data: patients } = usePatientsGetData({});
    let fetchedData = patients?.data;

    const room_status = searchParams.get("room_status");
    const room_type = searchParams.get("room_type");

    // table features
    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => {
        let newData = fetchedData || [];

        if (room_status === "тугатилганлар" || room_status === "тугатилмаганлар") {
            newData = newData.filter((item: PatientProps) => (room_status === "тугатилганлар" ? item.room_status : !item.room_status));
        }

        if (room_type && room_type !== "ҳаммаси") {
            newData = newData
                .filter((item: PatientProps) => item.room?.room_type.room_type === room_type)
                .sort((a: PatientProps, b: PatientProps) => parseInt(a.room?.room_number) - parseInt(b.room?.room_number));
        }

        return newData;
    }, [fetchedData, room_status, room_type]);

    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter, allColumns } = tableInstance;
    const { globalFilter } = state;

 

    // print handler
    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    // go to profile
    const goToProfileHandler = (row: Row<PatientProps>) => {
        navigate(`/patients/${row.original.id}/${row.original.slug_name}`);
    };

    return (
        <div className="p-4 pb-[300px]">
            <h1 className="mb-4 font-semibold text-center">Беморлар рўйхати</h1>

            {/* filter section */}
            <GlobalSearch
                getPatientsFn={usePatientsGetData}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />

            {/* table section */}
            {patientsIsLoading ? (
                <Spinner />
            ) : (
                <>
                    {/* sorting, filtering */}
                    <div className="flex flex-col md:flex-row relative z-[1]">
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-start sm:items-end gap-2 text-[14px] mb-2 w-full">
                            <SelectTableColumn allColumns={allColumns} />
                            <button onClick={printHandler} className="self-end button-green">
                                <PrinterIcon className="w-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 sm:flex items-end gap-4 justify-end">
                            <Statistics rows={rows} />
                        </div>
                    </div>

                    {/* printing table */}
                    <div ref={printTableRef} className="print:p-4">
                        {/* heading the table */}
                        <div className="relative w-3/4 mx-auto whitespace-normal mt-8 print:mt-0 ">
                            <ReceptionEditInline value={"Статистикани принтерда чиқазиш ва унга сарлавҳа қуйиш учун ҳолос"} />
                        </div>

                        {/* table */}
                        <div className="overflow-x-scroll print:overflow-x-hidden">
                            <Table
                                getTableProps={getTableProps}
                                headerGroups={headerGroups}
                                rows={rows}
                                getTableBodyProps={getTableBodyProps}
                                prepareRow={prepareRow}
                                goToProfileHandler={goToProfileHandler}
                            />
                        </div>

                        {/* statistics */}
                        <div className="flex flex-col sm:flex-row justify-end items-end sm:gap-4 mt-4">
                            <Statistics rows={rows} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PatientTable;

interface TProps {
    getTableProps: (propGetter?: TablePropGetter<PatientProps> | undefined) => TableProps;
    headerGroups: HeaderGroup<PatientProps>[];
    rows: Row<PatientProps>[];
    getTableBodyProps: (propGetter?: TableBodyPropGetter<PatientProps> | undefined) => TableBodyProps;
    prepareRow: (row: Row<PatientProps>) => void;
    goToProfileHandler: (row: any) => void;
}

function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow, goToProfileHandler }: TProps) {
    return (
        <table {...getTableProps} className="w-full text-sm print:text-[10px] print:mt-0 whitespace-nowrap">
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="sticky top-0">
                        {headerGroup.headers.map((column) => (
                            <th className="py-2 text-black bg-cblue" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                <div className="flex items-center justify-start gap-1 px-4">
                                    {column.render("Header")}
                                    <ChevronDownIcon
                                        className={` ${
                                            column.isSorted ? (column.isSortedDesc ? "-rotate-180" : "rotate-0") : "hidden"
                                        } w-3 transition-all`}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            onClick={() => goToProfileHandler(row)}
                            className="[&:nth-child(even)]:bg-gray-100 hover:[&:nth-child(even)]:bg-cblue/20 hover:bg-cblue/20 font-semibold transition-all"
                            {...row.getRowProps()}
                        >
                            {row.cells.map((cell) => (
                                <td className="py-2 px-4" {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
