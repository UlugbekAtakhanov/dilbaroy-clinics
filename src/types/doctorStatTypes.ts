import { PatientProps } from "./patientTypes";

export interface DoctorStatProps {
    id: number,
    full_name: string,
    patients: PatientProps[]
}


export interface RoomStatProps {
    id: number
    patinets: number
    room_type: string
    total_sum: number
}