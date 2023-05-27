import { PatientProps } from "../../../types/patientTypes"
import { toLocale } from "../../../utils/toLocale"

interface ServicesTableProps {
    patient: PatientProps
}

const ServicesTable = ({ patient }: ServicesTableProps) => {
    const { service } = patient
    const rentgen = service.find(item => item.service_name === "Rentgen")?.service_price ?? 0
    const ekg = service.find(item => item.service_name === "EKG")?.service_price ?? 0
    return (
        <div>

            <table className="w-full">
                <caption className="font-bold text-lg mb-4 text-left">Boshqa ma'lumotlar</caption>
                <thead>
                    <tr>
                        <th className="p-1 border border-slate-400">EKG Тўланган сумма</th>
                        <th className="p-1 border border-slate-400">Rentgen Тўланган сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(ekg)}</td>
                        <td className="p-1 border border-slate-400 text-center">{toLocale(rentgen)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ServicesTable