import EditInline from "../../edit-inline/EditInline";

export const COLUMNS = [
    {
        Header: "Тахлил номи",
        accessor: data => data.service.service_name,
    },
    {
        Header: "Натижа",
        accessor: data => data.result,
        Cell: data => {
            return (
                <div className="flex items-center justify-center relative">
                    <EditInline data={data} />
                </div>
            )
        }
    },
    {
        Header: "Ўлчов бирлиги",
        accessor: data => data.service.service_unit,
        Cell: data => (
            <div className="text-center">
                {data.value || "-"}
            </div>
        )
    },
    {
        Header: "Норма",
        accessor: data => data.service.service_norm,
        Cell: data => (
            <div className="text-center">
                {data.value || "-"}
            </div>
        )
    },
]