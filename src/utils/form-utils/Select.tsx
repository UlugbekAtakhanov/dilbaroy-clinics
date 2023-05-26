import { ErrorMessage, Field } from 'formik'
import { LabelNameProps } from '../../types/formikTypes'
import parse from "html-react-parser"


interface OptionsProps {
    options?: {
        key: string,
        value: string,
        room_patients?: number
    }[]
}

const Select = ({ label, name, options, ...rest }: OptionsProps & LabelNameProps) => {

    if (!label || !name || !options?.length) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field as="select" name={name} {...rest}>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value} className={`text-black ${option?.room_patients ? "bg-green-500/50" : ""}`}>{parse(option.key)}</option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label>
    )
}

export default Select