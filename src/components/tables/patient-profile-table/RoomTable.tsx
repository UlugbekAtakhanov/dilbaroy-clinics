import { PrinterIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PatientProps } from "../../../types/patientTypes";
import { toLocale } from "../../../utils/toLocale";
import { usePatientStore } from "../../../zustand/PatientStore";
import logo from "../../../assets/logo.png";

interface RoomTableProps {
    patient: PatientProps;
    edit: boolean;
    extraRoomAmount: number;
}

const RoomTable = ({ patient, edit, extraRoomAmount }: RoomTableProps) => {
    const printTableRef = useRef(null);
    const printTableRef2 = useRef(null);
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

    const printHandler = useReactToPrint({
        content: () => (printTableRef.current ? printTableRef?.current : null),
        documentTitle: "table",
    });

    const printHandler2 = useReactToPrint({
        content: () => (printTableRef2.current ? printTableRef2?.current : null),
        documentTitle: "table",
    });

    return (
        <div>
            <h1 className="font-bold text-lg mb-4 text-left flex items-center gap-2">
                Палаталар буйича маълумот
                <button onClick={printHandler} className="self-end button-green hidden">
                    <PrinterIcon className="w-6 text-white" />
                </button>
                <button onClick={printHandler2} className="self-end button-green">
                    <PrinterIcon className="w-6 text-white" />
                </button>
            </h1>

            <div ref={printTableRef}>
                <div className="print:w-[93%] print:mx-auto print:mt-4 print:text-xs logo-bg print:border-2 print:border-black print:p-2">
                    {/* top */}
                    <div className="hidden print:block text-center mb-2">
                        <h1 className="font-bold text-xl print:text-base">Тўлов Чеки</h1>
                    </div>

                    {/* bottom */}
                    <div className="hidden print:flex gap-12 mb-4">
                        <div className="border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                            <p className="font-semibold">{phone_number}</p>
                            <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                            <p className="font-semibold mb-4">{address}</p>
                        </div>

                        <div className=" border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full mb-20 print:mb-1">
                        <thead>
                            <tr>
                                <th className="p-1 border border-black w-[280px]">Палата </th>
                                <th className="p-1 border border-black w-[280px]">Тўланган сумма</th>
                                <th className="p-1 border border-black">Бошаланиши</th>
                                <th className="p-1 border border-black">Даволаниш муддати</th>
                                <th className="p-1 border border-black print:hidden">Қайтарилди</th>
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

                                {/* amount */}
                                <td className="p-1 border border-black text-center">
                                    {toLocale(room_amount)}
                                    {extraRoomAmount ? (
                                        extraRoomAmount > 0 ? (
                                            <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">
                                                +{toLocale(extraRoomAmount)}
                                            </span>
                                        ) : extraRoomAmount < 0 ? (
                                            <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraRoomAmount)}</span>
                                        ) : null
                                    ) : null}
                                </td>

                                {/* from date */}
                                <td className="p-1 border border-black text-center">{fromDate}</td>

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

                                <td className="p-1 border border-black text-center print:hidden">{toLocale(room_refund)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                </div>

                {/* second the same table but invisible */}
                <div className="hidden print:block print:w-[93%] print:mx-auto print:mt-4 print:text-xs logo-bg print:border-2 print:border-black print:p-2">
                    {/* top */}
                    <div className="hidden print:block text-center mb-2">
                        <h1 className="font-bold text-xl print:text-base">Тўлов Чеки</h1>
                    </div>

                    {/* bottom */}
                    <div className="hidden print:flex gap-12 mb-4">
                        <div className="border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{full_name}</h1>
                            <p className="font-semibold">{phone_number}</p>
                            <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                            <p className="font-semibold mb-4">{address}</p>
                        </div>

                        <div className=" border-l-2 border-black pl-2 ">
                            <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                            <h1 className="font-semibold text-left flex items-center gap-2">{doctor.full_name}</h1>
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full mb-20 print:mb-1">
                        <thead>
                            <tr>
                                <th className="p-1 border border-black w-[280px]">Палата </th>
                                <th className="p-1 border border-black w-[280px]">Тўланган сумма</th>
                                <th className="p-1 border border-black">Бошаланиши</th>
                                <th className="p-1 border border-black">Даволаниш муддати</th>
                                <th className="p-1 border border-black print:hidden">Қайтарилди</th>
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

                                {/* amount */}
                                <td className="p-1 border border-black text-center">
                                    {toLocale(room_amount)}
                                    {extraRoomAmount ? (
                                        extraRoomAmount > 0 ? (
                                            <span className="bg-green-300 ml-2 px-2 rounded text-green-700 font-semibold">
                                                +{toLocale(extraRoomAmount)}
                                            </span>
                                        ) : extraRoomAmount < 0 ? (
                                            <span className="bg-red-300 ml-2 px-2 rounded text-red-700 font-semibold">{toLocale(extraRoomAmount)}</span>
                                        ) : null
                                    ) : null}
                                </td>

                                {/* from date */}
                                <td className="p-1 border border-black text-center">{fromDate}</td>

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

                                <td className="p-1 border border-black text-center print:hidden">{toLocale(room_refund)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="hidden print:block text-right mr-40 font-bold">Kacca: </p>
                </div>
            </div>

            {/* for small printer */}
            <div ref={printTableRef2}>
                <div className="border hidden print:block print:w-[93%] print:mx-auto print:text-xs print:px-2">
                    {/* top */}
                    <div className="hidden print:flex justify-center mb-2">
                        <img src={logo} alt="img" className="w-[100px] h-[72px] object-cover" />
                    </div>

                    <div className="hidden print:block text-center">
                        <h1 className="font-bold text-base print:text-xs">Бемор ҳақида маълумот:</h1>
                        <h1 className="font-semibold">{full_name}</h1>
                        <p className="font-semibold">{phone_number}</p>
                        <p className="font-semibold">{format(new Date(birthday), "dd/MM/yyyy")}</p>
                        <p className="font-semibold mb-4">{address}</p>
                    </div>

                    <div className="hidden print:block text-center">
                        <h1 className="font-bold text-base print:text-xs">Доктор ҳақида маълумот:</h1>
                        <h1 className="">{doctor.full_name}</h1>
                    </div>

                    <div className="print:space-y-2 mt-4">
                        <h1 className="font-bold text-base print:text-xs text-center my-2">Ётоқ</h1>

                        {/* palata */}
                        <p className="flex justify-between">
                            <span className="font-bold">
                                {room_type.room_type}({room_comfortable}) - {room_number} хона
                            </span>
                            <span>{toLocale(room_price)} минг сўм</span>
                        </p>

                        {/* tolangan summa */}
                        <p className="flex justify-between">
                            <span className="font-bold">Тўланган сумма</span>
                            <span>{toLocale(room_amount)} минг сўм</span>
                        </p>

                        {/* boshlanishi */}
                        <p className="flex justify-between">
                            <span className="font-bold">Бошаланиши</span>
                            <span>{fromDate}</span>
                        </p>

                        {/* davolash muddati */}
                        <p className="flex justify-between">
                            <span className="font-bold">Даволаниш муддати</span>
                            <span>{duration} кун</span>
                        </p>
                    </div>

                    <div className="print:space-y-2 mt-4">
                        <h1 className="font-bold text-base print:text-xs text-center my-2">Тўлов</h1>

                        {/* tolangan summa */}
                        <p className="flex justify-between">
                            <span className="font-bold">Умумий сумма</span>
                            <span>{toLocale(room_amount)} минг сўм</span>
                        </p>

                        {/* davolash muddati */}
                        <p className="flex justify-between">
                            <span className="font-bold">Сана</span>
                            <span>{format(new Date(), "dd/MM/yyyy HH:mm")}</span>
                        </p>
                    </div>

                    <p className="hidden print:block font-bold mt-8 pb-12">Kacca: </p>
                </div>
            </div>
        </div>
    );
};

export default RoomTable;
