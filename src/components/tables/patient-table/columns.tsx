import { useSearchParams } from "react-router-dom";
import { PatientProps } from "../../../types/patientTypes";
import { daysInMiliseconds, formatDate } from "../../../utils/daysInMiliseconds";
import { usePatientStore } from "../../../zustand/PatientStore";
import PatientModal from "./PatientModal";

export const COLUMNS = [
    {
        Header: "Рўйхат рақами",
        accessor: (data: PatientProps) => [data.id],
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{`${original.id}/${new Date().getFullYear()}`}</p>
            </div>
        ),
    },
    {
        Header: "Пасс. маълумоти",
        accessor: (data: PatientProps) => {
            if (data.birthday) return [data.pass_data, formatDate(new Date(data.birthday))];
        },
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{original.pass_data}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Tug'ilgan sana">
                    {formatDate(new Date(original.birthday))}
                </p>
            </div>
        ),
    },
    {
        Header: "Бемор Ф.И.О.",
        accessor: (data: PatientProps) => [data.full_name, data.phone_number],
        Cell: ({ row: { original } }: any) => (
            <div>
                <p>{original.full_name}</p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Telefon raqam">
                    {original.phone_number}
                </p>
                <p className="text-xs print:text-[10px] text-slate-400" title="Ish joyi">
                    {original.workplace}
                </p>
            </div>
        ),
    },
    {
        Header: "Палаталар",
        accessor: (data: PatientProps) => [data?.room?.room_number],
        Cell: ({ row: { original } }: { row: { original: PatientProps } }) => {
            const isFrozen = original.is_frozen;
            const frozenDays = original.frozen_days;

            // const from = new Date(original.from_date).getTime();
            // const to = new Date(original.from_date).getTime() + daysInMiliseconds(original.duration + frozenDays - 1);
            const from = new Date(original.from_date).setHours(0, 0, 0, 0);
            const to = new Date(original.from_date).setHours(0, 0, 0, 0) + daysInMiliseconds(original.duration + frozenDays - 1);

            const room_name = original?.room?.room_number.split(" ")[0];
            const room_type = original?.room?.room_type.room_type;

            // const currentDate = Date.now() + 1000 * 60 * 60 * 24 * (frozenDays - 1);
            const currentDate = new Date().setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24 * frozenDays;

            const minus = Math.round((currentDate - to) / (1000 * 60 * 60 * 24));
            const plus = Math.round((to - currentDate) / (1000 * 60 * 60 * 24));

            const room_patients = original?.room?.room_patients;
            const room_personal = original?.room?.room_personal;
            const room_comfortable = original?.room?.room_comfortable;

            return (
                <div>
                    {original.room_status ? (
                        <div className="flex gap-2 items-center">
                            <span>
                                {room_type} {room_name} хона
                            </span>
                            <div className="bg-sky-200 text-sky-700 px-1 rounded-md border border-sky-300 text-xs w-max">Тугатилди</div>
                        </div>
                    ) : (
                        <div>
                            {original?.room && (
                                <div className="flex gap-2 items-center">
                                    <span>
                                        {room_type} {room_name} хона
                                    </span>
                                    {to < currentDate && minus !== 0 ? (
                                        <div className="bg-rose-200 text-rose-700 px-1 rounded-md border border-rose-300 text-xs w-max">
                                            {minus} кун қарз
                                        </div>
                                    ) : (
                                        <div className="bg-green-200 text-green-700 px-1 rounded-md border border-green-300 text-xs w-max">
                                            {plus} кун ҳақ
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {!original?.is_paid && <div className="bg-red-200 text-red-700 px-1 rounded-md border border-red-300 text-xs w-max">Тўланмаган</div>}

                    {original?.room && (
                        <>
                            <p className="text-xs text-slate-400">
                                {formatDate(from)} - {formatDate(to)} (давомийлиги {original.duration} кун)
                            </p>

                            {/* muzlatilgan status */}
                            <div className="flex gap-1">
                                {isFrozen && <div className="bg-sky-200 text-sky-700 px-1 text-xs w-max">Mузлатилган</div>}
                                {isFrozen || frozenDays > 0 ? <p className="text-xs w-max text-sky-700">{frozenDays} кунга музлатилган</p> : null}
                            </div>
                        </>
                    )}

                    <div className="text-xs text-slate-400">
                        Xозирда xoна: {room_patients} ўрин бўш, {room_personal} ўринлик, {room_comfortable}
                    </div>
                </div>
            );
        },
    },
    {
        Header: "Шифокор",
        accessor: (data: PatientProps) => [data?.doctor?.full_name],
        Cell: ({ row: { original } }: any) => {
            return <div>{original?.doctor && <p>{original.doctor.full_name}</p>}</div>;
        },
    },
    {
        Header: "Таҳрирлаш",
        Cell: ({ row: { original } }: { row: { original: PatientProps } }) => {
            const [searchParams, setSearchParams] = useSearchParams();
            const { addPatient } = usePatientStore();

            const modalHandler = (e: React.MouseEvent) => {
                e.stopPropagation();
                addPatient(original);
                setSearchParams((prev: URLSearchParams) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set("id", original.id.toString());
                    return newParams;
                });
            };

            const id = searchParams.get("id");

            return (
                <div>
                    <button
                        className="text-[14px] bg-sky-200 border border-sky-300 hover:bg-sky-300 text-sky-600 rounded p-[2px] px-3 h-full block"
                        onClick={modalHandler}
                    >
                        Музлатиш
                    </button>

                    {/* modal */}
                    {id && id === original.id.toString() && <PatientModal id={id} setSearchParams={setSearchParams} />}
                </div>
            );
        },
    },
];
