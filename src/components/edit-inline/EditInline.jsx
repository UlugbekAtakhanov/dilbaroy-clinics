import { CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import EdiText from 'react-editext'
import { useSelector } from 'react-redux'

export default function EditInline({ data }) {
    const { staff: { info: { position } } } = useSelector(state => state)
    function onSave(val) {
        const rowIndex = data.row.index
        // const columnId = data.cell.column.id
        const updatedData = [...data.rows];
        updatedData[rowIndex]["original"]["result"] = val;
        // updatedData[rowIndex]["original"][columnId] = val;

        data.dispatch({ type: 'setRows', rows: updatedData });
    }


    return (
        <EdiText
            type='text'
            value={data?.value || "-"}
            onSave={onSave}

            saveButtonContent={<CheckIcon className='w-[13px] stroke-[3px] stroke-green-500 group-hover:stroke-white' />}
            saveButtonClassName="group hover:bg-green-500  rounded-md w-[20px] h-[20px] flex justify-center items-center"

            cancelButtonContent={<XMarkIcon className='w-[13px] stroke-[3px] stroke-red-500 group-hover:stroke-white' />}
            cancelButtonClassName="group hover:bg-red-500  rounded-md w-[20px] h-[20px] flex justify-center items-center"

            editButtonContent={position === "labarant" && <PencilSquareIcon className='w-[15px]' />}
            editButtonClassName="absolute top-1/2 right-2 -translate-y-1/2 hover:text-sky-500 print:hidden"

            inputProps={{ className: "px-2 py-1 w-[100px]" }}
            viewProps={{ className: "text-center py-2 w-full w-[100px]" }}

            hideIcons={true}
            editOnViewClick={false}
            cancelOnUnfocus
        />
    )
}

