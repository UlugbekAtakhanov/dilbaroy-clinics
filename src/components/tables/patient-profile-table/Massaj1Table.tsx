import { useRef } from "react"
import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { usePatientStore } from "../../../zustand/PatientStore"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { useReactToPrint } from "react-to-print"
import { format } from "date-fns"
import qr from "../../../assets/qr.png"

interface Massaj1TableProps {
    patient: PatientProps
    edit: boolean
    extraMassaj1Amount: number
}

const Massaj1Table = ({ patient, edit, extraMassaj1Amount }: Massaj1TableProps) => {
    const printTableRef = useRef(null)
    const { incMassaj1Duration, decMassaj1Duration } = usePatientStore(state => state)
    const { id, birthday, address, massaj1_duration, massaj1_amount, massaj1_refund, full_name, phone_number } = patient

    const printHandler = useReactToPrint({
        content: () => printTableRef.current ? printTableRef?.current : null,
        documentTitle: "table",
    })

    return (
        <div className="mb-20">

            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Катталар учун массаж
                <button onClick={printHandler} className='self-end button-green'><PrinterIcon className='w-6 text-white' /></button>
            </h1>

            <div ref={printTableRef} className="print:w-[95%] print:mx-auto print:mt-4 print:text-[12px] logo-bg">
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

                <table className="w-full print:mb-4">
                    <thead>
                        <tr>
                            <th className="p-1 border border-slate-400">Катталар учун массаж </th>
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

                {/* bottom */}
                <div className="hidden print:flex gap-2 justify-between">
                    <div className="print:flex gap-2">
                        <h1 className="font-semibold">Мурожаат учун тел: </h1>
                        <div>
                            <div>📞+998692330753</div>
                            <div>📞+998975640010</div>
                            <div>📞+998945070222</div>
                        </div>
                    </div>
                    <div className="w-[100px]">
                        <img src={qr} alt="img" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Massaj1Table