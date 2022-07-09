import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import { 
   Container, 
   Paper, 
   Stack, 
   TextField,  
   NativeSelect,
   Box
} from '@mui/material';

import SettingsState from '../store/SettingsState';
import UserState from '../store/UserState';

import Filefield from '../components/Filefield';
import StyledMDE from '../components/StyledMDE';
import FieldsGenerator from '../components/FieldsGenerator';
import Loading from '../components/Loading';
import EditorControls from '../components/EditorControls';

import fileApi from '../http/fileAPI';
import collectionApi from '../http/collectionAPI';
import { getThemes } from '../http/themeAPI';

const CollectionEditor = ({ userId }) => {
   const fieldTypes = ['text', 'textarea', 'checkbox', 'date', 'number'];
   const fileTypes = ['JPEG', 'JPG', 'PNG'];

   const intl = useIntl();
   const descrPlaceholder = intl.formatMessage({ id: 'collection-editor.description-placeholder' });

   const { id } = useParams();

   const navigate = useNavigate();

   const [isLoading, setIsLoading] = React.useState(true);
   const [descr, setDescr] = React.useState('');
   const [imgSrc, setImgSrc] = React.useState(null);
   const [imgLoading, setImgLoading] = React.useState(false);
   const [themes, setThemes] = React.useState([]);

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
         theme: 'selectTheme'
      },
      mode: 'onSubmit'
   });

   const {
      fields,
      append,
      remove, 
   } = useFieldArray({
      control,
      name: "fields"
   });

   const fetchData = React.useCallback(async () => {
      const themes = await getThemes();
      setThemes(themes);
      
      if (id) {
         try {
            const currentCollection = await collectionApi.getWithFields(id);

            setImgSrc(currentCollection.imgSrc ? currentCollection.imgSrc : null);
            setValue('title', currentCollection.title);
            setValue('theme', themes.find(theme => 
               theme.title.ru === currentCollection.theme || theme.title.en === currentCollection.theme
            ).title[SettingsState.locale]);
            setDescr(currentCollection.description);
            currentCollection.fields.map(field => append(field, { shouldFocus: false }));

         } catch (e) {
            console.log(e);
            navigate('/');
         }
      }

      setIsLoading(false);
   }, [append, navigate, id, setValue]);

   React.useEffect(() => {
      reset();
      setDescr('');
      fetchData();
   }, [fetchData, reset]);

   const onDescrChange = React.useCallback((value) => {
      setDescr(value);
   }, []);

   const handleFileUpload = async (fileToUpload) => {
      setImgLoading(true);

      const formData = new FormData();
      formData.append('file', fileToUpload);

      const url = await fileApi.upload(formData);

      setImgLoading(false);
      setImgSrc(url);
   };

   const handleFileDelete = () => setImgSrc(null);

   const onSubmit = async (data) => {
      data.description = descr;
      data.imgSrc = imgSrc ?? '';
      
      data.themeRef = themes.find(theme => 
         theme.title[SettingsState.locale] === data.theme
      )._id;
      data.userRef = userId || UserState.userData._id;

      const { fields, ...newCollection } = data;

      if (id) {
         console.log(newCollection)
         const updatedCollection = await collectionApi.update(id, newCollection, fields);
         navigate(`/collection/${updatedCollection._id}`);
      } else {
         const createdCollection = await collectionApi.create(newCollection, fields);
         navigate(`/collection/${createdCollection._id}`);
      }
   };

   if (isLoading) return <Loading />

   return (
      <Container>
         <Paper 
            sx={{ 
               my: 3, 
               p: 2 
            }}
         > 
            <Stack
               spacing={2}
               component='form'
               onSubmit={handleSubmit(onSubmit)}
            >
               <Filefield 
                  fileTypes={fileTypes}
                  handleUpload={handleFileUpload}
                  handleDelete={handleFileDelete}
                  file={imgSrc}
               />

               {imgLoading  &&
                  <Loading 
                     height={200}
                  />
               }

               {imgSrc && 
                  <Box 
                     sx={{ 
                        maxWidth: '100%', 
                        alignSelf: 'center' 
                     }}
                     component='img' 
                     src={imgSrc} 
                  />
               }

               <TextField
                  InputProps={{ style: { fontSize: 32, fontWeight: 600 } }}
                  variant='standard'
                  placeholder={intl.formatMessage({ id: 'collection-editor.title-placeholder' })}
                  size='medium'  
                  fullWidth
                  {...register('title', { required: 'Field is requried' })}
                  error={Boolean(errors?.title?.message)}
               />

               <NativeSelect
                  {...register('theme', { 
                     required: true,
                     validate: (value) => value !== 'selectTheme'
                  })}
                  defaultValue={getValues('theme')}
                  error={Boolean(errors?.theme)}
               >
                  <option 
                     value={'selectTheme'} 
                     disabled
                  >
                     <FormattedMessage id='collection-editor.field-theme-placeholder'/>
                  </option>
                  {themes.map(theme => (
                     <option 
                        key={theme._id}
                        value={theme.title[SettingsState.locale]}
                     >
                        {theme.title[SettingsState.locale]}
                     </option>
                     )
                  )}
               </NativeSelect>

               <StyledMDE
                  value={descr} 
                  onChange={onDescrChange} 
                  placeholder={descrPlaceholder} 
               />

               <FieldsGenerator 
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  errors={errors}
                  control={control}
                  fieldTypes={fieldTypes}
               />

               <EditorControls />
            </Stack>
         </Paper>
      </Container>
   );
};

export default CollectionEditor;