import { Menu, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, ChevronDownIcon, DocumentDuplicateIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


const dropdownList = [
    { title: "Рўйхатга олиш", icon: <PencilIcon />, url: "/reception", status: "reception" },
    { title: "Беморлар рўйхати", icon: <DocumentDuplicateIcon />, url: "/reception/list", status: "reception" },
    // { title: "Шифокор", icon: <UserIcon />, url: "/doctor", status: "doctor" },
    // { title: "Лаборант", icon: <BeakerIcon />, url: "/labarant", status: "labarant" },
]

const menuItemClass = (active: boolean, disabled: boolean) => ` ${disabled ? "text-gray-400  pointer-events-none" : active ? "bg-green-200 text-black" : null} flex items-center gap-2 cursor-pointer m-[1px] rounded-md py-1 px-2 whitespace-nowrap [&:last-child]:border-t `

interface DropTypes {
    logoutHandler: () => void
}

const Dropdown = ({ logoutHandler }: DropTypes) => {
    return (
        <div>
            <Menu as="div" className="relative z-10">

                {({ open }) => (
                    <>
                        <Menu.Button className="bg-white px-3 py-1 rounded-md flex items-center gap-1">
                            Меню
                            <ChevronDownIcon className={` ${open ? "-rotate-180" : "rotate-0"}  w-3 translate-y-[2px] transition-all`} />
                        </Menu.Button>

                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Menu.Items static className="absolute right-0 z-10 top-0 mt-2 bg-gray-50 text-slate-700 p-1 rounded-md outline-none ">

                                {dropdownList.map((item, index) => (
                                    <Menu.Item key={index} >
                                        {({ active, disabled }) => (
                                            <Link to={item.url} className={menuItemClass(active, disabled)}>
                                                <span className='w-4'>
                                                    {item.icon}
                                                </span>
                                                {item.title}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}

                                <Menu.Item>
                                    {({ active, disabled }) => (
                                        <div onClick={logoutHandler} className={menuItemClass(active, disabled)}>
                                            <span className='w-4'>
                                                <ArrowLeftOnRectangleIcon />
                                            </span>
                                            Чиқиш
                                        </div>
                                    )}
                                </Menu.Item>

                            </Menu.Items>
                        </Transition>
                    </>
                )}

            </Menu>

        </div >
    )
}

export default Dropdown