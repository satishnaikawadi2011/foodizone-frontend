import React from 'react';
import classes from './shared.module.css';

interface AppLoaderProps {}

const AppLoader: React.FC<AppLoaderProps> = ({}) => {
	return <div className={classes.loader}>Loading...</div>;
};

export default AppLoader;
