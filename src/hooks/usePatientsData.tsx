import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { FormValuesProps } from "../pages/reception/Reception"
import { format } from "date-fns"

const patientsUrl = "/api/register/"
// const singlePatientUrl = "/api/bemor/"

// const getPatientsByUrl = "/api/register/"
const getPatientsByUrl = "/api/patient_statistics/"

// const patientsLabUrl = "/api/analysis/"
// const patientLabAnalysisUrl = "/api/analysis/"

// const doctorConcUrl = "/api/external/"


interface UsePatientsGetDataProps {
    refetch?: { enabled: boolean },
    searchTerm?: { from: string, to: string }
}

// get all patients
export const usePatientsGetData = ({ searchTerm }: UsePatientsGetDataProps) => {
    // export const usePatientsGetData = ({ dispatch, searchTerm, serviceSearchParamsTerm, doctorSearchParamsTerm, refetch, navigate }) => {
    // console.log(searchTerm)
    const config = {
        params: {
            from_date: searchTerm?.from || format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), "yyyy-MM-dd"),
            to_date: searchTerm?.to || format(new Date(Date.now()), "yyyy-MM-dd"),
        }
    }


    return useQuery(["patients"], () => fetchData.get(getPatientsByUrl, config), {

        // onSuccess
        onSuccess: () => {
            // dispatch(addPatients(data))
            // if (searchTerm?.service === "Barchasi" && searchTerm?.doctor === "Barchasi") {
            //     navigate(`/reception/list`)
            // }
        },

        // onError
        onError: (error) => {
            console.log(error)
        },

        // transform data
        // select: (data) => {
        //     const newData = data?.data?.info.reduce((acc, current) => {
        //         if (doctorSearchParamsTerm && doctorSearchParamsTerm !== "Barchasi") {
        //             acc.data = [...acc.data, { ...current, doctorSearchParamsTerm }]
        //             acc.total = acc.total + parseFloat(current.doctor?.price)
        //         } else if (serviceSearchParamsTerm) {
        //             const servArr = current.service.filter(s => s.id == serviceSearchParamsTerm)
        //             acc.data = [...acc.data, { ...current, service: servArr, serviceSearchParamsTerm }]
        //             acc.total = servArr.length ? acc.total + parseFloat(servArr[0]?.service_price) : acc.total
        //         } else {
        //             acc.data = [...acc.data, { ...current, serviceSearchParamsTerm }]
        //             if (current.service.length) {
        //                 current.service.forEach(item => {
        //                     acc.total += item.service_price
        //                 })
        //             }
        //             if (current.room) {
        //                 acc.total += current.room.room_price * current.duration
        //             }
        //             if (current.doctor) {
        //                 acc.total += current.doctor.price
        //             }
        //         }
        //         return acc
        //     }, { data: [], total: 0 })
        //     return newData
        // },

        // enabled: refetch?.enabled,
        refetchOnWindowFocus: false
    })
}



interface UsePatientsCreateDataProps {
    toast: any
}
// create a patient
export const usePatientsCreateData = ({ toast }: UsePatientsCreateDataProps) => {

    return useMutation<any, Error, FormValuesProps>((data) => fetchData.post(patientsUrl, data), {
        // onSuccess
        onSuccess: () => {
            toast.success("Added succesfully")
        },

        // onError
        onError: (error) => {
            toast.error("Hatolik yuz berdi, qaytadan kiriting")
            console.log(error)
        },
    })
}




// get a single patient
// export const useSinglePatientGetData = (patientId) => {

//     return useQuery(["patients", patientId], () => fetchData.get(`${singlePatientUrl}${patientId}/`), {
//         // onSuccess
//         onSuccess: ({ data }) => {
//             // console.log(data)
//         },

//         // onError
//         onError: (error) => {
//             console.log(error)
//         },

//         // refetchOnWindowFocus: false
//     })
// }




// get all lab patients
// export const useLabPatientsGetData = ({ dispatch, searchTerm, serviceSearchParamsTerm, refetch, navigate }) => {

//     const config = {
//         params: {
//             rejim: searchTerm?.rejim || "Rejim",
//             from: searchTerm?.from || format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), "yyyy-MM-dd"),
//             to: searchTerm?.to || format(new Date(Date.now()), "yyyy-MM-dd"),
//             service: searchTerm?.service || "Barchasi",
//             doctor: searchTerm?.doctor || "Barchasi"
//         }
//     }

//     return useQuery(["lab-patients"], () => fetchData.get(patientsUrlBy, config), {

//         // onSuccess
//         onSuccess: ({ data }) => {
//             dispatch(addPatients(data))
//             if (searchTerm?.service === "Barchasi") {
//                 navigate(`/labarant`)
//             }
//         },

//         // onError
//         onError: (error) => {
//             console.log(error)
//         },

//         // transform data
//         select: (data) => {
//             const newData = data?.data?.info.reduce((acc, current) => {
//                 if (serviceSearchParamsTerm) {
//                     const servArr = current.service.filter(s => s.id == serviceSearchParamsTerm)
//                     // console.log(servArr)
//                     acc.data = [...acc.data, { ...current, service: servArr, serviceSearchParamsTerm }]
//                     acc.total = servArr.length ? acc.total + parseFloat(servArr[0]?.service_price) : acc.total
//                 } else {
//                     acc.data = [...acc.data, { ...current, serviceSearchParamsTerm }]
//                     if (current.service.length) {
//                         current.service.forEach(item => {
//                             acc.total += item.service_price
//                         })
//                     }
//                     if (current.room) {
//                         acc.total += current.room.room_price * current.duration
//                     }
//                     if (current.doctor) {
//                         acc.total += current.doctor.price
//                     }
//                 }
//                 return acc
//             }, { data: [], total: 0 })

//             return newData
//         },

//         enabled: refetch?.enabled,
//         refetchOnWindowFocus: false
//     })
// }

// lab analysis update
// export const useLabPatientAnalysisUpdate = () => {
//     return useMutation((data) => fetchData.put(`${patientLabAnalysisUrl}`, data, {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }), {

//         // onSuccess
//         onSuccess: (data) => {
//             console.log(data)
//         },

//         // onError
//         onError: (error) => {
//             console.log(error)
//         },
//     })
// }




// get all doctor patients
// export const useDoctorPatientsGetData = ({ dispatch, searchTerm, serviceSearchParamsTerm, refetch, navigate }) => {

//     const config = {
//         params: {
//             rejim: searchTerm?.rejim || "Rejim",
//             from: searchTerm?.from || format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), "yyyy-MM-dd"),
//             to: searchTerm?.to || format(new Date(Date.now()), "yyyy-MM-dd"),
//             service: searchTerm?.service || "Barchasi",
//             doctor: searchTerm?.doctor || "Barchasi"
//         }
//     }

//     return useQuery(["doc-patients"], () => fetchData.get(patientsUrlBy, config), {

//         // onSuccess
//         onSuccess: ({ data }) => {
//             dispatch(addPatients(data))
//             if (searchTerm?.service === "Barchasi") {
//                 navigate(`/doctor`)
//             }
//         },

//         // onError
//         onError: (error) => {
//             console.log(error)
//         },

//         // transform data
//         select: (data) => {
//             const newData = data?.data?.info.reduce((acc, current) => {
//                 if (serviceSearchParamsTerm) {
//                     const servArr = current.service.filter(s => s.id == serviceSearchParamsTerm)
//                     acc.data = [...acc.data, { ...current, service: servArr, serviceSearchParamsTerm }]
//                     acc.total = servArr.length ? acc.total + parseFloat(servArr[0]?.service_price) : acc.total
//                 } else {
//                     acc.data = [...acc.data, { ...current, serviceSearchParamsTerm }]
//                     if (current.service.length) {
//                         current.service.forEach(item => {
//                             acc.total += item.service_price
//                         })
//                     }
//                     if (current.room) {
//                         acc.total += current.room.room_price * current.duration
//                     }
//                     if (current.doctor) {
//                         acc.total += current.doctor.price
//                     }
//                 }
//                 return acc
//             }, { data: [], total: 0 })

//             return newData
//         },

//         enabled: refetch?.enabled,
//         refetchOnWindowFocus: false
//     })
// }

// doctor conclusion update
// export const useDocPatientConclusionUpdate = () => {
//     return useMutation((data) => fetchData.post(`${doctorConcUrl}`, data, {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }), {

//         // onSuccess
//         onSuccess: (data) => {
//             console.log(data)
//         },

//         // onError
//         onError: (error) => {
//             console.log(error)
//         },
//     })
// }


