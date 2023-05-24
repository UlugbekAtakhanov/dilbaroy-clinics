import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"

const roomsUrl = "/api/xonalar/"

export const useRoomsGetData = () => {
    return useQuery(["rooms"], () => fetchData.get(roomsUrl), {

        // onSuccess
        onSuccess: () => { },

        // onError
        onError: (error) => {
            console.log(error)
        },

        refetchOnWindowFocus: false,
    })
}
