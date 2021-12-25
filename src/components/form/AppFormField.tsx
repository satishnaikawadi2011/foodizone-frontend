import { useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import AppFormError from './AppFormError';

interface FormFieldProps {
	fieldName: string;
}

const AppFormField: React.FC<FormFieldProps & InputHTMLAttributes<HTMLInputElement>> = ({
	className,
	fieldName,
	type,
	...props
}) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;
	return (
		<React.Fragment>
			<input
				onChange={(e: any) => setFieldValue(fieldName, e.target.value)}
				value={myValues[fieldName]}
				onBlur={() => setFieldTouched(fieldName)}
				className={`input ${className}`}
				type={type}
				{...props}
			/>
			{formTouched[fieldName] && formErrors[fieldName] && <AppFormError errorMessage={formErrors[fieldName]} />}
		</React.Fragment>
	);
};

export default AppFormField;
