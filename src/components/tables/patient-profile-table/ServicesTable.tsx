import { useRef, useState, useEffect } from "react"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { PatientProps } from "../../../types/patientTypes"
import { toLocale } from "../../../utils/toLocale"
import ReactToPrint, { useReactToPrint } from "react-to-print"
import { format } from "date-fns"
import qr from "../../../assets/qr.png"

interface ServicesTableProps {
    patient: PatientProps
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const printTableRef = useRef<HTMLDivElement[]>([])
    const [index, setIndex] = useState<number | null>(null)
    const { id, birthday, address, service, full_name, phone_number } = patient

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
                <caption className="font-bold text-lg mb-4 text-left">Бошқа маълумотлар</caption>
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
                                <div ref={el => el ? printTableRef.current[index] = el : null} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px] logo-bg print:border print:border-slate-400 print:p-2">
                                    {/* top */}
                                    <div className="hidden print:block text-center">
                                        <h1 className="font-bold text-base ">'DILBAROY MALHAM SHIFO SERVIS' MCHJ SHIFOXONASI</h1>
                                        <p className="font-semibold text-base">ТЎЛОВ ҚОҒОЗИ</p>
                                        <p className="font-semibold mb-4 text-base">№{id}/{new Date().getFullYear()}</p>
                                    </div>
                                    <div className="hidden print:block">
                                        <h1 className="font-semibold text-left flex items-center gap-2">Бемор Ф.И.О.: {full_name}</h1>
                                        <p className="font-semibold">Телефон рақами: {phone_number}</p>
                                        <p className="font-semibold">Туғилган сана: {format(new Date(birthday), "dd/MM/yyyy")}</p>
                                        <p className="font-semibold mb-4">Яшаш манзили: {address}</p>
                                    </div>

                                    <div className=" hidden print:flex gap-2 text-base bg-gray-100 p-1 print:mb-4">
                                        <span className="font-bold ">{item.service_name}</span> - <span>{toLocale(item.service_price)} сўм тўланди</span>
                                    </div>

                                    {/* bottom */}
                                    <div className="hidden print:flex gap-20">
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