import { create } from "zustand";
import { PatientProps } from "../types/patientTypes";

interface UsePatientStoreProps {
    patient: any;
    addPatient: (patient: PatientProps) => void;
    incDuration: () => void;
    decDuration: () => void;
    incFoodDuration: () => void;
    decFoodDuration: () => void;
    incMassaj1Duration: () => void;
    decMassaj1Duration: () => void;
    incMassaj2Duration: () => void;
    decMassaj2Duration: () => void;
}

export const usePatientStore = create<UsePatientStoreProps>()((set) => ({
    patient: null,

    addPatient: (patient: PatientProps) => set(() => ({ patient })),

    incDuration: () => set((state) => ({ patient: { ...state.patient, duration: state.patient?.duration + 1 } })),
    decDuration: () => set((state) => ({ patient: { ...state.patient, duration: state.patient?.duration - 1 } })),

    incFoodDuration: () => set((state) => ({ patient: { ...state.patient, food_duration: state.patient?.food_duration + 1 } })),
    decFoodDuration: () => set((state) => ({ patient: { ...state.patient, food_duration: state.patient?.food_duration - 1 } })),

    incMassaj1Duration: () => set((state) => ({ patient: { ...state.patient, massaj1_duration: state.patient?.massaj1_duration + 1 } })),
    decMassaj1Duration: () => set((state) => ({ patient: { ...state.patient, massaj1_duration: state.patient?.massaj1_duration - 1 } })),

    incMassaj2Duration: () => set((state) => ({ patient: { ...state.patient, massaj2_duration: state.patient?.massaj2_duration + 1 } })),
    decMassaj2Duration: () => set((state) => ({ patient: { ...state.patient, massaj2_duration: state.patient?.massaj2_duration - 1 } })),
}));
