import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { addStaff } from "../redux/staffSlice"
import { clearLS } from "../utils/localStorage"

const positionUrl = "/api/ishchi/"

export const usePositionData = (dispatch, navigate) => {
    return useQuery(["position"], () => fetchData.post(positionUrl), {

        // onSuccess
        onSuccess: ({ data }) => {
            dispatch(addStaff({ ...data.info, last_id: data.last_id }))
        },

        // onError
        onError: (error) => {
            console.log(error)
            clearLS()
            navigate("/login")
        },

        refetchOnWindowFocus: false,
        staleTime: 100000
    })
}
