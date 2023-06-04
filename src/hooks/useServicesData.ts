import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"

const serviceUrl = "/api/xizmatlar/"
const roomServicesUrl = "/api/room_services/"
const foodUrl = "/api/food/"

export const useServicesGetData = () => {
    return useQuery(["services"], () => fetchData.get(serviceUrl), {

        // onSuccess
        onSuccess: () => { },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}

export const useRoomServicesGetData = () => {
    return useQuery(["room_services"], () => fetchData.get(roomServicesUrl), {

        // onSuccess
        onSuccess: () => { },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}
export const useFoodGetData = () => {
    return useQuery(["room_services"], () => fetchData.get(foodUrl), {

        // onSuccess
        onSuccess: () => { },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}
