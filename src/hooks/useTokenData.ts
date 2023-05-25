import { useMutation } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { LoginFormValuesProps } from "../types/formikTypes"
import { addToLS } from "../utils/localStorage"
import { NavigateFunction } from "react-router-dom"

const tokenUrl = "/api/auth/token/login/"

const login = async (inputData: LoginFormValuesProps): Promise<any> => {
    const { data } = await fetchData.post(tokenUrl, inputData)
    return data
}


interface UseTokenGetDataProps {
    navigate: NavigateFunction
    toast?: any
}
export const useTokenGetData = ({ navigate, toast }: UseTokenGetDataProps) => {
    return useMutation<any, Error, LoginFormValuesProps>((data) => login(data), {

        // onSuccess
        onSuccess: (data) => {
            addToLS("token", data.auth_token)
            navigate("/reception")
        },

        // onError
        onError: (error) => {
            toast.error("Маълумотларни туғри киритинг")
            console.log(error)
        },

    })
}
