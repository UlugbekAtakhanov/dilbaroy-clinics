import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { ColumnInstance } from 'react-table'
import { PatientProps } from '../../types/patientTypes'


const SelectTableColumn = ({ allColumns }: any) => {
    return (
        <>
            <Listbox as="div" className="relative z-[1]" multiple>
                {({ open }) => (
                    <>
                        <Listbox.Label className="font-semibold">Кераклик устунларни танланг:</Listbox.Label>
                        <Listbox.Button className="flex items-center justify-between w-full px-2 text-left border border-black rounded bg-sky-100 text-slate-500 group">
                            {allColumns.length ? allColumns
                                .map((column: ColumnInstance<PatientProps>) => column.isVisible ? column.Header : "")
                                .filter((item: ColumnInstance<PatientProps>) => item).join(", ") : "No one is choosen"}
                            <span>
                                <ChevronUpDownIcon className="w-6 h-6 group-hover:text-yellow-500" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options as="ul" className="absolute z-10 top-0 left-0 w-full overflow-hidden bg-white rounded shadow">
                                {allColumns.map((column: any) => {
                                    return (
                                        <Listbox.Option value={column} key={column.id}>
                                            {({ active, disabled }) => (
                                                <div className={`
                                                        ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                                        ${column.isVisible ? "font-semibold text-slate-600" : "font-normal"} 
                                                        ${disabled ? "text-gray-300" : "text-slate-500"}
                                                        flex items-center gap-2 pl-4 py-2 px-2 transition-all relative
                                                    `}>
                                                    {column.isVisible ? <CheckIcon className='absolute w-4 text-amber-600 left-2 ' /> : null}
                                                    <label htmlFor={column.id} className='flex-row w-full' >
                                                        <input className='invisible' id={column.id} type="checkbox" {...column.getToggleHiddenProps()} />
                                                        <span>{column.Header}</span>
                                                    </label>
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    )
                                })}
                            </Listbox.Options>
                        </Transition>
                    </>
                )
                }
            </Listbox >
        </>
    )
}

export default SelectTableColumn