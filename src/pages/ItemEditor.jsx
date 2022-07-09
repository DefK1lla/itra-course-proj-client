import React from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import tagApi from '../http/tagApi';

import EditorControls from '../components/EditorControls';
import Fieldset from '../components/Fieldset';

const ItemEditor = ({ collectionId, userId }) => {
   const intl = useIntl();
   const { id } = useParams();
   const navigate = useNavigate();

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
         setFields(item.fields?.map(field => {
            return {
               ...field.fieldRef,
               value: field.value
            }
         }));
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

   const valueFormatter = (value) => {
      if (value instanceof Date) return value.toLocaleDateString();
      return value;
   };

   const onSubmit = async (data) => {
      data.tags = tags;
      data.fields = data.fields?.map(field => {
         const fieldId = fields.find((f) => {
            return f.title === Object.keys(field)[0]
         })._id;
         const value = field[Object.keys(field)[0]];
         return {
            fieldRef: fieldId,
            value: valueFormatter(value)
         };
      });

      console.log(data.tags)

      if (id) {
         const updatedCollection = await itemApi.update(data, id);
         navigate(`/item/${updatedCollection._id}`);
      } else {
         const createdItem = await itemApi.create(data);
         navigate(`/item/${createdItem._id}`);
      }
   };

   React.useEffect(() => {
      reset();
      setFields([]);
      fetchData();
   }, [fetchData, reset]);

   React.useEffect(() => {
      if (collectionId) {
         setValue('collectionRef', collectionId);
         fetchFields(collectionId);
      }
   }, [setValue, collectionId]);

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
                  onChange={(e, value) => setTags(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={params => (
                    <TextField
                        {...params}
                        placeholder='Tags'
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