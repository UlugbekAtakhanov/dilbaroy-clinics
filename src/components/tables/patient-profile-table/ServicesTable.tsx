import { useRef, useState, useEffect } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import qr from "../../../assets/qr.png";

interface ServicesTableProps {
    patient: PatientProps;
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const printTableRef = useRef<HTMLDivElement[]>([]);
    const [index, setIndex] = useState<number | null>(null);
    const { birthday, address, service, full_name, phone_number, doctor } = patient;

    useEffect(() => {
        if (index || index === 0) {
            useReactToPrint({
                content: () => (printTableRef.current[index] ? printTableRef?.current[index] : null),
                documentTitle: "table",
            });
        }
    }, [index]);

    const printHandler = (index: number) => setIndex(index);

    return (
        <div className="mb-20">
            <table className="w-full">
                <caption className="font-bold text-lg mb-4 text-left">Бошқа маълумотлар</caption>
                <thead>
                    <tr>
                        {service.map((item, index) => (
                            <th key={item.id} className="p-1 border border-slate-400">
                                {item.service_name} тўланган сумма
                                <ReactToPrint
                                    trigger={() => (
                                        <button onClick={() => printHandler(index)} className="self-end button-green ml-2">
                                            <PrinterIcon className="w-4 text-white" />
                                        </button>
                                    )}
                                    content={() => printTableRef.current[index]}
                                />
                                {/* printing part */}
                                <div ref={(el) => (el ? (printTableRef.current[index] = el) : null)}>
                                    <div className="print:w-[93%] print:mx-auto print:mt-4 print:text-[12px] logo-bg print:border print:border-slate-400 print:p-2">
                                        {" "}
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
                                        <div className=" hidden print:flex gap-2 text-base bg-gray-100 p-1 print:mb-4">
                                            <span className="font-bold ">{item.service_name}</span> -{" "}
                                            <span>{toLocale(item.service_price)} сўм тўланди</span>
                                        </div>
                                        <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                                    </div>

                                    <div className="hidden print:block print:w-[93%] print:mx-auto print:mt-4 print:text-[12px] logo-bg print:border print:border-slate-400 print:p-2">
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
                                        <div className=" hidden print:flex gap-2 text-base bg-gray-100 p-1 print:mb-4">
                                            <span className="font-bold ">{item.service_name}</span> -{" "}
                                            <span>{toLocale(item.service_price)} сўм тўланди</span>
                                        </div>
                                        <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {service.map((item) => (
                            <td key={item.id} className="p-1 border border-slate-400 text-center">
                                {toLocale(item.service_price)} so'm
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ServicesTable;
