import Lottie from 'react-lottie';
import * as animationData from '../data/email.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface LoaderProps {
	height?: number;
	width?: number;
}

const VerifyEmailAnimation: React.FC<LoaderProps> = ({ height = 300, width = 300 }) => {
	return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default VerifyEmailAnimation;
