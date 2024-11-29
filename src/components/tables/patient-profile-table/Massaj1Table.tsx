import { PrinterIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";
import { usePatientStore } from "../../../zustand/PatientStore";

interface Massaj1TableProps {
    patient: PatientProps;
    edit: boolean;
    extraMassaj1Amount: number;
}

const Massaj1Table = ({ patient, edit, extraMassaj1Amount }: Massaj1TableProps) => {
    const printTableRef = useRef(null);
    const { incMassaj1Duration, decMassaj1Duration } = usePatientStore((state) => state);
    const { birthday, address, massaj1_duration, doctor, massaj1_amount, massaj1_refund, full_name, phone_number } = patient;

    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    return (
        <div className="mb-20">
            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Катталар учун массаж
                <button onClick={printHandler} className="self-end button-green">
                    <PrinterIcon className="w-6 text-white" />
                </button>
            </h1>

            <div ref={printTableRef}>
                <div className="print:w-[93%] print:mx-auto print:mt-4 print:text-xs logo-bg print:border-2 print:border-black print:p-2">
                    {/* top */}
                    <div className="hidden print:block text-center mb-2">
                        <h1 className="font-bold text-xl print:text-base">Тўлов Чеки</h1>
                    </div>

                    {/* bottom */}
                    <div className="hidden print:flex gap-12 mb-4">
                        <div className="border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                            <p className="font-semibold">{phone_number}</p>
                            <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                            <p className="font-semibold mb-4">{address}</p>
                        </div>

                        <div className=" border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                        </div>
                    </div>

                    <table className="w-full print:mb-1">
                        <thead>
                            <tr>
                                <th className="p-1 border border-slate-400">Катталар учун массаж </th>
                                <th className="p-1 border border-slate-400">Куни </th>
                                <th className="p-1 border border-slate-400">Тўланган сумма</th>
                                <th className="p-1 border border-slate-400">Қайтарилди</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 border border-slate-400 text-center"></td>
                                <td className="p-1 border border-slate-400 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        {edit ? (
                                            <>
                                                <button onClick={decMassaj1Duration} className="sub-btn">
                                                    -
                                                </button>
                                                {massaj1_duration}
                                                <button onClick={incMassaj1Duration} className="add-btn">
                                                    +
                                                </button>
                                            </>
                                        ) : (
                                            massaj1_duration
                                        )}
                                    </div>
                                </td>

                                <td className="p-1 border border-slate-400 text-center w-[180px]">
                                    {toLocale(massaj1_amount)}
                                    {extraMassaj1Amount ? (
                                        extraMassaj1Amount > 0 ? (
                                            <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">
                                                +{toLocale(extraMassaj1Amount)}
                                            </span>
                                        ) : extraMassaj1Amount < 0 ? (
                                            <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraMassaj1Amount)}</span>
                                        ) : null
                                    ) : null}
                                </td>

                                <td className="p-1 border border-slate-400 text-center">{toLocale(massaj1_refund)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                </div>

                {/* second */}
                <div className="hidden print:block print:w-[93%] print:mx-auto print:mt-4 print:text-xs logo-bg print:border-2 print:border-black print:p-2">
                    {/* top */}
                    <div className="hidden print:block text-center mb-2">
                        <h1 className="font-bold text-xl print:text-base">Тўлов Чеки</h1>
                    </div>

                    {/* bottom */}
                    <div className="hidden print:flex gap-12 mb-4">
                        <div className="border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                            <p className="font-semibold">{phone_number}</p>
                            <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                            <p className="font-semibold mb-4">{address}</p>
                        </div>

                        <div className=" border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                        </div>
                    </div>

                    <table className="w-full print:mb-1">
                        <thead>
                            <tr>
                                <th className="p-1 border border-slate-400">Катталар учун массаж </th>
                                <th className="p-1 border border-slate-400">Куни </th>
                                <th className="p-1 border border-slate-400">Тўланган сумма</th>
                                <th className="p-1 border border-slate-400">Қайтарилди</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 border border-slate-400 text-center"></td>
                                <td className="p-1 border border-slate-400 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        {edit ? (
                                            <>
                                                <button onClick={decMassaj1Duration} className="sub-btn">
                                                    -
                                                </button>
                                                {massaj1_duration}
                                                <button onClick={incMassaj1Duration} className="add-btn">
                                                    +
                                                </button>
                                            </>
                                        ) : (
                                            massaj1_duration
                                        )}
                                    </div>
                                </td>

                                <td className="p-1 border border-slate-400 text-center w-[180px]">
                                    {toLocale(massaj1_amount)}
                                    {extraMassaj1Amount ? (
                                        extraMassaj1Amount > 0 ? (
                                            <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">
                                                +{toLocale(extraMassaj1Amount)}
                                            </span>
                                        ) : extraMassaj1Amount < 0 ? (
                                            <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraMassaj1Amount)}</span>
                                        ) : null
                                    ) : null}
                                </td>

                                <td className="p-1 border border-slate-400 text-center">{toLocale(massaj1_refund)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                </div>
            </div>
        </div>
    );
};

export default Massaj1Table;
