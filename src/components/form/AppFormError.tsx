import React from 'react';

interface IFormErrorProps {
	errorMessage: string;
}

const AppFormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
	<span role="alert" className="font-medium text-red-500">
		{errorMessage}
	</span>
);

export default AppFormError;
