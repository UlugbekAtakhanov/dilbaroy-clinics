import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"

interface FoodTableProps {
    patient: PatientProps
}

const FoodTable = ({ patient }: FoodTableProps) => {
    const { food_duration, food_amount, food_refund } = patient
    return (
        <div>

            <table className="w-full mb-20">
                <caption className="font-bold text-lg mb-4 text-left">Taomlar buyicha ma'lumot</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400">Taom </th>
                        <th className="p-1 border border-slate-400">Куни </th>
                        <th className="p-1 border border-slate-400">Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Қайтарилди</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400 text-center"></td>
                        <td className="p-1 border border-slate-400 text-center">{food_duration}</td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(food_amount)}</td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(food_refund)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default FoodTable