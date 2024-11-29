import { Fragment, useMemo, useRef } from "react";
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps, useGlobalFilter, useSortBy, useTable } from "react-table";
import { COLUMNS } from "./columns";
import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useReactToPrint } from "react-to-print";
import ReceptionEditInline from "../../edit-inline/ReceptionEditInline";
import Spinner from "../../spinner/Spinner";
import GlobalSearch from "../GlobalSearch";
import SelectTableColumn from "../SelectTableColumn";
import { useDoctorStatisticsGetData } from "../../../hooks/useStatisticsData";
import { DoctorStatProps } from "../../../types/doctorStatTypes";
import { toLocale } from "../../../utils/toLocale";
import { useSearchParams } from "react-router-dom";

const StatisticsTable = () => {
    const printTableRef = useRef<HTMLDivElement>(null);
    const [searchParams, setSearchParams] = useSearchParams({
        startDate: JSON.stringify(Date.now() - 1000 * 60 * 60 * 24 * 30),
        endDate: JSON.stringify(Date.now()),
    });

    // fetching patients list
    const { data: docStatisticsData, isLoading: docStatsIsLoading, isFetching: docStatsIsFetching } = useDoctorStatisticsGetData({});
    const fetchedData = docStatisticsData?.data;

    // table features
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => fetchedData || [], [fetchedData]);
    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter, allColumns } = tableInstance;
    const { globalFilter } = state;

    // print handler
    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    return (
        <div className="p-4 pb-[200px]">
            <h1 className="mb-4 font-semibold text-center">Статистика</h1>

            {/* filter section */}
            <GlobalSearch
                getPatientsFn={useDoctorStatisticsGetData}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />

            {/* table section */}
            {docStatsIsLoading ? (
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
                    </div>

                    {/* printing table */}
                    <div ref={printTableRef} className="print:p-4">
                        {/* heading the table */}
                        <div className="relative w-3/4 mx-auto whitespace-normal mt-8 print:mt-0 ">
                            <ReceptionEditInline value={"Статистикани принтерда чиқазиш ва унга сарлавҳа қуйиш учун ҳолос"} />
                        </div>

                        {/* table */}
                        <div className="overflow-x-scroll print:overflow-x-hidden">
                            {docStatsIsFetching ? (
                                <Spinner />
                            ) : (
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
    );
};

export default StatisticsTable;

interface TProps {
    getTableProps: (propGetter?: TablePropGetter<DoctorStatProps> | undefined) => TableProps;
    headerGroups: HeaderGroup<DoctorStatProps>[];
    rows: Row<DoctorStatProps>[];
    getTableBodyProps: (propGetter?: TableBodyPropGetter<DoctorStatProps> | undefined) => TableBodyProps;
    prepareRow: (row: Row<DoctorStatProps>) => void;
}

interface AccProps {
    patCount: number;
    totalAmount: number;
    totalRefund: number;
    roomAmount: number;
    foodAmount: number;
    massaj1Amount: number;
    massaj2Amount: number;
    ekgAmount: number;
    rentgenAmount: number;
}

function Table({ getTableProps, headerGroups, rows, getTableBodyProps, prepareRow }: TProps) {
    // calculation 1
    const res = rows.reduce(
        (acc: AccProps, current: Row<DoctorStatProps>) => {
            const item = current?.cells;
            // calculation 2
            const r = current.original.patients.reduce(
                (t, curr) => {
                    const ekg_amount = curr.service.find((item) => item.service_name === "EKG")?.service_price ?? 0;
                    const rentgen_amount = curr.service.find((item) => item.service_name === "Rentgen")?.service_price ?? 0;
                    return {
                        ...t,
                        total_amount: t.total_amount + curr.total_amount,
                        total_refund: t.total_refund + curr.total_refund,
                        room_amount: t.room_amount + curr.room_amount,
                        food_amount: t.food_amount + curr.food_amount,
                        massaj1_amount: t.massaj1_amount + curr.massaj1_amount,
                        massaj2_amount: t.massaj2_amount + curr.massaj2_amount,
                        ekg_amount: t.ekg_amount + ekg_amount,
                        rentgen_amount: t.rentgen_amount + rentgen_amount,
                    };
                },
                {
                    total_amount: 0,
                    total_refund: 0,
                    room_amount: 0,
                    food_amount: 0,
                    massaj1_amount: 0,
                    massaj2_amount: 0,
                    ekg_amount: 0,
                    rentgen_amount: 0,
                }
            );

            acc = {
                ...acc,
                patCount: acc.patCount + item[1]?.value,
                totalAmount: acc.totalAmount + r.total_amount,
                totalRefund: acc.totalRefund + r.total_refund,
                roomAmount: acc.roomAmount + r.room_amount,
                foodAmount: acc.foodAmount + r.food_amount,
                massaj1Amount: acc.massaj1Amount + r.massaj1_amount,
                massaj2Amount: acc.massaj2Amount + r.massaj2_amount,
                ekgAmount: acc.ekgAmount + r.ekg_amount,
                rentgenAmount: acc.rentgenAmount + r.rentgen_amount,
            };
            return acc;
        },
        { patCount: 0, totalAmount: 0, totalRefund: 0, roomAmount: 0, foodAmount: 0, massaj1Amount: 0, massaj2Amount: 0, ekgAmount: 0, rentgenAmount: 0 }
    );

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
                            className="[&:nth-child(even)]:bg-gray-100 hover:[&:nth-child(even)]:bg-cblue/20 hover:bg-cblue/20 font-semibold transition-all"
                            {...row.getRowProps()}
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td className="py-2 px-4" {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}

                <tr className="h-12 border">
                    {headerGroups[0].headers.map((header, index) => {
                        return (
                            <Fragment key={index}>
                                {header.Header === "Шифокор Ф.И.О." ? <td className="font-bold py-2 px-4">Jami:</td> : null}
                                {header.Header === "Палатага ётқизилган беморлар сони" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.patCount)}</td>
                                ) : null}
                                {header.Header === "Умумий сумма" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.totalAmount)}</td>
                                ) : null}
                                {header.Header === "Қайтарилди" ? <td className="text-center font-bold py-2 px-4">{toLocale(res.totalRefund)}</td> : null}
                                {header.Header === "Палатадан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.roomAmount)}</td>
                                ) : null}
                                {header.Header === "Таомдан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.foodAmount)}</td>
                                ) : null}
                                {header.Header === "Массаж катта дан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.massaj1Amount)}</td>
                                ) : null}
                                {header.Header === "Массаж кичик дан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.massaj2Amount)}</td>
                                ) : null}
                                {header.Header === "EKG дан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.ekgAmount)}</td>
                                ) : null}
                                {header.Header === "Rentgen дан тушган пул" ? (
                                    <td className="text-center font-bold py-2 px-4">{toLocale(res.rentgenAmount)}</td>
                                ) : null}
                            </Fragment>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
}
