import React, { ButtonHTMLAttributes } from 'react';
import classes from './shared.module.css';

interface GlowingButtonProps {
	label: string;
}

const GlowingButton: React.FC<GlowingButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	label,
	className,
	...props
}) => {
	return (
		<button className={`${classes.button__glow} ${className}`} {...props}>
			{label}
		</button>
	);
};

export default GlowingButton;
