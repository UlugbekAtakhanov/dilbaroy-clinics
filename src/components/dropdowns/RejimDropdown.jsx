import React from 'react'

const dropdownList = [
    { key: "Режим", value: "Rejim" },
    { key: "Амбулатор", value: "Амбулатор" },
    { key: "Стационар", value: "Стационар" },
    { key: "Кундузги", value: "Кундузги" }
]

const RejimDropdown = ({ setRejim, defValue }) => {
    return (
        <select value={defValue} onChange={e => setRejim(e.target.value)} className='p-1 text-[14px] border-black w-full bg-sky-100 pl-2'>
            {dropdownList.map((option, index) => (
                <option value={option.value} key={index}>{option.key}</option>
            ))}
        </select>
    )
}

export default RejimDropdown