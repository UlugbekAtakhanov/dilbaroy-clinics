import { useParams } from "react-router-dom"
import MainTable from "../../components/tables/patient-profile-table/MainTable"
import { useSinglePatientGetData } from "../../hooks/usePatientsData"
import Spinner from "../../components/spinner/Spinner"
import RoomTable from "../../components/tables/patient-profile-table/RoomTable"
import FoodTable from "../../components/tables/patient-profile-table/FoodTable"
import ServicesTable from "../../components/tables/patient-profile-table/ServicesTable"

const PatientProfile = () => {
    const params = useParams()
    const { data, isLoading } = useSinglePatientGetData({ patientId: params?.patientId })
    const patient = data?.data[0]
    console.log(patient)

    if (isLoading) return <Spinner />
    return (
        <div className="p-4 pb-60">
            <h1 className='text-2xl text-center font-semibold mb-12'>Беморнинг маълумотлари</h1>

            <MainTable patient={patient} />

            <RoomTable patient={patient} />


            <div className="grid grid-cols-2 gap-4">
                <FoodTable patient={patient} />
                <ServicesTable patient={patient} />
            </div>

        </div>
    )
}

export default PatientProfile