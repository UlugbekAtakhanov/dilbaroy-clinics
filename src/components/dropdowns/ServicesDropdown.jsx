import React from 'react'
import { useSelector } from 'react-redux'


const ServicesDropdown = ({ setService, defValue }) => {

    const { services: { services_1, services_2 } } = useSelector(state => state)
    const dropdownList = [{ id: "Barchasi", service_name: "Тахлиллар" }, ...services_1, ...services_2]

    return (
        <select value={defValue} onChange={e => setService(e.target.value)} className='p-1 text-[14px] border-black w-full bg-sky-100 pl-2'>
            {dropdownList.map((option, index) => (
                <option value={option.id} key={index}>{option.service_name}</option>
            ))}
        </select>
    )
}

export default ServicesDropdown