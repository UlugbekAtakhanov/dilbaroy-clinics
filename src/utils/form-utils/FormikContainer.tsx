import { Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import FormControl from './FormControl'

interface FormValuesProps {
    email: string,
    textarea: string,
    select: string,
    radio: string,
    checkbox: never[],
    datepicker: string
}

const validate = (values: FormValuesProps) => {
    let errors: FormikErrors<FormValuesProps> = {}

    // email
    if (!values.email) {
        errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)) {
        errors.email = "Invalid email format"
    }

    // textarea
    if (!values.textarea) {
        errors.textarea = "Required"
    }

    // select
    if (!values.select) {
        errors.select = "Required"
    }

    // radio
    if (!values.radio) {
        errors.radio = "Required"
    }

    // checkbox
    if (!values.checkbox.length) {
        errors.checkbox = "Required"
    }

    // datepicker
    if (!values.datepicker) {
        errors.datepicker = "Required"
    }

    return errors
}

// array options for select element
// const selectOptions = [
//     { key: "Select an option", value: "" },
//     { key: "Option 1", value: "option1" },
//     { key: "Option 2", value: "option2" },
//     { key: "Option 3", value: "option3" }
// ]
// radio options for radio button
// const radioOptions = [
//     { key: "Option 1", value: "option1" },
//     { key: "Option 2", value: "option2" },
//     { key: "Option 3", value: "option3" }
// ]
// checkbox options for checkbox button
// const checkboxOptions = [
//     { key: "Option 1", value: "option1" },
//     { key: "Option 2", value: "option2" },
//     { key: "Option 3", value: "option3" }
// ]

// initialValues
const initialValues = {
    email: "",
    textarea: "",
    select: "",
    radio: "",
    checkbox: [],
    datepicker: ""
}

// onSubmit
const onSubmit = (values: FormValuesProps, onSubmitProps: FormikHelpers<FormValuesProps>) => {
    console.log(values)
    // console.log(onSubmitProps)
    setTimeout(() => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }, 3000);
}



const FormikContainer = () => {
    return (
        <div className='min-h-screen py-96 text-white flex  justify-center items-center'>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
                {formik => {
                    return (
                        <Form className='flex flex-col gap-4 max-w-[350px] w-full'>

                            {/* email input */}
                            <FormControl control="input" label="email" name="email" type="email" />

                            {/* textarea */}
                            <FormControl control="textarea" label="textarea" name="textarea" />

                            {/* select */}
                            {/* <FormControl control="select" label="select" name="select" options={selectOptions} /> */}

                            {/* radio */}
                            {/* <FormControl control="radio" label="radio" name="radio" options={radioOptions} /> */}

                            {/* checkbox */}
                            {/* <FormControl control="checkbox" label="checkbox" name="checkbox" options={checkboxOptions} /> */}

                            {/* datepicker */}
                            <FormControl control="datepicker" label="datepicker" name="datepicker" />

                            <button disabled={!formik.isValid || formik.isSubmitting} className='disabled:opacity-50 bg-green-500 w-max mx-auto py-1 px-4 rounded shadow' type="submit">Submit</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default FormikContainer