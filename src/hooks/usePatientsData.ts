import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { FormValuesProps } from "../pages/reception/Reception"
import { format } from "date-fns"
import { PatientProps } from "../types/patientTypes"
import { PatientUpdateProps } from "../pages/patient-profile/PatientProfile"
import { NavigateFunction } from "react-router-dom"

const patientsUrl = "/api/register/"
const getPatientsByUrl = "/api/patient_statistics/"

const singlePatientUrl = "/api/bemor/"
const singlePatientStopUrl = "/api/close_room/"



interface UsePatientsGetDataProps {
    searchTerm?: { from: string, to: string }
}
// get all patients
export const usePatientsGetData = ({ searchTerm }: UsePatientsGetDataProps) => {
    const config = {
        params: {
            from_date: searchTerm?.from || format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), "yyyy-MM-dd"),
            to_date: searchTerm?.to || format(new Date(Date.now()), "yyyy-MM-dd"),
        }
    }

    return useQuery(["patients"], () => fetchData.get(getPatientsByUrl, config), {

        // onSuccess
        onSuccess: () => { },

        // onError
        onError: (error) => {
            console.log(error)
        },

        // enabled: refetch?.enabled,
        refetchOnWindowFocus: false
    })
}



interface UsePatientsCreateDataProps {
    toast: any,
    navigate: NavigateFunction
}
// create a patient
export const usePatientsCreateData = ({ toast, navigate }: UsePatientsCreateDataProps) => {

    return useMutation<any, Error, FormValuesProps>((data) => fetchData.post(patientsUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data)
            toast.success("Маълумотлар мувафақиятли киритилди")
            navigate(`/patients/${data.data.id}/${data.data.slug_name}`)
        },

        // onError
        onError: (error) => {
            toast.error("Хатолик юз берди, қайтадан киритинг")
            console.log(error)
        },
    })
}



interface UseSinglePatientGetDataProps {
    patientId: string | undefined,
    addPatient: (patient: PatientProps) => void
}
// get a single patient
export const useSinglePatientGetData = ({ patientId, addPatient }: UseSinglePatientGetDataProps) => {

    return useQuery(["patients", patientId], () => fetchData.get(`${singlePatientUrl}${patientId}/`), {
        // onSuccess
        onSuccess: ({ data }) => {
            addPatient(data[0])
        },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false
    })
}


interface UsePatientUpdateProps {
    toast: any
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    patientId: string | undefined,
}
// patient update
export const usePatientUpdate = ({ toast, setEdit, patientId }: UsePatientUpdateProps) => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, PatientUpdateProps>((data) => fetchData.put(`${singlePatientUrl}${patientId}/`, data), {

        // onSuccess
        onSuccess: () => {
            toast.success("Маълумотлар мувафақиятли янгиланди")
            queryClient.invalidateQueries(["patients", patientId])
            setEdit(false)
        },

        // onError
        onError: (error) => {
            console.log(error)
            toast.error("Хатолик юз берди, қайтадан киритинг")
        },
    })
}


interface UsePatientStopProps {
    toast: any
    patientId: string | undefined,
}
// patient stop
export const usePatientStop = ({ toast, patientId }: UsePatientStopProps) => {
    return useMutation(() => fetchData.post(`${singlePatientStopUrl}`, { patient_id: patientId }), {

        // onSuccess
        onSuccess: () => {
            toast.success("Мувафақиятли тугатилди")
        },

        // onError
        onError: (error) => {
            console.log(error)
            toast.error("Хатолик юз берди")
        },
    })
}



