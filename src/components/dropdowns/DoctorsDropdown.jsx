import React from 'react'
import { useSelector } from 'react-redux'


const DoctorsDropdown = ({ setDoctor, setRejim, setService }) => {

    const { doctors: { doctors } } = useSelector(state => state)
    const dropdownList = [{ id: "Barchasi", full_name: "Шифокорлар" }, ...doctors]

    return (
        <select onChange={e => {
            setDoctor(e.target.value)
            setRejim("Rejim")
            setService("Barchasi")
        }} className='p-1 text-[14px] border-black w-full bg-sky-100 pl-2'>
            {dropdownList.map((option, index) => (
                <option value={option.id} key={index}>{option.full_name}</option>
            ))}
        </select>
    )
}

export default DoctorsDropdown