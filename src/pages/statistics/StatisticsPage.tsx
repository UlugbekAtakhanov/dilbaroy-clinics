import RoomStatisticsTable from "../../components/tables/room-statistics-table/RoomStatisticsTable"
import StatisticsTable from "../../components/tables/statistics-table/StatisticsTable"

const StatisticsPage = () => {
    return (
        <div className="text-2xl">
            <StatisticsTable />
            <RoomStatisticsTable />
        </div>
    )
}

export default StatisticsPage