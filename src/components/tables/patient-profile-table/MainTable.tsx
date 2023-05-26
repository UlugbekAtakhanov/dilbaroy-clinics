import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"

interface MainTableProps {
    patient: PatientProps
}

const MainTable = ({ patient }: MainTableProps) => {
    const { full_name, doctor: { full_name: doctor_full_name }, total_amount, total_refund } = patient
    return (
        <div className="mb-20">

            <table className="w-2/3">
                <caption className="font-bold text-lg mb-4 text-left">Umumiy ma'lumot</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400 text-left">Бемор Ф.И.О.</th>
                        <th className="p-1 border border-slate-400 text-left">Шифокор </th>
                        <th className="p-1 border border-slate-400">Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Қайтарилди</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400">{full_name}</td>
                        <td className="p-1 border border-slate-400">{doctor_full_name}</td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(total_amount)}</td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(total_refund)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default MainTable