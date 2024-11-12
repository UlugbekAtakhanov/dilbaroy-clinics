import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useRoomsGetData } from "../../hooks/useRoomsData";
import { RoomSectionProps } from "../../pages/reception/Reception";
import DatePicker from "../date-picker/DatePicker";
import GlobalFilter from "./GlobalFilter";

interface GlobalSearchProps {
    getPatientsFn: any;
    globalFilter: any;
    setGlobalFilter: any;
    searchParams?: any;
    setSearchParams?: any;
}

const GlobalSearch = ({ getPatientsFn, globalFilter, setGlobalFilter, searchParams, setSearchParams }: GlobalSearchProps) => {
    const location = useLocation();
    const isStatistics = location.pathname.includes("statistics");
    const { data: roomsQuery } = useRoomsGetData();

    const sdate = JSON.parse(searchParams.get("startDate"));
    const edate = JSON.parse(searchParams.get("endDate"));
    const date = [{ startDate: new Date(sdate), endDate: new Date(edate), key: "selection" }];

    const room_status = (searchParams && searchParams.get("room_status")) || "ҳаммаси";
    const room_type = (searchParams && searchParams.get("room_type")) || "ҳаммаси";

    const roomOptions = roomsQuery?.data.map((item: RoomSectionProps) => item.room_type) || [];

    const startDate = format(date[0].startDate, "yyyy-MM-dd");
    const endDate = format(date[0].endDate, "yyyy-MM-dd");

    const searchTerm = { from: startDate, to: endDate };
    const { refetch, isFetching } = getPatientsFn({ searchTerm });

    const searchHandler = () => {
        refetch();
    };

    return (
        <div className={`${isFetching ? "opacity-50 pointer-events-none" : ""} flex flex-col gap-2 my-4 md:items-center md:flex-row`}>
            <div className="flex-1 leading-3">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>

            {!isStatistics && (
                <div className="flex-1 mb-[3px]">
                    <select
                        className="p-1 text-[14px] border-black w-full bg-sky-100 pl-2"
                        value={room_status}
                        onChange={(e) =>
                            setSearchParams((prev: URLSearchParams) => {
                                prev.set("room_status", e.target.value);
                                return prev;
                            })
                        }
                    >
                        <option value="ҳаммаси">Ҳаммаси</option>
                        <option value="тугатилганлар">Тугатилганлар</option>
                        <option value="тугатилмаганлар">Тугатилмаганлар</option>
                    </select>
                </div>
            )}

            {!isStatistics && (
                <div className="flex-1 mb-[3px]">
                    <select
                        className="p-1 text-[14px] border-black w-full bg-sky-100 pl-2"
                        value={room_type}
                        onChange={(e) =>
                            setSearchParams((prev: URLSearchParams) => {
                                prev.set("room_type", e.target.value);
                                return prev;
                            })
                        }
                    >
                        <option value="ҳаммаси">Ҳаммаси</option>
                        {roomOptions.map((item: string, index: number) => (
                            <option value={item} key={index}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex-1">
                <DatePicker date={date} setSearchParams={setSearchParams} />
            </div>

            <div>
                <button onClick={searchHandler} className="text-[14px] button-red p-[2px] px-3 h-full block">
                    Қидириш
                </button>
            </div>
        </div>
    );
};

export default GlobalSearch;
