import { ErrorMessage, Field } from 'formik'
import { LabelNameProps } from '../../types/formikTypes'



const Input = ({ label, name, ...rest }: LabelNameProps) => {

    if (!label || !name) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field name={name} {...rest} />
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label>
    )
}

export default Input