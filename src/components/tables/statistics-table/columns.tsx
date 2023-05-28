import { DoctorStatProps } from "../../../types/doctorStatTypes";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";

export const COLUMNS = [
    {
        Header: "Шифокор Ф.И.О.",
        accessor: (data: DoctorStatProps) => [data.full_name]
    },
    {
        Header: "Палатага ётқизилган беморлар сони",
        accessor: (data: DoctorStatProps) => [data.patients.length],
        Cell: ({ row: { original } }: any) => {
            return <p className="text-center">{toLocale(original.patients.length)}</p>
        }
    },
    {
        Header: "Умумий сумма",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.total_amount
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
    {
        Header: "Қайтарилди",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.total_refund
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
    {
        Header: "Палатадан тушган пул",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.room_amount
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
    {
        Header: "Таомдан тушган пул",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.food_amount
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
    {
        Header: "EKG дан тушган пул",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                const el = current.service.find(item => item.service_name === "EKG")?.service_price ?? 0
                return acc += el
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
    {
        Header: "Rentgen дан тушган пул",
        accessor: (data: DoctorStatProps) => [data.patients],
        Cell: ({ row: { original } }: any) => {
            const total = original.patients.reduce((acc: number, current: PatientProps) => {
                const el = current.service.find(item => item.service_name === "Rentgen")?.service_price ?? 0
                return acc += el
            }, 0)
            return <p className="text-center">{toLocale(total)}</p>
        }
    },
]