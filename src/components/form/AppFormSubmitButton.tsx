import { useFormikContext } from 'formik';
import React from 'react';

interface SubmitButtonProps {
	onClick?: any;
	loading?: boolean;
	title: string;
	disabled?: boolean;
}

const AppFormSubmitButton: React.FC<SubmitButtonProps> = ({ title, loading, disabled, onClick }) => {
	const { handleSubmit, isValid, dirty } = useFormikContext();
	return (
		<button
			onClick={(e) => {
				if (onClick) {
					onClick(e);
				}
				handleSubmit();
			}}
			className={`text-lg font-medium focus:outline-none text-white py-4  transition-colors ${
				!disabled && isValid && dirty ? 'bg-lime-600 hover:bg-lime-700' :
				'bg-gray-300 pointer-events-none'}`}
		>
			{
				loading ? 'Loading...' :
				title}
		</button>
	);
};

export default AppFormSubmitButton;
