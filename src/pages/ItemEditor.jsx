import React from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
 
import { 
   Container, 
   Paper, 
   TextField, 
   NativeSelect, 
   Autocomplete,
   Chip,
   Stack, 
} from '@mui/material';


import UserState from '../store/UserState';

import collectionApi from '../http/collectionAPI';
import itemApi from '../http/itemAPI';
import tagApi from '../http/tagAPI';

import EditorControls from '../components/EditorControls';
import Fieldset from '../components/Fieldset';

const ItemEditor = () => {
   const intl = useIntl();
   const { id } = useParams();
   const navigate = useNavigate();
   const location = useLocation();
   
   const userId = location.state?.userId;
   const collectionId = location.state?.collectionId;

   const [collections, setCollections] = React.useState([]);
   const [fields, setFields] = React.useState([]);
   const [options, setOptions] = React.useState([]);
   const [tags, setTags] = React.useState([]);

   const { 
      register, 
      control, 
      setValue,
      getValues,
      reset,
      formState: {
         errors
      }, 
      handleSubmit 
   } = useForm({
      defaultValues: {
         title: '',
         collectionRef: 'selectColection'
      },
      mode: 'onSubmit'
   });

   const fetchData = React.useCallback(async () => {
      const collections = await collectionApi.getUserCollections(UserState.userData._id);
      setCollections(collections);

      if (id) {
         const item = await itemApi.getForEdit(id);
         setValue('title', item.title);
         setValue('collectionRef', item.collectionRef);
         setTags(item.tags);

         await fetchFields(item.collectionRef);
         setFields(prevState => prevState.map(field => {
               return {
                  ...field,
                  value: item.fields.find(itemField => itemField.fieldRef._id === field._id)?.value
               };
            })
         );
      }

   }, [setValue, id]);

   const fetchFields = async (id) => {
      const fields = await collectionApi.getFields(id);
      setFields(fields ? fields : []);
   };

   const handleCollectionChange = (event) => fetchFields(event.target.value);
   
   const handleTagChange = async (event) => {
      if (event.target.value) {
         const tags = await tagApi.autocomplete(event.target.value);
         setOptions(tags);
      }
   };

   const onSubmit = async (data) => {
      data.tags = tags;

      if (fields.length) {
         data.fields = data.fields.map(field => {
            const fieldId = fields.find(f => f.title === Object.keys(field)[0])._id;
            const value = field[Object.keys(field)[0]];
            return {
               fieldRef: fieldId,
               value: value
            };
         });
      }

      if (id) {
         const updatedCollection = await itemApi.update(data, id);
         navigate(`/item/${updatedCollection._id}`);
      } else {
         data.userRef = userId || UserState.userData._id;
         const createdItem = await itemApi.create(data);
         navigate(`/item/${createdItem._id}`);
      }
   };

   React.useEffect(() => {
      reset();
      setTags([]);
      setFields([]);
      fetchData();

      if (collectionId) {
         setValue('collectionRef', collectionId);
         fetchFields(collectionId);
      }
   }, [fetchData, reset, setValue, collectionId]);

   return (
      <Container>
         <Paper 
            sx={{ 
               maxWidth: 500,
               my: 3,
               mx: 'auto',
               p: 2 
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
         > 
            <Stack
               spacing={2}
            >
               <TextField
                  fullWidth
                  placeholder={intl.formatMessage({ id: 'item-editor.title-placeholder' })}
                  variant='standard'
                  error={Boolean(errors?.title)}
                  {...register('title', { required: true })}
                  defaultValue={getValues('title')}
               />

               <NativeSelect
                  fullWidth
                  {...register('collectionRef', { 
                     required: true,
                     validate: (value) => value !== 'selectColection'
                  })}
                  defaultValue={getValues('collectionRef')}
                  onChange={handleCollectionChange}
                  error={Boolean(errors?.collectionRef)}
               >
                  <option 
                     value={'selectColection'} 
                     disabled
                  >
                     <FormattedMessage id='item-editor.collection-placeholder' />
                  </option>
                  {collections.map(collection =>  (
                     <option 
                        key={collection._id}
                        value={collection._id}
                     >
                        {collection.title}
                     </option>
                     )
                  )}
               </NativeSelect>

               {fields.length !== 0 &&
                  <Fieldset 
                     fields={fields}
                     register={register}
                     control={control}
                     errors={errors}
                  />
               }

               <Autocomplete
                  multiple
                  freeSolo
                  options={options.map(option => option.title) || []}
                  filterOptions={option => option }
                  value={tags}
                  onChange={(e, value) => setTags(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={params => (
                    <TextField
                        {...params}
                        placeholder={intl.formatMessage({ id: 'item-editor.tags-placeholder' })}
                        variant='standard'
                        onChange={handleTagChange}
                    />
                  )}
               />
               <EditorControls />
            </Stack>
         </Paper>
      </Container>
   );
};

export default ItemEditor;