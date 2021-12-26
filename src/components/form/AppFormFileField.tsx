import { useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import AppFormError from './AppFormError';

interface FormFieldProps {
	fieldName: string;
}

const AppFormFileField: React.FC<FormFieldProps & InputHTMLAttributes<HTMLInputElement>> = ({
	className,
	fieldName,
	onChange,
	...props
}) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;
	return (
		<React.Fragment>
			<input
				onChange={

						onChange ? onChange :
						(e: any) => setFieldValue(fieldName, e.target.files)
				}
				onBlur={() => setFieldTouched(fieldName)}
				className={`form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}
				type={'file'}
				{...props}
			/>
			{formTouched[fieldName] && formErrors[fieldName] && <AppFormError errorMessage={formErrors[fieldName]} />}
		</React.Fragment>
	);
};

export default AppFormFileField;
