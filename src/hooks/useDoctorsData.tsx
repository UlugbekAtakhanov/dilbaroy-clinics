import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"

const doctorUrl = "/api/doctor/"

export const useDoctorsGetData = () => {
    return useQuery(["doctors"], () => fetchData.get(doctorUrl), {
        // onSuccess
        onSuccess: ({ data }) => {
            // console.log(data)
        },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}
