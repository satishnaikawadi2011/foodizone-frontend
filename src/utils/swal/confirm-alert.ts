import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmAlert = (text = "You won't be able to revert this!", confirmText = 'Yes, delete it!') => {
	return MySwal.fire({
		title: 'Are you sure?',
		text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: confirmText
	});
};
