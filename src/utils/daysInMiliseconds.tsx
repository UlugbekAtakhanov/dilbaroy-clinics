import { format } from "date-fns"

export const daysInMiliseconds = (n: number) => {
    return 1000 * 60 * 60 * 24 * n
}

export const formatDate = (date: Date | number) => {
    return format(date, "dd/MM/yyyy")
}






