import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { format } from "date-fns"

const docStatsUrl = "/api/doctor_statistics/"

interface UseDoctorStatisticsGetDataProps {
    searchTerm?: { from: string, to: string }
}
// get all patients
export const useDoctorStatisticsGetData = ({ searchTerm }: UseDoctorStatisticsGetDataProps) => {
    const config = {
        params: {
            from_date: searchTerm?.from || format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), "yyyy-MM-dd"),
            to_date: searchTerm?.to || format(new Date(Date.now()), "yyyy-MM-dd"),
        }
    }

    return useQuery(["doc-statistics"], () => fetchData.get(docStatsUrl, config), {

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