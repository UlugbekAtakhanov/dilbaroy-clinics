import { CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import EdiText from 'react-editext'

interface ReceptionEditInlineProps {
    value: string
}
export default function ReceptionEditInline({ value }: ReceptionEditInlineProps) {


    function onSave(val: string) {
        console.log('Edited Value -> ', val)
    }

    return (
        <EdiText
            type='text'
            value={value}
            onSave={onSave}

            saveButtonContent={<CheckIcon className='w-[16px] stroke-[3px] stroke-green-500 group-hover:stroke-white' />}
            saveButtonClassName="group hover:bg-green-500  rounded-md w-[20px] h-[20px] flex justify-center items-center -translate-y-[4px]"

            cancelButtonContent={<XMarkIcon className='w-[16px] stroke-[3px] stroke-red-500 group-hover:stroke-white' />}
            cancelButtonClassName="group hover:bg-red-500  rounded-md w-[20px] h-[20px] flex justify-center items-center -translate-y-[4px]"

            editButtonContent={<PencilSquareIcon className='w-[16px]' />}
            editButtonClassName="absolute cursor-pointer bottom-[3px] left-full -translate-y-1/2 hover:text-sky-500 print:hidden"

            inputProps={{ className: "px-2 py-1 w-full mx-auto mb-2" }}
            viewProps={{ className: "text-center py-2 w-full font-semibold tracking-[px] text-base print:text-sm" }}

            hideIcons={true}
            editOnViewClick={false}
            cancelOnUnfocus
        />
    )
}

