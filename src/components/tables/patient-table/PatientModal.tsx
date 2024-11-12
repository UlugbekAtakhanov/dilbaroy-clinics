import toast from "react-hot-toast";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePatientIsFrozenUpdate, useSinglePatientGetData } from "../../../hooks/usePatientsData";
import { PatientProps } from "../../../types/patientTypes";
import { usePatientStore } from "../../../zustand/PatientStore";

export type PatientIsFrozenUpdateProps = {
    is_frozen: boolean;
    frozen_days: number;
};

const PatientModal = ({ id, setSearchParams }: { id: string; setSearchParams: any }) => {
    const { patient, addPatient }: { patient: PatientProps; addPatient: (patient: PatientProps) => void } = usePatientStore();
    const { mutate } = usePatientIsFrozenUpdate({ toast, patientId: id });

    const [isFrozen, setIsFrozen] = useState(patient?.is_frozen || false);
    const [frozenDays, setFrozenDays] = useState<number>(patient?.frozen_days || 0);

    const {} = useSinglePatientGetData({ patientId: id, addPatient, letToFetch: !patient });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            is_frozen: isFrozen,
            frozen_days: patient.frozen_days === 0 && !isFrozen ? 0 : frozenDays,
        };
        mutate(data);

        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete("id");
            return newParams;
        });
    };

    const onClickMaskHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete("id");
            return newParams;
        });
    };

    return (
        <div className="fixed inset-0 z-40 bg-black/50 p-4  flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded-lg pb-4">
                <div className="flex gap-4 items-center justify-between mb-8">
                    <h1 className="text-center text-2xl ">{patient?.full_name}</h1>
                    <p className="p-1 rounded-md border hover:border-sky-300 cursor-pointer mt-1" onClick={onClickMaskHandler}>
                        <XMarkIcon className="w-4 h-4" />
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <label className="flex flex-row gap-2 items-start font-semibold cursor-pointer">
                        <input type="checkbox" checked={isFrozen} onChange={() => setIsFrozen((prev) => !prev)} className="mt-[2px]" />
                        <div>
                            {!isFrozen ? (
                                <>
                                    <p>Музлатиш</p>
                                    <p className="text-xs text-slate-400">Белги қуйилса беморни вақтини музлатип қояди</p>
                                </>
                            ) : (
                                <>
                                    <p>Музлатиш</p>
                                    <p className="text-xs text-slate-400">Белги олип қуйилса беморни вақти ўз ҳолида давом етади</p>
                                </>
                            )}
                        </div>
                    </label>

                    {isFrozen && (
                        <label>
                            Нечa кунга
                            <input
                                placeholder="Kунни киритинг"
                                name="frozen_days"
                                type="number"
                                value={frozenDays}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.stopPropagation();
                                    setFrozenDays(e.target.valueAsNumber);
                                }}
                            />
                        </label>
                    )}

                    <button className="button-green w-full" type="submit">
                        Сақлаш
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PatientModal;
