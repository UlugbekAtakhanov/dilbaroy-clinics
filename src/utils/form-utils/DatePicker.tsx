// import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Field } from 'formik'
import { LabelNameProps } from "../../types/formikTypes";

interface FieldProps {
    field: {
        name: string,
        value: string,
        onBlur: () => void,
        onChange: () => void
    }
    form: {
        setFieldValue: (name: string, target: string) => void
    }
}
const DatePicker = ({ label, name, ...rest }: LabelNameProps) => {

    if (!label || !name) throw new Error("label and name attributes are required")

    return (
        <label className='capitalize'>
            <span className='font-semibold'>{label}</span>
            <Field name={name} {...rest}>
                {({ field, form: { setFieldValue } }: FieldProps) => {
                    const { value } = field
                    return <input type="date" {...field} {...rest} value={value} onChange={e => setFieldValue(name, e.target.value)} />
                }}
            </Field>
            <ErrorMessage name={name} component="div" className='text-red-500 normal-case' />
        </label>
    )
}

export default DatePicker