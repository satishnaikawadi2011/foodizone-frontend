import React, { InputHTMLAttributes } from 'react';
import { useFormikContext } from 'formik';
import AppFormError from './AppFormError';

export interface OptionType {
	value: any;
	label: string;
}

interface ISelectProps {
	label?: string;
	fieldName: string;
	options: OptionType[];
}

const AppFormSelectField: React.FC<ISelectProps & InputHTMLAttributes<HTMLSelectElement>> = ({
	label,
	fieldName,
	options,
	className,
	...props
}) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;

	return (
		<React.Fragment>
			<select
				onChange={(e: any) => setFieldValue(fieldName, e.target.value)}
				value={myValues[fieldName]}
				onBlur={() => setFieldTouched(fieldName)}
				className={`input ${className}`}
				{...props}
			>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
			{formTouched[fieldName] && formErrors[fieldName] && <AppFormError errorMessage={formErrors[fieldName]} />}
		</React.Fragment>
	);
};

export default AppFormSelectField;
