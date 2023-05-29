import { RoomStatProps } from "../../../types/doctorStatTypes";
import { toLocale } from "../../../utils/toLocale";

export const COLUMNS = [
    {
        Header: "Булим",
        accessor: (data: RoomStatProps) => [data.room_type]
    },
    {
        Header: "Беморлар сони",
        accessor: (data: RoomStatProps) => [data.patinets]
    },
    {
        Header: "Умумий сумма",
        accessor: (data: RoomStatProps) => [toLocale(data.total_sum)]
    },
]