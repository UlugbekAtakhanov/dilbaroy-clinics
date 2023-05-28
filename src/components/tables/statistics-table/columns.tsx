import { PatientProps } from "../../../types/patientTypes";
import { daysInMiliseconds, formatDate } from "../../../utils/daysInMiliseconds";

export const COLUMNS = [
    {
        Header: "Рўйхат рақами",
        accessor: (data: PatientProps) => [data.id],
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{`${original.id}/${new Date().getFullYear()}`}</p>
            </div>
        )
    },
    {
        Header: "Пасс. маълумоти",
        accessor: (data: PatientProps) => {
            if (data.birthday) return [data.pass_data, formatDate(new Date(data.birthday))]
        },
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{original.pass_data}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Tug'ilgan sana">{formatDate(new Date(original.birthday))}</p>
            </div>
        )
    },
    {
        Header: "Бемор Ф.И.О.",
        accessor: (data: PatientProps) => [data.full_name, data.phone_number],
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{original.full_name}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Telefon raqam">{original.phone_number}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Ish joyi">{original.workplace}</p>
            </div>
        )
    },
    {
        Header: "Палаталар",
        accessor: (data: PatientProps) => [data?.room?.room_number],
        Cell: ({ row: { original } }: any) => {
            const from = new Date(original.from_date).getTime()
            const to = new Date(original.from_date).getTime() + daysInMiliseconds(original.duration)
            const room_name = original?.room?.room_number.split(" ")[0]
            const currentDate = Date.now()
            const minus = Math.round(((currentDate - to) / (1000 * 60 * 60 * 24)))
            const plus = Math.round(((to - currentDate) / (1000 * 60 * 60 * 24)))

            return (
                <div>
                    {original.room_status ? (
                        <div className="flex gap-2 items-center">
                            <span>{room_name} хона</span>
                            <div className="bg-sky-200 text-sky-700 py-1 px-2 rounded-[30px] text-xs w-max">Тугатилди</div>
                        </div>
                    ) : (
                        <div>
                            {original?.room && (
                                <div className="flex gap-2 items-center">
                                    <span>{room_name} хона</span>
                                    {to < currentDate ? (
                                        <div className="bg-rose-200 text-rose-700 py-1 px-2 rounded-[30px] text-xs w-max">{minus} кун қарз</div>
                                    ) : (
                                        <div className="bg-green-200 text-green-700 py-1 px-2 rounded-[30px] text-xs w-max">{plus} кун ҳақ</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {original?.room && <p className="text-xs text-slate-400">{formatDate(from)} - {formatDate(to)}</p>}
                </div>
            )
        }
    },
    {
        Header: "Шифокор",
        accessor: (data: PatientProps) => [data?.doctor?.full_name],
        Cell: ({ row: { original } }: any) => {
            return (
                <div>
                    {original?.doctor && <p>{original.doctor.full_name}</p>}
                </div>
            )
        }
    },
]