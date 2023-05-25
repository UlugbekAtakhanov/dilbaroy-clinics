import { DoctorProps, RoomProps, RoomSectionProps } from "../pages/reception/Reception"

export interface PatientProps {
    address?: string,
    birthday?: string,
    created_date?: string,
    doctor?: DoctorProps,
    duration?: number,
    food?: boolean,
    food_amount?: number,
    food_duration?: number,
    food_refund?: number,
    from_date?: string,
    full_name?: string,
    id?: number,
    pass_data?: string,
    phone_number?: string,
    room?: RoomProps,
    room_refund?: number,
    room_status?: boolean,
    service?: RoomSectionProps[],
    slug_name?: string,
    total_amount?: number,
    total_refund?: number
}