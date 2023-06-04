import { useRef } from "react"
import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { usePatientStore } from "../../../zustand/PatientStore"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { useReactToPrint } from "react-to-print"

interface Massaj1TableProps {
    patient: PatientProps
    edit: boolean
    extraMassaj1Amount: number
}

const Massaj1Table = ({ patient, edit, extraMassaj1Amount }: Massaj1TableProps) => {
    const printTableRef = useRef(null)
    const { incMassaj1Duration, decMassaj1Duration } = usePatientStore(state => state)
    const { massaj1_duration, massaj1_amount, massaj1_refund, full_name, phone_number } = patient

    const printHandler = useReactToPrint({
        content: () => printTableRef.current ? printTableRef?.current : null,
        documentTitle: "table",
    })

    return (
        <div className="mb-20">

            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Kattalar uchun massaj
                <button onClick={printHandler} className='self-end button-green'><PrinterIcon className='w-6 text-white' /></button>
            </h1>

            <div ref={printTableRef} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px]">
                <div className="hidden print:block">
                    <h1 className="font-bold text-lg text-left flex items-center gap-2">{full_name}</h1>
                    <p className="text-gray-500 font-semibold mb-4">{phone_number}</p>
                </div>

                <table className="w-full">
                    <caption className="text-lg font-bold text-left hidden print:table-caption">Kattalar uchun massaj</caption>
                    <thead>
                        <tr>
                            <th className="p-1 border border-slate-400">Куни </th>
                            <th className="p-1 border border-slate-400">Тўланган сумма</th>
                            <th className="p-1 border border-slate-400">Қайтарилди</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-1 border border-slate-400 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    {edit ? (
                                        <>
                                            <button onClick={decMassaj1Duration} className="sub-btn">-</button>
                                            {massaj1_duration}
                                            <button onClick={incMassaj1Duration} className="add-btn">+</button>
                                        </>
                                    ) : massaj1_duration}
                                </div>
                            </td>

                            <td className="p-1 border border-slate-400 text-center w-[180px]">
                                {toLocale(massaj1_amount)}
                                {extraMassaj1Amount ? extraMassaj1Amount > 0 ? (
                                    <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">+{toLocale(extraMassaj1Amount)}</span>
                                ) : extraMassaj1Amount < 0 ? (
                                    <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraMassaj1Amount)}</span>
                                ) : null : null}
                            </td>

                            <td className="p-1 border border-slate-400 text-center">{toLocale(massaj1_refund)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Massaj1Table