import { DoctorProps, RoomProps, ServiceProps } from "../pages/reception/Reception";

export interface PatientProps {
    address: string;
    birthday: string;
    created_date: string;
    doctor: DoctorProps;
    duration: number;

    food: boolean;
    food_amount: number;
    food_duration: number;
    food_refund: number;

    massaj1: boolean;
    massaj1_amount: number;
    massaj1_duration: number;
    massaj1_refund: number;

    massaj2: boolean;
    massaj2_amount: number;
    massaj2_duration: number;
    massaj2_refund: number;

    from_date: string;
    full_name: string;
    id: number;
    pass_data: string;
    phone_number: string;

    room: RoomProps;
    room_refund: number;
    room_status: boolean;
    room_amount: number;

    service: ServiceProps[];
    slug_name: string;
    total_amount: number;
    total_refund: number;

    is_frozen: boolean;
    frozen_days: number;

    is_paid: boolean;
}
