import { useEffect } from "react"
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik'
import { LoginFormValuesProps } from '../types/formikTypes'
import FormControl from '../utils/form-utils/FormControl'
import { useTokenGetData } from '../hooks/useTokenData'
import { useNavigate } from 'react-router-dom'
import { getFromLS } from '../utils/localStorage'
import toast from "react-hot-toast"


// form validation
const validate = (values: LoginFormValuesProps) => {
	let errors: FormikErrors<LoginFormValuesProps> = {}

	// username
	if (!values.username) {
		errors.username = "Маълумотни тўлдиринг"
	}

	// password
	if (!values.password) {
		errors.password = "Маълумотни тўлдиринг"
	}

	return errors
}



const Login = () => {
	const navigate = useNavigate()
	const { mutate } = useTokenGetData({navigate, toast})

	useEffect(() => {
		if (getFromLS("token")) {
			navigate("/reception")
		}
	}, [])


	// form initialValues
	const initialValues = {
		username: "",
		password: ""
	}

	// form onSubmit
	const onSubmit = (values: LoginFormValuesProps, onSubmitProps: FormikHelpers<LoginFormValuesProps>) => {
		mutate(values)
		setTimeout(() => {
			onSubmitProps.setSubmitting(false)
			onSubmitProps.resetForm()
		}, 3000);
	}


	// if (tokenIsLoading) return <Spinner /> 

	return (
		<div className='h-screen flex items-center justify-center px-2'>
			<Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
				{formik => {
					return (
						<Form className='grid max-w-[350px] w-full bg-white p-6 gap-4 rounded-lg'>
							<div>
								{/* <img className='w-[200px] mx-auto' src={logo} alt="logo" /> */}
								<h1 className='text-center text-2xl font-semibold'>Dilbaroy Klinika</h1>
							</div>
							<FormControl control="input" label="Логин" placeholder="Логин киритинг" name="username" type="text" />
							<FormControl control="input" label="Парол" placeholder="Парол киритинг" name="password" type="text" />
							<button disabled={!formik.isValid || formik.isSubmitting} className='button-green ' type="submit">Кириш</button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Login