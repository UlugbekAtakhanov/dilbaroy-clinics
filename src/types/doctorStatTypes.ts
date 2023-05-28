import { PatientProps } from "./patientTypes";

export interface DoctorStatProps {
    id: number,
    full_name: string,
    patients: PatientProps[]
}