import { PrinterIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";
import logo from "../../../assets/logo.png";

interface ServicesTableProps {
    patient: PatientProps;
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const printRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { birthday, address, service, full_name, phone_number, doctor } = patient;

    const handlePrint = useReactToPrint({
        content: () => (selectedIndex !== null && printRefs.current[selectedIndex] ? printRefs.current[selectedIndex] : null),
        documentTitle: "table",
    });

    useEffect(() => {
        if (selectedIndex !== null) {
            handlePrint();
        }
    }, [selectedIndex]);

    return (
        <div className="mb-20">
            <table className="w-full">
                <caption className="font-bold text-lg mb-4 text-left">Бошқа маълумотлар</caption>
                <thead>
                    <tr>
                        {service.map((item, index) => (
                            <th key={item.id} className="p-1 border border-slate-400">
                                {item.service_name} тўланган сумма
                                <button onClick={() => setSelectedIndex(index)} className="self-end button-green ml-2">
                                    <PrinterIcon className="w-4 text-white" />
                                </button>
                                {/* Printable content for small printer */}
                                <div ref={(el) => (printRefs.current[index] = el)}>
                                    <div className="hidden print:block print:w-[93%] border print:mx-auto print:text-xs print:px-2">
                                        <div className="hidden print:flex justify-center mb-2">
                                            <img src={logo} alt="img" className="w-[100px] h-[72px] object-cover" />
                                        </div>

                                        <div className="hidden print:block text-center">
                                            <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                                            <h1 className="font-semibold">{full_name}</h1>
                                            <p className="font-semibold">{phone_number}</p>
                                            <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                                            <p className="font-semibold mb-4">{address}</p>
                                        </div>

                                        <div className="hidden print:block text-center">
                                            <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                                            <h1 className="">{doctor.full_name}</h1>
                                        </div>

                                        <div className="print:space-y-2 mt-4">
                                            <h1 className="font-bold text-base print:text-xs text-center my-2">Таом</h1>

                                            <p className="flex justify-between">
                                                <span className="font-bold">{item.service_name}</span>
                                                <span>{toLocale(item.service_price)} сўм тўланди</span>
                                            </p>

                                            <p className="flex justify-between">
                                                <span className="font-bold">Сана</span>
                                                <span>{format(new Date(), "dd/MM/yyyy HH:mm")}</span>
                                            </p>
                                        </div>

                                        <p className="hidden print:block font-bold mt-8 pb-12">Kacca: </p>
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
