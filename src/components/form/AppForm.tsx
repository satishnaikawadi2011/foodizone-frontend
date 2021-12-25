import { Formik } from 'formik';
import React from 'react';

interface AppFormProps {
	initialValues: any;
	validationSchema: any;
	onSubmit: any;
	className?: string;
}

const AppForm: React.FC<AppFormProps> = ({ initialValues, onSubmit, validationSchema, children, className }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{() => <div className={className}>{children}</div>}
		</Formik>
	);
};

export default AppForm;
