import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"

const serviceUrl = "/api/xizmatlar/"

export const useServicesGetData = () => {
    return useQuery(["services"], () => fetchData.get(serviceUrl), {

        // onSuccess
        onSuccess: ({ data }) => {
            
        },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}
