import { useRef } from "react";
import { toLocale } from "../../../utils/toLocale";
import { PatientProps } from "../../../types/patientTypes";
import { usePatientStore } from "../../../zustand/PatientStore";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useReactToPrint } from "react-to-print";
import qr from "../../../assets/qr.png";
import { format } from "date-fns";

interface Massaj2TableProps {
    patient: PatientProps;
    edit: boolean;
    extraMassaj2Amount: number;
}

const Massaj2Table = ({ patient, edit, extraMassaj2Amount }: Massaj2TableProps) => {
    const printTableRef = useRef(null);
    const { incMassaj2Duration, decMassaj2Duration } = usePatientStore((state) => state);
    const { birthday, address, massaj2_duration, doctor, massaj2_amount, massaj2_refund, full_name, phone_number } = patient;

    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    return (
        <div className="mb-20">
            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Кичиклар учун массаж
                <button onClick={printHandler} className="self-end button-green">
                    <PrinterIcon className="w-6 text-white" />
                </button>
            </h1>

            <div
                ref={printTableRef}
                className="print:w-[95%] print:mx-auto print:mt-4 print:text-[14px] logo-bg print:border-2 print:border-black print:p-4"
            >
                {/* top */}
                <div className="hidden print:block text-center mb-2">
                    <h1 className="font-bold text-xl">Тўлов Чеки</h1>
                </div>

                {/* bottom */}
                <div className="hidden print:flex gap-12 mb-4">
                    <div className="border-l-2 border-black pl-2 ">
                        <h1 className="font-bold text-base">Бемор ҳақида маълумот:</h1>
                        <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                        <p className="font-semibold">{phone_number}</p>
                        <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                        <p className="font-semibold mb-4">{address}</p>
                    </div>

                    <div className=" border-l-2 border-black pl-2 ">
                        <h1 className="font-bold text-base">Доктор ҳақида маълумот:</h1>
                        <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                    </div>
                </div>
                {/* <div ref={printTableRef} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px] logo-bg print:border print:border-slate-400 print:p-2"> */}
                {/* top */}
                {/* <div className="hidden print:block text-center">
                    <h1 className="font-bold text-base ">'DILBAROY MALHAM SHIFO SERVIS' MCHJ SHIFOXONASI</h1>
                    <p className="font-semibold text-base">ТЎЛОВ ҚОҒОЗИ</p>
                    <p className="font-semibold mb-4 text-base">№{id}/{new Date().getFullYear()}</p>
                </div>
                <div className="hidden print:block">
                    <h1 className="font-semibold text-left flex items-center gap-2">Бемор Ф.И.О.: {full_name}</h1>
                    <p className="font-semibold">Телефон рақами: {phone_number}</p>
                    <p className="font-semibold">Туғилган сана: {format(new Date(birthday), "dd/MM/yyyy")}</p>
                    <p className="font-semibold mb-4">Яшаш манзили: {address}</p>
                </div> */}

                <table className="w-full print:mb-4">
                    <thead>
                        <tr>
                            <th className="p-1 border border-slate-400"> Кичиклар учун массаж </th>
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
                                            <button onClick={decMassaj2Duration} className="sub-btn">
                                                -
                                            </button>
                                            {massaj2_duration}
                                            <button onClick={incMassaj2Duration} className="add-btn">
                                                +
                                            </button>
                                        </>
                                    ) : (
                                        massaj2_duration
                                    )}
                                </div>
                            </td>

                            <td className="p-1 border border-slate-400 text-center w-[180px]">
                                {toLocale(massaj2_amount)}
                                {extraMassaj2Amount ? (
                                    extraMassaj2Amount > 0 ? (
                                        <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">
                                            +{toLocale(extraMassaj2Amount)}
                                        </span>
                                    ) : extraMassaj2Amount < 0 ? (
                                        <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraMassaj2Amount)}</span>
                                    ) : null
                                ) : null}
                            </td>

                            <td className="p-1 border border-slate-400 text-center">{toLocale(massaj2_refund)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* bottom */}
                {/* <div className="hidden print:flex gap-20">
                    <div className="">
                        <h1 className="font-semibold">Мурожаат учун тел: </h1>
                        <div>
                            <div>📞+998692330753</div>
                            <div>📞+998975640010</div>
                            <div>📞+998945070222</div>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">М.у.</p>
                    </div>
                    <div className="w-[100px] ml-auto">
                        <img src={qr} alt="img" />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Massaj2Table;
