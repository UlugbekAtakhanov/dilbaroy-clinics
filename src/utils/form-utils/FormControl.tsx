import Checkbox from './Checkbox'
import DatePicker from './DatePicker'
import Input from './Input'
import RadioButtons from './RadioButtons'
import Select from './Select'
import TextArea from './TextArea'

type FormControlType =
    | { label: string, type: string, name: string, control: string, placeholder: string, }
    | { label: string, type: string, name: string, control: string, min: number, }
    | { label: string, name: string, control: string }
    | { control: string, name: string, options: { key: string, value: string, price: number }[] } // checkbox


const FormControl = ({ control, ...rest }: FormControlType) => {

    if (control === "input") return <Input {...rest} />

    if (control === "textarea") return <TextArea {...rest} />

    if (control === "select") return <Select {...rest} />

    if (control === "radio") return <RadioButtons {...rest} />

    if (control === "checkbox") return <Checkbox {...rest} />

    if (control === "datepicker") return <DatePicker {...rest} />

    return null
}

export default FormControl