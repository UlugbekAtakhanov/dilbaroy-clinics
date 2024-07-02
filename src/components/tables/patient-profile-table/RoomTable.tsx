import { PrinterIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";
import { usePatientStore } from "../../../zustand/PatientStore";

import qr from "../../../assets/qr.png";

interface RoomTableProps {
    patient: PatientProps;
    edit: boolean;
    extraRoomAmount: number;
}

const RoomTable = ({ patient, edit, extraRoomAmount }: RoomTableProps) => {
    const printTableRef = useRef(null);
    const { incDuration, decDuration } = usePatientStore((state) => state);
    const {
        birthday,
        address,
        room_amount,
        room_refund,
        from_date,
        room: { room_number, room_price, room_type, room_comfortable },
        doctor,
        duration,
        full_name,
        phone_number,
    } = patient;
    const fromDate = format(new Date(from_date), "dd/MM/yyyy");
    // const toDate = format(new Date(new Date(from_date).getTime() + daysInMiliseconds(duration - 1)), "dd/MM/yyyy");
    // const fromDate = format(new Date(from_date), "dd/MM/yyyy - HH:mm");
    // const toDate = format(new Date(new Date(from_date).getTime() + daysInMiliseconds(duration)), "dd/MM/yyyy - HH:mm");

    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    return (
        <div>
            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Палаталар буйича маълумот
                <button onClick={printHandler} className="self-end button-green">
                    <PrinterIcon className="w-6 text-white" />
                </button>
            </h1>

            <div
                ref={printTableRef}
                className="print:w-[95%] print:mx-auto print:mt-4 print:text-[14px] logo-bg print:border-2 print:border-black print:p-4"
            >
                {/* top */}
                <div className="hidden print:block text-center mb-2">
                    <h1 className="font-bold text-xl">Тўлов Чеки</h1>
                </div>

                {/* bottom */}
                <div className="hidden print:flex gap-12 mb-4">
                    <div className="border-l-2 border-black pl-2 ">
                        <h1 className="font-bold text-base">Бемор ҳақида маълумот:</h1>
                        <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                        <p className="font-semibold">{phone_number}</p>
                        <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                        <p className="font-semibold mb-4">{address}</p>
                    </div>

                    <div className=" border-l-2 border-black pl-2 ">
                        <h1 className="font-bold text-base">Доктор ҳақида маълумот:</h1>
                        <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                    </div>
                </div>

                {/* table */}
                <table className="w-full mb-20 print:mb-4">
                    <thead>
                        <tr>
                            <th className="p-1 border border-black w-[280px]">Палата </th>
                            <th className="p-1 border border-black">Куни </th>
                            <th className="p-1 border border-black">Вақтдан</th>
                            <th className="p-1 border border-black w-[280px]">Тўланган сумма</th>
                            <th className="p-1 border border-black">Қайтарилди</th>
                            {/* <th className="p-1 border border-black">Вақтгача</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-1 border border-black text-center">
                                <span className="font-bold">
                                    {room_type.room_type}({room_comfortable}) - {room_number} хона
                                </span>
                                <p className="text-xs">
                                    (кунига <span className="font-semibold">{toLocale(room_price)}</span> минг сўм)
                                </p>
                            </td>

                            <td className="p-1 border border-black text-center">
                                <div className="flex items-center justify-center gap-3">
                                    {edit ? (
                                        <>
                                            <button onClick={decDuration} className="sub-btn">
                                                -
                                            </button>
                                            {duration}
                                            <button onClick={incDuration} className="add-btn">
                                                +
                                            </button>
                                        </>
                                    ) : (
                                        duration
                                    )}
                                </div>
                            </td>

                            <td className="p-1 border border-black text-center">{fromDate}</td>

                            <td className="p-1 border border-black text-center">
                                {toLocale(room_amount)}
                                {extraRoomAmount ? (
                                    extraRoomAmount > 0 ? (
                                        <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">+{toLocale(extraRoomAmount)}</span>
                                    ) : extraRoomAmount < 0 ? (
                                        <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraRoomAmount)}</span>
                                    ) : null
                                ) : null}
                            </td>

                            <td className="p-1 border border-black text-center">{toLocale(room_refund)}</td>
                            {/* <td className="p-1 border border-black text-center">{toDate}</td> */}
                        </tr>
                    </tbody>
                </table>
                {/* bottom */}
                {/* <div className="hidden print:flex gap-20">
                    <div className="">
                        <h1 className="font-semibold">Мурожаат учун тел: </h1>
                        <div>
                            <div>📞+998692330753</div>
                            <div>📞+998975640010</div>
                            <div>📞+998945070222</div>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">М.у.</p>
                    </div>
                    <div className="w-[100px] ml-auto">
                        <img src={qr} alt="img" />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default RoomTable;
