import { useRef, useState, useEffect } from "react"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { PatientProps } from "../../../types/patientTypes"
import { toLocale } from "../../../utils/toLocale"
import ReactToPrint, { useReactToPrint } from "react-to-print"

interface ServicesTableProps {
    patient: PatientProps
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const printTableRef = useRef<HTMLDivElement[]>([])
    const [index, setIndex] = useState<number | null>(null)
    const { service, full_name, phone_number } = patient

    useEffect(() => {
        if (index || index === 0) {
            useReactToPrint({
                content: () => printTableRef.current[index] ? printTableRef?.current[index] : null,
                documentTitle: "table",
            })
        }
    }, [index])

    const printHandler = (index: number) => setIndex(index)


    return (
        <div className="mb-20">
            <table className="w-full">
                <caption className="font-bold text-lg mb-4 text-left">Boshqa ma'lumotlar</caption>
                <thead>
                    <tr>
                        {service.map((item, index) => (
                            <th key={item.id} className="p-1 border border-slate-400">
                                {item.service_name} тўланган сумма
                                <ReactToPrint
                                    trigger={() => (
                                        <button onClick={() => printHandler(index)} className='self-end button-green ml-2'><PrinterIcon className='w-4 text-white' /></button>
                                    )}
                                    content={() => printTableRef.current[index]}
                                />
                                {/* printing part */}
                                <div ref={el => el ? printTableRef.current[index] = el : null} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px]">
                                    <div className="hidden print:block">
                                        <h1 className="font-bold text-lg text-left flex items-center gap-2">{full_name}</h1>
                                        <p className="text-gray-500 font-semibold mb-4">{phone_number}</p>
                                    </div>
                                    <div className=" hidden print:flex gap-2 ">
                                        <span className="font-bold">{item.service_name}</span> - <span>{toLocale(item.service_price)} so'm to'landi</span>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {service.map((item) => (
                            <td key={item.id} className="p-1 border border-slate-400 text-center">{toLocale(item.service_price)} so'm</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ServicesTable