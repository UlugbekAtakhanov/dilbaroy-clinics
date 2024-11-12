import { ArrowDownOnSquareIcon, NoSymbolIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import FoodTable from "../../components/tables/patient-profile-table/FoodTable";
import MainTable from "../../components/tables/patient-profile-table/MainTable";
import RoomTable from "../../components/tables/patient-profile-table/RoomTable";
import ServicesTable from "../../components/tables/patient-profile-table/ServicesTable";
import { usePatientStop, usePatientUpdate, useSinglePatientGetData } from "../../hooks/usePatientsData";
import { useRoomServicesGetData } from "../../hooks/useServicesData";
import { usePatientStore } from "../../zustand/PatientStore";
import Massaj1Table from "../../components/tables/patient-profile-table/Massaj1Table";
import Massaj2Table from "../../components/tables/patient-profile-table/Massaj2Table";
import { PatientProps } from "../../types/patientTypes";

export interface PatientUpdateProps {
    food_amount: number;
    food_duration: number;
    food_refund: number;

    massaj1_amount: number;
    massaj1_duration: number;
    massaj1_refund: number;

    massaj2_amount: number;
    massaj2_duration: number;
    massaj2_refund: number;

    room_amount: number;
    room_duration: number;
    room_refund: number;

    total_amount: number;
    total_refund: number;

    is_frozen?: boolean;
    frozen_days?: number;

    is_paid: boolean;
}

const PatientProfile = () => {
    const { data: roomServicesQuery, isLoading: roomServicesQueryIsLoading } = useRoomServicesGetData();
    const roomServices = roomServicesQuery?.data;
    const { patient, addPatient }: { patient: PatientProps; addPatient: (patient: PatientProps) => void } = usePatientStore();

    const [edit, setEdit] = useState<boolean>(false);

    const isPaidRef = useRef<HTMLInputElement>(null);

    const params = useParams();
    const { isLoading } = useSinglePatientGetData({ patientId: params?.patientId, addPatient });
    const { mutate: mutatePatientUpdate } = usePatientUpdate({ toast, setEdit, patientId: params?.patientId });
    const { mutate: mutatePatientStop } = usePatientStop({ toast, patientId: params?.patientId });

    if (isLoading || roomServicesQueryIsLoading || !patient) return <Spinner />;

    const extraRoomAmount = patient?.duration * patient?.room?.room_price - patient?.room_amount;
    const extraFoodAmount = patient?.food_duration * roomServices[0].price - patient?.food_amount;
    const extraMassaj1Amount = patient?.massaj1_duration * roomServices[1].price - patient?.massaj1_amount;
    const extraMassaj2Amount = patient?.massaj2_duration * roomServices[2].price - patient?.massaj2_amount;
    const extraMainAmount = extraRoomAmount + extraFoodAmount + extraMassaj1Amount + extraMassaj2Amount;

    // update data
    const changeHandler = () => {
        const data: PatientUpdateProps = {
            food_amount: patient.food_amount,
            food_duration: patient.food_duration,
            food_refund: patient.food_refund,

            massaj1_amount: patient.massaj1_amount,
            massaj1_duration: patient.massaj1_duration,
            massaj1_refund: patient.massaj1_refund,

            massaj2_amount: patient.massaj2_amount,
            massaj2_duration: patient.massaj2_duration,
            massaj2_refund: patient.massaj2_refund,

            room_amount: patient.room_amount,
            room_duration: patient.duration,
            room_refund: patient.room_refund,

            total_amount: patient.total_amount,
            total_refund: patient.total_refund,

            is_paid: isPaidRef.current?.checked || false,
        };

        data.food_amount += extraFoodAmount;
        data.massaj1_amount += extraMassaj1Amount;
        data.massaj2_amount += extraMassaj2Amount;

        data.room_amount += extraRoomAmount;
        data.total_amount += extraRoomAmount + extraFoodAmount + extraMassaj1Amount + extraMassaj2Amount;

        if (extraRoomAmount < 0) {
            data.room_refund += extraRoomAmount;
            data.total_refund += extraRoomAmount;
        }
        if (extraFoodAmount < 0) {
            data.food_refund += extraFoodAmount;
            data.total_refund += extraFoodAmount;
        }
        if (extraMassaj1Amount < 0) {
            data.massaj1_refund += extraMassaj1Amount;
            data.total_refund += extraMassaj1Amount;
        }
        if (extraMassaj2Amount < 0) {
            data.massaj2_refund += extraMassaj2Amount;
            data.total_refund += extraMassaj2Amount;
        }
        // console.log(data);
        mutatePatientUpdate(data);
    };

    // stop handler
    const stopHandler = () => {
        mutatePatientStop();
    };

    return (
        <div className="p-4 pb-60 ">
            <h1 className="text-2xl w-max mx-auto font-semibold mb-12">Беморнинг маълумотлари</h1>

            <MainTable patient={patient} edit={edit} extraMainAmount={extraMainAmount} />

            <RoomTable patient={patient} edit={edit} extraRoomAmount={extraRoomAmount} />

            <FoodTable patient={patient} edit={edit} extraFoodAmount={extraFoodAmount} />

            <Massaj1Table patient={patient} edit={edit} extraMassaj1Amount={extraMassaj1Amount} />

            <Massaj2Table patient={patient} edit={edit} extraMassaj2Amount={extraMassaj2Amount} />

            {patient.service.length ? <ServicesTable patient={patient} /> : null}

            <label className="flex flex-row gap-2 items-start mb-12">
                <input disabled={!edit} type="checkbox" defaultChecked={patient?.is_paid} ref={isPaidRef} className="mt-1" />
                <div>
                    <p>Тўланган </p>
                    {patient?.is_paid ? (
                        <p className="text-xs text-slate-400">Ҳизмат ҳаққи тўланган</p>
                    ) : (
                        <p className="text-xs text-slate-400">Ҳизмат ҳаққи тўланмаган</p>
                    )}
                </div>
            </label>

            <div className="flex justify-between">
                <button onClick={stopHandler} className="button-red bg-cblue flex gap-1 items-center">
                    <NoSymbolIcon className="w-6" />
                    Тугатилсун
                </button>
                {edit ? (
                    <>
                        <button onClick={changeHandler} className="button-green flex gap-1 items-center">
                            <ArrowDownOnSquareIcon className="w-6" />
                            Маълумотларни сақлаш
                        </button>
                    </>
                ) : (
                    <button onClick={() => setEdit(true)} className="button-red flex gap-1 items-center">
                        <PencilSquareIcon className="w-6" />
                        Ўзгартириш киритиш
                    </button>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
