import { ErrorMessage, Field } from 'formik'
import { LabelNameProps, OptionsProps } from '../../types/formikTypes'


export interface FieldProps {
    field: {
        name: string,
        value: string,
        onBlur: () => void,
        onChange: () => void
    }
}

const RadioButtons = ({ label, name, options, ...rest }: OptionsProps & LabelNameProps) => {

    if (!label || !name || !options?.length) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field name={name} {...rest}>
                {({ field }: FieldProps) => {
                    return options.map((option, index) => (
                        <label key={index} className="flex flex-row gap-2 items-center">
                            <input type="radio" {...field} value={option.value} checked={field.value === option.value} />
                            {option.key}
                        </label>
                    ))
                }}
            </Field>
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label>
    )
}

export default RadioButtons