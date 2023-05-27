import { toLocale } from "../../../utils/toLocale"
import { PatientProps } from "../../../types/patientTypes"
import { format } from "date-fns"
import { daysInMiliseconds } from "../../../utils/daysInMiliseconds"
import { usePatientStore } from "../../../zustand/PatientStore"

interface RoomTableProps {
    patient: PatientProps,
    edit: boolean,
    extraRoomAmount: number
}

const RoomTable = ({ patient, edit, extraRoomAmount }: RoomTableProps) => {
    const { incDuration, decDuration } = usePatientStore(state => state)
    const { room_amount, room_refund, from_date, room: { room_number, room_price }, duration } = patient
    const fromDate = format(new Date(from_date), "dd/MM/yyyy - HH:mm")
    const toDate = format(new Date(new Date(from_date).getTime() + daysInMiliseconds(duration)), "dd/MM/yyyy - HH:mm")
    return (
        <div>

            <table className="w-full mb-20">
                <caption className="font-bold text-lg mb-4 text-left">Palatalar buyicha ma'lumot</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400">Палата </th>
                        <th className="p-1 border border-slate-400">Куни </th>
                        <th className="p-1 border border-slate-400 w-[280px]">Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Қайтарилди</th>
                        <th className="p-1 border border-slate-400">Вақтдан</th>
                        <th className="p-1 border border-slate-400">Вақтгача</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400 text-center">
                            <span className="font-bold">{room_number}</span> хона
                            <p className='text-xs'>
                                (кунига  <span className='font-semibold'>
                                    {toLocale(room_price)}
                                </span> минг сўм)
                            </p>
                        </td>

                        <td className="p-1 border border-slate-400 text-center">
                            <div className="flex items-center justify-center gap-3">
                                {edit ? (
                                    <>
                                        <button onClick={decDuration} className="sub-btn">-</button>
                                        {duration}
                                        <button onClick={incDuration} className="add-btn">+</button>
                                    </>
                                ) : duration}
                            </div>
                        </td>
                        
                        <td className="p-1 border border-slate-400 text-center">
                            {toLocale(room_amount)}
                            {extraRoomAmount ? extraRoomAmount > 0 ? (
                                <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">+{toLocale(extraRoomAmount)}</span>
                            ) : extraRoomAmount < 0 ? (
                                <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraRoomAmount)}</span>
                            ) : null : null}
                        </td>
                        
                        <td className="p-1 border border-slate-400 text-center">{toLocale(room_refund)}</td>
                        <td className="p-1 border border-slate-400 text-center">{fromDate}</td>
                        <td className="p-1 border border-slate-400 text-center">{toDate}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default RoomTable