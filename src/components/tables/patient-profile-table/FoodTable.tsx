import { useRef } from "react"
import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { usePatientStore } from "../../../zustand/PatientStore"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { useReactToPrint } from "react-to-print"

interface FoodTableProps {
    patient: PatientProps
    edit: boolean
    extraFoodAmount: number
}

const FoodTable = ({ patient, edit, extraFoodAmount }: FoodTableProps) => {
    const printTableRef = useRef(null)
    const { incFoodDuration, decFoodDuration } = usePatientStore(state => state)
    const { food_duration, food_amount, food_refund, full_name, phone_number } = patient

    const printHandler = useReactToPrint({
        content: () => printTableRef.current ? printTableRef?.current : null,
        documentTitle: "table",
    })

    return (
        <div className="mb-20">

            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Таомлар буйича маълумот
                <button onClick={printHandler} className='self-end button-green'><PrinterIcon className='w-6 text-white' /></button>
            </h1>

            <div ref={printTableRef} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px]">
                <div className="hidden print:block">
                    <h1 className="font-bold text-lg text-left flex items-center gap-2">{full_name}</h1>
                    <p className="text-gray-500 font-semibold mb-4">{phone_number}</p>
                </div>

                <table className="w-full">
                    <caption className="text-lg font-bold text-left hidden print:table-caption">Taom</caption>
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

        </div>
    )
}

export default FoodTable