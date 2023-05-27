import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { usePatientStore } from "../../../zustand/PatientStore"

interface FoodTableProps {
    patient: PatientProps
    edit: boolean
    extraFoodAmount: number
}

const FoodTable = ({ patient, edit, extraFoodAmount }: FoodTableProps) => {
    const { incFoodDuration, decFoodDuration } = usePatientStore(state => state)
    const { food_duration, food_amount, food_refund } = patient
    return (
        <div>

            <table className="w-full">
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

                        <td className="p-1 border border-slate-400 text-center">
                            <div className="flex items-center justify-center gap-3">
                                {edit ? (
                                    <>
                                        <button onClick={decFoodDuration} className="sub-btn">-</button>
                                        {food_duration}
                                        <button onClick={incFoodDuration} className="add-btn">+</button>
                                    </>
                                ) : food_duration}
                            </div>
                        </td>

                        <td className="p-1 border border-slate-400 text-center w-[180px]">
                            {toLocale(food_amount)}
                            {extraFoodAmount ? extraFoodAmount > 0 ? (
                                <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">+{toLocale(extraFoodAmount)}</span>
                            ) : extraFoodAmount < 0 ? (
                                <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraFoodAmount)}</span>
                            ) : null : null}
                        </td>

                        <td className="p-1 border border-slate-400 text-center">{toLocale(food_refund)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default FoodTable