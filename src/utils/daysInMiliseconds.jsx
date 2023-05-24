import { format } from "date-fns"

export const daysInMiliseconds = (n) => {
    return 1000 * 60 * 60 * 24 * n
}

export const formatDate = (date) => {
    return format(date, "dd/MM/yyyy")
}






