import { DoctorStatProps } from "../../../types/doctorStatTypes";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";

export const COLUMNS = [
    {
        Header: "Шифокор Ф.И.О.",
        accessor: (data: DoctorStatProps) => data.full_name
    },
    {
        Header: "Палатага ётқизилган беморлар сони",
        accessor: (data: DoctorStatProps) => data.patients.length,
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "Умумий сумма",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.total_amount
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "Қайтарилди",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.total_refund
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "Палатадан тушган пул",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.room_amount
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "Таомдан тушган пул",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                return acc += current.food_amount
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "EKG дан тушган пул",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                const el = current.service.find(item => item.service_name === "EKG")?.service_price ?? 0
                return acc += el
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
    {
        Header: "Rentgen дан тушган пул",
        accessor: (data: DoctorStatProps) => {
            const total = data.patients.reduce((acc: number, current: PatientProps) => {
                const el = current.service.find(item => item.service_name === "Rentgen")?.service_price ?? 0
                return acc += el
            }, 0)
            return total
        },
        Cell: (data: any) => {
            const value = data.cell.value
            return <p className="text-center">{toLocale(value)}</p>
        }
    },
]