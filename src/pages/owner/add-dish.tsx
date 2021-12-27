import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import AppFormField from '../../components/form/AppFormField';
import AppFormSubmitButton from '../../components/form/AppFormSubmitButton';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { MyRestaurantDocument, useCreateDishMutation } from '../../generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AppFormFileField from '../../components/form/AppFormFileField';
import { userLog } from '../../utils/swal/user-log';

type Params = {
	restaurantId: string;
};

interface IForm {
	name: string;
	price: string;
	description: string;
	[key: string]: string;
}

const initialValues = {
	name: '',
	price: '',
	description: ''
};

const digitsOnly = (value?: string) => /^\d+$/.test(value!);

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required field.').min(3),
	price:
		Yup.string()
			.required('Price is required field.')
			.test('Digits only', 'Please enter the valid price!', digitsOnly),
	description: Yup.string().required('Description is required field.').min(3)
});

const AddDish = () => {
	const [
		localFile,
		setLocalFile
	] = useState<File | null>(null);
	const [
		previewSource,
		setPreviewSource
	] = useState<string | ArrayBuffer | null>('');
	const [
		uploading,
		setUploading
	] = useState(false);

	const handleFileInputChange = (e: any) => {
		const file = e.target.files[0];
		previewFile(file);
		setLocalFile(file);
	};

	const previewFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const { restaurantId } = useParams<Params>();

	const navigate = useNavigate();
	const [
		createDishMutation,_
	] = useCreateDishMutation({
		refetchQueries:
			[
				{
					query: MyRestaurantDocument,
					variables:
						{
							input:
								{
									id: restaurantId
								}
						}
				}
			]
	});

	const [
		optionsNumber,
		setOptionsNumber
	] = useState<number[]>([]);
	const onAddOptionClick = () => {
		setOptionsNumber((current: number[]) => [
			Date.now(),
			...current
		]);
	};
	const onDeleteClick = (
		idToDelete: number,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
	) => {
		setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
		setFieldValue(`${idToDelete}-optionName`, '');
		setFieldValue(`${idToDelete}-optionExtra`, '');
	};
	const handleSubmit = async (values: IForm, actions: any) => {
		try {
			if (!localFile) {
				await userLog('error', 'Please select a cover image for dish !');
				return;
			}
			const { name, price, description, ...rest } = values;
			const formBody = new FormData();
            formBody.append('file', localFile);
            setUploading(true);
			const { url: coverImg } = await (await fetch('http://localhost:4000/uploads/', {
				method: 'POST',
				body: formBody
			})).json();
			const optionObjects = optionsNumber.map((theId) => ({
				name: rest[`${theId}-optionName`],
				extra: +rest[`${theId}-optionExtra`]
			}));
			const res = await createDishMutation({
				variables:
					{
						input:
							{
								name,
								price: +price,
								description,
								restaurantId: restaurantId!,
								options: optionObjects,
								photo: coverImg
							}
					}
            });
            setUploading(false);
            	if (!res.data?.createDish.error) {
        actions.resetForm();
        await userLog('toast','New dish added successfully !!')
      navigate(-1);
      }
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="container flex flex-col items-center mt-52">
			<Helmet>
				<title>Add Dish | FoodiZone</title>
			</Helmet>
			<h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
			<Formik
				onSubmit={handleSubmit}
				className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{({ setFieldValue }) => {
					return (
						<div className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
							<AppFormField fieldName="name" placeholder="Name of dish" />
							<AppFormField fieldName="price" placeholder="Price of the dish" />
							<AppFormField fieldName="description" placeholder="Description for the dish" />
                            <AppFormFileField fieldName="file" accept="image/*" onChange={handleFileInputChange} />
                            {previewSource && <div className="bg-indigo-300 rounded-lg text-center overflow-hidden w-56 sm:w-96 mx-auto">
				<img alt='Dish' src={previewSource as string} className="object-cover h-48 w-full"/>
</div>}
							<div className="my-10">
								<h4 className="font-medium  mb-3 text-lg">Dish Options</h4>
								<span
									onClick={onAddOptionClick}
									className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
								>
									Add Dish Option
								</span>
								{optionsNumber.length !== 0 &&
									optionsNumber.map((id) => (
										<div key={id} className="mt-5">
											<AppFormField
												fieldName={`${id}-optionName`}
												className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
												placeholder="Option Name"
											/>
											<AppFormField
												fieldName={`${id}-optionExtra`}
												className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
												type="number"
												min={0}
												placeholder="Option Extra"
											/>
											<span
												className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
												onClick={() => onDeleteClick(id, setFieldValue)}
											>
												<FontAwesomeIcon icon={faTrash} />
											</span>
										</div>
									))}
							</div>
							<AppFormSubmitButton loading={uploading} title="Create Dish" />
						</div>
					);
				}}
			</Formik>
		</div>
	);
};

export default AddDish;
