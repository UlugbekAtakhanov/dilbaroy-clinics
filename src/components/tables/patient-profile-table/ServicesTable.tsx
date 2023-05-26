import { PatientProps } from "../../../types/patientTypes"

interface ServicesTableProps {
    patient: PatientProps
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const {  } = patient
    return (
        <div>

            <table className="w-1/2 mb-20">
                <caption className="font-bold text-lg mb-4 text-left">Taomlar buyicha ma'lumot</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400">EKG Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Rentgen Тўланган сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400 text-center"></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ServicesTable