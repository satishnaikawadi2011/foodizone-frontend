import { useEffect, useState } from 'react';
import { CreateRestaurantMutation, MyRestaurantsDocument, useAllCategoriesQuery, useCreateRestaurantMutation } from '../../generated/graphql';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet-async';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import AppFormSubmitButton from '../../components/form/AppFormSubmitButton';
import AppFormError from '../../components/form/AppFormError';
import AppFormFileField from '../../components/form/AppFormFileField';
import { userLog } from '../../utils/swal/user-log';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AppFormSelectField from '../../components/form/AppFormSelectField';
import AppLoader from '../../components/shared/AppLoader';


interface IFormProps {
	name: string;
    address: string;
	category: string;
	file: FileList|null;
}

const initialValues: IFormProps = {
    name: '',
    category: '',
	address: '',
	file:null
};

const validationSchema = Yup.object({
	name: Yup.string().required('Name is a required field.').min(3),
	address:
		Yup.string()
            .required('Address is a required field.'),
	category: Yup.string().required('Category is a required field.'),
	file:Yup.object().nullable(true),
});


const AddRestaurant = () => {
	const [localFile, setLocalFile] = useState<File | null>(null);
	const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState('')
  const [values, setValues] = useState<IFormProps>(initialValues)
  
  const {data:allCategoriesResult,loading:allCatLoading} = useAllCategoriesQuery()

	const client = useApolloClient()
	const navigate = useNavigate();
    const handleFileInputChange = (e:any) => {
        const file = e.target.files[0];
		previewFile(file);
		setLocalFile(file)
    };

    const previewFile = (file:File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
	};

    const onCompleted = async(d:CreateRestaurantMutation) => {
        const { createRestaurant:{ok,restaurantId} } = d;
        if (ok) {
             const { name, category:categoryName, address } = values;
      setUploading(false);
      const queryResult = client.readQuery({ query: MyRestaurantsDocument });
      client.writeQuery({
        query: MyRestaurantsDocument,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
	  });
      }
	};

	const [createRestaurant, { data }] = useCreateRestaurantMutation({onCompleted})
    
	const handleSubmit = async (values: IFormProps, actions: any) => {
		try {
			if (!localFile) {
				await userLog('error', 'Please select a cover image for restaurant !')
				return;
			}
			setUploading(true);
			setValues(values);
      const {  name, category, address } = values;
      const formBody = new FormData();
      formBody.append("file", localFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
			).json();
			setImageUrl(coverImg);
      const res = await createRestaurant({
        variables: {
          input: {
            name,
            categorySlug:category,
            address,
            coverImg,
          },
        },
	  });
			if (!res.data?.createRestaurant.error) {
        actions.resetForm();
        await userLog('toast','New Restaurant added successfully !!')
      navigate("/");
      } 
		 } catch (e) {
			 console.log(e)
	}
		
  };
  
  if (allCatLoading || !allCategoriesResult) {
    	return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
  }

	return <div className="container flex flex-col items-center mt-52">
			 <Helmet>
        <title>Add Restaurant | FoodiZone</title>
      </Helmet>
				<h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
				<AppForm
					className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="name" placeholder="Enter name of restaurant" />
			<AppFormField fieldName="address" placeholder="Enter address of resturant" />
			<AppFormSelectField fieldName="category" placeholder="Select a category of resturant"  options={allCategoriesResult.allCategories.categories!.map(c => ({label:c.name,value:c.slug}))}/>
			<AppFormFileField fieldName='file' accept='image/*' onChange={handleFileInputChange} />
			{previewSource && <div className="bg-indigo-300 rounded-lg text-center overflow-hidden w-56 sm:w-96 mx-auto">
				<img alt='Restaurant' src={previewSource as string} className="object-cover h-48 w-full"/>
</div>}
					<AppFormSubmitButton loading={uploading} title="Add Restaurant" />
					{data?.createRestaurant?.error && <AppFormError errorMessage={data.createRestaurant.error}/>}
				</AppForm>
			</div>
};

export default AddRestaurant;
