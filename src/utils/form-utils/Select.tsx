import { ErrorMessage, Field } from 'formik'
import { LabelNameProps } from '../../types/formikTypes'


interface OptionsProps {
    options?: {
        key: string,
        value: string,
    }[]
}

const Select = ({ label, name, options, ...rest }: OptionsProps & LabelNameProps) => {

    if (!label || !name || !options?.length) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field as="select" name={name} {...rest}>
                {options.map((option, index) => (
                    <option key={index} value={option.value} className="text-black">{option.key}</option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label>
    )
}

export default Select