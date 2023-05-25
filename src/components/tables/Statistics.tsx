import { Row } from "react-table"
import { PatientProps } from "../../types/patientTypes"

interface StatisticsProps {
    rows: Row<PatientProps>[]
}
const Statistics = ({ rows }: StatisticsProps) => {
    return (
        <>
            <div className=' flex gap-1 items-center p-1'>
                <span className='text-xs font-semibold'>Беморлар сони:</span>
                <span className='text-sm font-bold leading-[23px]'>{rows.length}</span>
            </div>
        </>
    )
}

export default Statistics