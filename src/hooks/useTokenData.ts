import { useMutation } from "@tanstack/react-query"
import { fetchData } from "../axios/global-instances"
import { LoginFormValuesProps } from "../types/formikTypes"

const tokenUrl = "/api/auth/token/login/"

const login = async (inputData: LoginFormValuesProps): Promise<any> => {
    const { data } = await fetchData.post(tokenUrl, inputData)
    return data
}

export const useTokenGetData = () => {
    return useMutation<any, Error, LoginFormValuesProps>((data) => login(data), {

        // onSuccess
        onSuccess: ({ data }) => {
            console.log(data)
        },

        // onError
        onError: (error) => {
            console.log(error)
        },

    })
}
