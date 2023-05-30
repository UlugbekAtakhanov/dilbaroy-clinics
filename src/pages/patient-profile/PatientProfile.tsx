import { ArrowDownOnSquareIcon, NoSymbolIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Spinner from "../../components/spinner/Spinner"
import FoodTable from "../../components/tables/patient-profile-table/FoodTable"
import MainTable from "../../components/tables/patient-profile-table/MainTable"
import RoomTable from "../../components/tables/patient-profile-table/RoomTable"
import ServicesTable from "../../components/tables/patient-profile-table/ServicesTable"
import { usePatientStop, usePatientUpdate, useSinglePatientGetData } from "../../hooks/usePatientsData"
import { useFoodGetData } from "../../hooks/useServicesData"
import { usePatientStore } from "../../zustand/PatientStore"

export interface PatientUpdateProps {
    food_amount: number
    food_duration: number
    food_refund: number

    room_amount: number
    room_duration: number
    room_refund: number

    total_amount: number
    total_refund: number
}

const PatientProfile = () => {
    const { data: foodData, isLoading: foodIsLoading } = useFoodGetData()
    const { patient, addPatient } = usePatientStore(state => state)

    const [edit, setEdit] = useState<boolean>(false)

    const params = useParams()
    const { isLoading } = useSinglePatientGetData({ patientId: params?.patientId, addPatient })
    const { mutate: mutatePatientUpdate } = usePatientUpdate({ toast, setEdit, patientId: params?.patientId, })
    const { mutate: mutatePatientStop } = usePatientStop({ toast, patientId: params?.patientId })


    if (isLoading || foodIsLoading || !patient) return <Spinner />


    const extraRoomAmount = patient?.duration * patient?.room?.room_price - patient?.room_amount
    const extraFoodAmount = patient?.food_duration * foodData?.data[0].food_price - patient?.food_amount
    const extraMainAmount = extraRoomAmount + extraFoodAmount

    // update data
    const changeHandler = () => {
        const data: PatientUpdateProps = {
            food_amount: patient.food_amount,
            food_duration: patient.food_duration,
            food_refund: patient.food_refund,

            room_amount: patient.room_amount,
            room_duration: patient.duration,
            room_refund: patient.room_refund,

            total_amount: patient.total_amount,
            total_refund: patient.total_refund
        }
        data.room_amount += extraRoomAmount
        data.food_amount += extraFoodAmount
        data.total_amount += extraRoomAmount + extraFoodAmount
        if (extraRoomAmount < 0) {
            data.room_refund += extraRoomAmount
            data.total_refund += extraRoomAmount
        }
        if (extraFoodAmount < 0) {
            data.food_refund += extraFoodAmount
            data.total_refund += extraFoodAmount
        }
        // console.log(data)
        mutatePatientUpdate(data)
    }

    // stop handler
    const stopHandler = () => {
        mutatePatientStop()
    }


    return (
        <div className="p-4 pb-60 ">
            <h1 className='text-2xl w-max mx-auto font-semibold mb-12'>Беморнинг маълумотлари</h1>

            <MainTable patient={patient} extraMainAmount={extraMainAmount} />

            <RoomTable patient={patient} edit={edit} extraRoomAmount={extraRoomAmount} />

            <FoodTable patient={patient} edit={edit} extraFoodAmount={extraFoodAmount} />

            {patient.service.length ? <ServicesTable patient={patient} /> : null}

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
    )
}

export default PatientProfile