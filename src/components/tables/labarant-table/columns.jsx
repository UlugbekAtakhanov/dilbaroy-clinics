import { daysInMiliseconds, formatDate } from "../../../utils/daysInMiliseconds";

export const COLUMNS = [
    {
        Header: "Рўйхат рақами",
        accessor: (data) => [data.id],
        Cell: ({ row: { original } }) => (
            <div>
                <p>{`${original.id}/${new Date().getFullYear()}`}</p>
            </div>
        )
    },
    {
        Header: "Пасс. маълумоти",
        accessor: (data) => [data.pass_data, formatDate(new Date(data.birthday))],
        Cell: ({ row: { original } }) => (
            <div>
                <p>{original.pass_data}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Tug'ilgan sana">{formatDate(new Date(original.birthday))}</p>
            </div>
        )
    },
    {
        Header: "Ф.И.О.",
        accessor: (data) => [data.full_name, data.phone_number, data.workplace],
        Cell: ({ row: { original } }) => (
            <div>
                <p>{original.full_name}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Telefon raqam">{original.phone_number}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Ish joyi">{original.workplace}</p>
            </div>
        )
    },
    {
        Header: "Палаталар",
        accessor: (data) => [data?.room?.room_number],
        Cell: ({ row: { original } }) => {
            const from = formatDate(new Date(original.created_date).getTime())
            const to = formatDate(new Date(original.created_date).getTime() + daysInMiliseconds(original.duration))
            const room_name = original?.room?.room_number.split(" ")[0]
            return (
                <div>
                    {original?.room && <p>{room_name} хона</p>}
                    {original?.room && <p className="text-xs text-slate-400">{from} - {to}</p>}
                </div>
            )
        }
    },
    {
        Header: "Тахлиллар",
        accessor: (data) => [data?.analysis_status],
        Cell: ({ row: { original } }) => {
            return (
                <div className="">
                    {!original.service.length ? "" : original.analysis_status ? (
                        <div className="bg-green-200 text-green-700 py-1 px-2 rounded-[30px] text-sm w-max">Тугатилди</div>
                    ) : (
                        <div className="bg-rose-200 text-rose-700 py-1 px-2 rounded-[30px] text-sm w-max">Жараёнда</div>
                    )}
                </div>
            )
        }
    },
    {
        Header: "Шифокор",
        accessor: (data) => [data?.doctor?.full_name],
        Cell: ({ row: { original } }) => {
            return (
                <div>
                    {original?.doctor && <p>{original.doctor.full_name}</p>}
                </div>
            )
        }
    },
    {
        Header: "Даво режими тури",
        accessor: (data) => [data.inspaction, , formatDate(new Date(data.created_date))],
        Cell: ({ row: { original } }) => (
            <div>
                <p>{original.inspaction}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Ro'yhatga olingan sana">{formatDate(new Date(original.created_date))}</p>
            </div>
        )
    },
]