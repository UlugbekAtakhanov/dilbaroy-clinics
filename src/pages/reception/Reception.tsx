import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import Spinner from "../../components/spinner/Spinner";
import { useDoctorsGetData } from "../../hooks/useDoctorsData";
import { useRoomsGetData } from "../../hooks/useRoomsData";
import { useRoomServicesGetData, useServicesGetData } from "../../hooks/useServicesData";
import FormControl from "../../utils/form-utils/FormControl";
import { toLocale } from "../../utils/toLocale";
import { usePatientsCreateData } from "../../hooks/usePatientsData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// form type
export interface FormValuesProps {
    full_name: string;
    pass_data: string;
    birthday: string;
    address: string;
    phone_number: string;
    doctor: string;

    room_number: string;
    from_date: string;
    duration: number;
    room_amount: number;

    food: boolean;
    food_duration: number;
    food_amount: number;

    massaj1: boolean;
    massaj1_duration: number;
    massaj1_amount: number;

    massaj2: boolean;
    massaj2_duration: number;
    massaj2_amount: number;

    services: never[];
    total_amount: number;

    is_paid: boolean;
}

// doctors type
export interface DoctorProps {
    id: number;
    full_name: string;
}

// rooms type
export interface RoomProps {
    id: number;
    room_comfortable: string;
    room_number: string;
    room_personal: number;
    room_patients: number;
    room_price: number;
    room_type: { room_type: string };
}
export interface RoomSectionProps {
    id: number;
    room_type: string;
    rooms: RoomProps[];
}

// service type
export interface ServiceProps {
    id: number;
    service_name: string;
    service_price: number;
}

// form validation
const validate = (values: FormValuesProps) => {
    let errors: FormikErrors<FormValuesProps> = {};

    if (!values.full_name) {
        errors.full_name = "Маълумотни тўлдиринг";
    }

    if (!values.pass_data) {
        errors.pass_data = "Маълумотни тўлдиринг";
    }

    if (!values.birthday) {
        errors.birthday = "Маълумотни тўлдиринг";
    }

    if (!values.doctor || values.doctor === "no") {
        errors.doctor = "Маълумотни тўлдиринг";
    }

    if (!values.from_date) {
        errors.from_date = "Маълумотни тўлдиринг";
    }

    if (!values.room_number || values.room_number === "no") {
        errors.room_number = "Маълумотни тўлдиринг";
    }

    return errors;
};

const Reception = () => {
    const navigate = useNavigate();
    // useQuery hooks
    const { mutate } = usePatientsCreateData({ toast, navigate });
    const { isLoading: servicesIsLoading, data: servicesQuery } = useServicesGetData();
    const { isLoading: foodIsLoading, data: roomServicesQuery } = useRoomServicesGetData();
    const roomServices = roomServicesQuery?.data ?? [];
    const { isLoading: doctorsIsLoading, data: doctorsQuery } = useDoctorsGetData();
    const { isLoading: roomsIsLoading, data: roomsQuery } = useRoomsGetData();

    const [isPaid, setIsPaid] = useState(false);

    const roomsList = roomsQuery?.data.map((rooms: RoomSectionProps) => rooms.rooms).flat();
    const roomsStat = roomsList?.reduce((acc: any, current: RoomProps) => {
        const count = acc[current.room_comfortable] + 1 || 1;
        return { ...acc, [current.room_comfortable]: count };
    }, {});

    // select options
    const doctorsOptions = doctorsQuery?.data.map((doctor: DoctorProps) => ({ key: doctor.full_name, value: doctor.id })) || [];
    const roomsOptions = roomsQuery?.data.map((rooms: RoomSectionProps) => {
        return (
            rooms?.rooms.map(({ id, room_number, room_personal, room_patients, room_comfortable }: RoomProps) => ({
                key: `${room_number}  (${room_patients} ўрин бўш, ${room_personal} ўринлик,  ${room_comfortable})`,
                value: id,
                room_patients,
            })) || []
        );
    });
    const servicesApparatlar =
        servicesQuery?.data.map((service: ServiceProps) => ({ key: service.service_name, value: service.id, price: service.service_price })) || [];

    // form initialValues
    const initialValues = {
        full_name: "",
        pass_data: "",
        birthday: "",
        address: "",
        phone_number: "",
        doctor: "",

        room_number: "",
        from_date: "",
        duration: 1,
        room_amount: 0,

        food: false,
        food_duration: 0,
        food_amount: 0,

        massaj1: false,
        massaj1_duration: 0,
        massaj1_amount: 0,

        massaj2: false,
        massaj2_duration: 0,
        massaj2_amount: 0,

        services: [],
        total_amount: 0,

        is_paid: false,
    };

    // form onSubmit
    const onSubmit = (values: FormValuesProps, onSubmitProps: FormikHelpers<FormValuesProps>) => {
        const roomTotal = roomsList.find((room: RoomProps) => room.id.toString() === values.room_number).room_price * values.duration;
        const foodTotal = values.food ? values.food_duration * roomServices[0].price : 0;
        const massaj1Total = values.massaj1 ? values.massaj1_duration * roomServices[1].price : 0;
        const massaj2Total = values.massaj2 ? values.massaj2_duration * roomServices[2].price : 0;
        const servicesTotal = values.services.reduce((acc, current) => {
            const el = servicesQuery?.data.find((service: ServiceProps) => service.id.toString() === current);
            return (acc += el.service_price);
        }, 0);
        const totalAmount = roomTotal + foodTotal + servicesTotal + massaj1Total + massaj2Total;
        values = {
            ...values,
            total_amount: totalAmount,
            food_amount: foodTotal,
            room_amount: roomTotal,
            massaj1_amount: massaj1Total,
            massaj2_amount: massaj2Total,
            is_paid: isPaid,
        };
        mutate(values);
        setTimeout(() => {
            onSubmitProps.setSubmitting(false);
        }, 3000);
    };

    if (servicesIsLoading || doctorsIsLoading || roomsIsLoading || foodIsLoading) return <Spinner />;

    return (
        <div className={`${false ? "opacity-50 pointer-events-none" : ""} p-4 md:p-6 pb-12 mx-auto`}>
            <h1 className="text-center text-2xl mb-4 font-semibold">Рўйхатга олиш</h1>

            <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
                {(formik) => {
                    const specRoom = roomsList.find((room: RoomProps) => room.id.toString() === formik.values.room_number);
                    const roomTotal = specRoom ? specRoom?.room_price * formik.values.duration : 0;
                    const foodTotal = formik.values.food ? formik.values.food_duration * roomServices[0].price : 0;
                    const massaj1Total = formik.values.massaj1 ? formik.values.massaj1_duration * roomServices[1].price : 0;
                    const massaj2Total = formik.values.massaj2 ? formik.values.massaj2_duration * roomServices[2].price : 0;
                    const servicesTotal = formik.values.services.reduce((acc, current) => {
                        const el = servicesQuery?.data.find((service: ServiceProps) => service.id.toString() === current);
                        return (acc += el.service_price);
                    }, 0);
                    const totalAmount = roomTotal + foodTotal + servicesTotal + massaj1Total + massaj2Total;

                    return (
                        <Form className="grid gap-6 md:grid-cols-3">
                            {/* patient data */}
                            <div className="flex flex-col gap-4">
                                <FormControl control="input" label="Бемор Ф.И.О." placeholder="Исм Фамилия" name="full_name" type="text" />
                                <FormControl control="input" label="Паспорт серия ва рақами" placeholder="AB1234567" name="pass_data" type="text" />
                                <FormControl control="datepicker" label="Туғилган сана" name="birthday" />
                                <FormControl control="input" label="Телефон рақами" placeholder="+998991234567" name="phone_number" type="text" />
                                <FormControl control="input" label="Яшаш манзили" placeholder="Наманган, Ўзбекистон" name="address" type="text" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <FormControl
                                    control="select"
                                    label="Шифокор"
                                    name="doctor"
                                    options={[{ key: "Докторни танланг", value: "no" }, ...doctorsOptions]}
                                />

                                {/* Palata */}
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">Палата</span>
                                    <div className="border border-gray-300 rounded p-2 grid gap-4">
                                        <FormControl control="datepicker" label="Сана" name="from_date" />
                                        {/* <FormControl control="datepicker" label="Сана" name="from_date" type="datetime-local" /> */}

                                        <div>
                                            <FormControl control="input" label="Кун сони" min={1} name="duration" type="number" />
                                            <p className="text-xs">
                                                (кунига <span className="font-bold">{specRoom ? toLocale(specRoom?.room_price) : null}</span> минг сўм)
                                            </p>
                                        </div>
                                        <p className="underline">
                                            Жами - <span className="font-bold">{specRoom ? toLocale(roomTotal) : null} сўм</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Taom */}
                                <div className="flex flex-col gap-1">
                                    {/* <span className='font-semibold'>Таом</span> */}
                                    <div className="border border-gray-300 rounded p-2 grid gap-4">
                                        <label className="flex flex-row gap-2 items-center font-semibold cursor-pointer">
                                            <Field type="checkbox" name="food" />
                                            {roomServices[0]?.name}
                                        </label>
                                        {formik.values.food ? (
                                            <>
                                                <div>
                                                    <FormControl control="input" label="Кун сони" min={1} name="food_duration" type="number" />
                                                    <p className="text-xs">
                                                        (кунига <span className="font-bold">{toLocale(roomServices[0].price)}</span> минг сўм)
                                                    </p>
                                                </div>
                                                <p className="underline">
                                                    Жами -{" "}
                                                    <span className="font-bold">
                                                        {formik.values.food_duration > 0
                                                            ? toLocale(formik.values.food_duration * roomServices[0].price)
                                                            : 0}{" "}
                                                        сўм
                                                    </span>
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                {/* Massaj katta */}
                                <div className="flex flex-col gap-1">
                                    <div className="border border-gray-300 rounded p-2 grid gap-4">
                                        <label className="flex flex-row gap-2 items-center font-semibold cursor-pointer">
                                            <Field type="checkbox" name="massaj1" />
                                            {roomServices[1]?.name}
                                        </label>
                                        {formik.values.massaj1 ? (
                                            <>
                                                <div>
                                                    <FormControl control="input" label="Кун сони" min={1} name="massaj1_duration" type="number" />
                                                    <p className="text-xs">
                                                        (кунига <span className="font-bold">{toLocale(roomServices[1].price)}</span> минг сўм)
                                                    </p>
                                                </div>
                                                <p className="underline">
                                                    Жами -{" "}
                                                    <span className="font-bold">
                                                        {formik.values.massaj1_duration > 0
                                                            ? toLocale(formik.values.massaj1_duration * roomServices[1].price)
                                                            : 0}{" "}
                                                        сўм
                                                    </span>
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                {/* Massaj kichik */}
                                <div className="flex flex-col gap-1">
                                    <div className="border border-gray-300 rounded p-2 grid gap-4">
                                        <label className="flex flex-row gap-2 items-center font-semibold cursor-pointer">
                                            <Field type="checkbox" name="massaj2" />
                                            {roomServices[2]?.name}
                                        </label>
                                        {formik.values.massaj2 ? (
                                            <>
                                                <div>
                                                    <FormControl control="input" label="Кун сони" min={1} name="massaj2_duration" type="number" />
                                                    <p className="text-xs">
                                                        (кунига <span className="font-bold">{toLocale(roomServices[2].price)}</span> минг сўм)
                                                    </p>
                                                </div>
                                                <p className="underline">
                                                    Жами -{" "}
                                                    <span className="font-bold">
                                                        {formik.values.massaj2_duration > 0
                                                            ? toLocale(formik.values.massaj2_duration * roomServices[2].price)
                                                            : 0}{" "}
                                                        сўм
                                                    </span>
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">Инструментал текширувлар</span>
                                    <div className="border border-gray-300 rounded p-2 grid gap-4">
                                        <FormControl control="checkbox" name="services" options={servicesApparatlar} />
                                    </div>
                                </div>

                                {/* Жами */}
                                <div className="flex gap-6 items-center">
                                    <p className="underline">
                                        Жами - <span className="font-bold">{toLocale(totalAmount)} сўм</span>
                                    </p>
                                    <label className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" checked={isPaid} onChange={() => setIsPaid((prev) => !prev)} />
                                        <span>Тўланган</span>
                                    </label>
                                </div>

                                <button
                                    disabled={!formik.isValid || formik.isSubmitting}
                                    type="submit"
                                    className="button-green mt-6 md:mt-auto w-full flex items-center justify-center gap-2"
                                >
                                    <UserPlusIcon className="w-6" />
                                    Рўйхатга олиш
                                </button>
                            </div>

                            {/* rooms */}
                            <div className="flex flex-col gap-4">
                                {roomsQuery?.data.map((rooms: RoomSectionProps, index: number) => {
                                    return (
                                        <div key={index}>
                                            <FormControl
                                                control="select"
                                                label={rooms.room_type}
                                                name="room_number"
                                                options={[{ key: "Палатани танланг", value: "no" }, ...roomsOptions[index]]}
                                            />
                                        </div>
                                    );
                                })}

                                <div className="text-right">
                                    <p>
                                        <span className="font-bold">Люкс</span> - {roomsStat["Lux"]} та хонада бўш урин бор
                                    </p>
                                    <p>
                                        <span className="font-bold">Оддий</span> - {roomsStat["Oddiy"]} та хонада бўш урин бор
                                    </p>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            <div className="h-[300px]"></div>
        </div>
    );
};

export default Reception;
