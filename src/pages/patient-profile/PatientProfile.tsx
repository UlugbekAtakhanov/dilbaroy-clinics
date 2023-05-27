import { useState } from "react"
import { useParams } from "react-router-dom"
import MainTable from "../../components/tables/patient-profile-table/MainTable"
import { usePatientUpdate, useSinglePatientGetData } from "../../hooks/usePatientsData"
import Spinner from "../../components/spinner/Spinner"
import RoomTable from "../../components/tables/patient-profile-table/RoomTable"
import FoodTable from "../../components/tables/patient-profile-table/FoodTable"
import ServicesTable from "../../components/tables/patient-profile-table/ServicesTable"
import { usePatientStore } from "../../zustand/PatientStore"
import { useFoodGetData } from "../../hooks/useServicesData"
import toast from "react-hot-toast"


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
    const { mutate } = usePatientUpdate({ toast, setEdit, patientId: params?.patientId, })





    if (isLoading || foodIsLoading) return <Spinner />

    if (!patient) {
        throw new Error("There is no patient data")
    }

    const extraRoomAmount = patient?.duration * patient?.room?.room_price - patient?.room_amount
    const extraFoodAmount = patient?.food_duration * foodData?.data[0].food_price - patient?.food_amount
    const extraMainAmount = extraRoomAmount + extraFoodAmount

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
        data.total_refund += extraRoomAmount + extraFoodAmount
        if (extraRoomAmount < 0) {
            data.room_refund += extraRoomAmount
        }
        if (extraFoodAmount < 0) {
            data.food_refund += extraFoodAmount
        }
        console.log(data)
        mutate(data)
    }

    return (
        <div className="p-4 pb-60 ">
            <h1 className='text-2xl w-max mx-auto font-semibold mb-12'>Беморнинг маълумотлари</h1>

            <MainTable patient={patient} extraMainAmount={extraMainAmount} />

            <RoomTable patient={patient} edit={edit} extraRoomAmount={extraRoomAmount} />

            <div className="grid grid-cols-2 gap-4 mb-8">
                <FoodTable patient={patient} edit={edit} extraFoodAmount={extraFoodAmount} />
                <ServicesTable patient={patient} />
            </div>

            <div className="text-right">
                {edit ? (
                    <button onClick={changeHandler} className="button-green">Сақлаш</button>
                ) : (
                    <button onClick={() => setEdit(true)} className="button-red">Ўзгартириш киритиш</button>
                )}
            </div>

        </div>
    )
}

export default PatientProfile