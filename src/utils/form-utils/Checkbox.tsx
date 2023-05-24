import { ErrorMessage, Field, FieldProps } from 'formik'
import { LabelNameProps } from '../../types/formikTypes'
import { toLocale } from '../toLocale'


interface OptionsProps {
    options?: {
        key: string,
        value: string,
        price: number
    }[]
}


const Checkbox = ({ label, name, options, ...rest }: OptionsProps & LabelNameProps) => {

    if (!name || !options?.length) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field name={name} {...rest}>
                {({ field, form }: FieldProps) => {
                    return options.map((option, index) => (
                        <div key={index} className='flex justify-between'>
                            <label className="flex flex-row gap-2 items-center font-semibold cursor-pointer">
                                <input type="checkbox" {...field} value={option.value} checked={field.value.includes(option.value.toString())} />
                                {option.key}
                            </label>
                            {form.values.aparat.includes(option.value.toString()) && <p className='font-bold'> + {toLocale(option.price)} сўм</p>}
                        </div>
                    ))
                }}
            </Field>
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label >
    )
}

export default Checkbox