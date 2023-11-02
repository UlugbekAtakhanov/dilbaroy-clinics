import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { useRef } from "react"

interface MainTableProps {
    patient: PatientProps
    extraMainAmount: number
    edit: boolean
}

const MainTable = ({ patient, extraMainAmount, edit }: MainTableProps) => {
    const { full_name, doctor: { full_name: doctor_full_name }, total_amount, total_refund } = patient
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div className="mb-20">

            <table className="w-2/3">
                <caption className="font-bold text-lg mb-4 text-left">Умумий маълумот</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400 text-left">Бемор Ф.И.О.</th>
                        <th className="p-1 border border-slate-400 text-left">Шифокор Ф.И.О.</th>
                        <th className="p-1 border border-slate-400">Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Қайтарилди</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400">
                            {edit ? <input type="text" ref={inputRef} /> : <span>{full_name}</span>}
                        </td>
                        <td className="p-1 border border-slate-400">{doctor_full_name}</td>
                        <td className="p-1 border border-slate-400 text-center">
                            {toLocale(total_amount)}
                            {extraMainAmount ? extraMainAmount > 0 ? (
                                <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">+{toLocale(extraMainAmount)}</span>
                            ) : extraMainAmount < 0 ? (
                                <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraMainAmount)}</span>
                            ) : null : null}
                        </td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(total_refund)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default MainTable