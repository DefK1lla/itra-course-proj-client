import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import { 
   Container, 
   Paper, 
   Stack, 
   Typography, 
   Button, 
   TextField,  
   NativeSelect,
   Box
} from '@mui/material';

import Filefield from '../components/Filefield';
import StyledMDE from '../components/StyledMDE';

import { upload } from '../http/fileAPI';

const CollectionEditor = () => {
   const fieldTypes = ['text', 'textarea', 'checkbox', 'date', 'number'];
   const fileTypes = ['JPEG', 'JPG', 'PNG'];

   const intl = useIntl();
   const descrPlaceholder = intl.formatMessage({ id: 'collection-editor.description-placeholder' });

   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   const [descr, setDescr] = React.useState('');
   const [imgSrc, setImgSrc] = React.useState(null);

   const options = React.useMemo(() => ({
      spellChecker: false,
      maxHeight: '300px',
      autofocus: true,
      placeholder: descrPlaceholder,
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }), [descrPlaceholder]);

   const { 
      register, 
      control, 
      formState: {
         errors
      }, 
      handleSubmit 
   } = useForm({
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

   const onSubmit = (data) => {
      if(descr) data.description = descr;
      if(imgSrc) data.imgSrc = imgSrc;
      console.log(data)
   };

   const onDescrChange = React.useCallback((value) => {
      setDescr(value);
   }, []);

   const handleFileUpload = async (file) => {
      const formData = new FormData();
      formData.append('img', file);
      const url = await upload(formData);
      setImgSrc(url);
   };

   const handleFileDelete = () => setImgSrc(null);

   return (
      <Container>
         <Paper sx={{ my: 3, p: 2 }}>
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

               {imgSrc && 
                  <Box 
                     sx={{ maxWitdth: 400, alignSelf: 'center' }}
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

               <StyledMDE
                  value={descr} 
                  onChange={onDescrChange} 
                  options={options} 
               />

                <Stack
                  spacing={2}
                  alignItems='start'
               >

                  <Typography
                     variant='body'
                     component='p'
                  >
                     Need more fields?                        
                  </Typography>

                  <Button
                     size='small'
                     variant='contained'
                     onClick={() => {
                       append({ type: 'selectType', title: '' });
                     }}
                  >
                     Add field
                  </Button>

                  {fields.map((item, index) => {
                     return (
                        <Stack
                           sx={{ border: 0, p: 0 }}
                           direction={{ xs: 'column', sm: 'row' }}
                           component='fieldset'
                           spacing={1}
                           key={item.id}>

                           <NativeSelect
                              {...register(`fields.${index}.type`, { 
                                 required: true,
                                 validate: (value) => value !== 'selectType'
                              })}
                              error={Boolean(errors?.fields?.[index].type?.type)}
                           >
                              <option 
                                 value={'selectType'} 
                                 disabled
                              >
                                 <FormattedMessage id='collection-editor.field-type-placeholder'/>
                              </option>
                              {fieldTypes.map(type => 
                                 <option 
                                    key={type}
                                    value={type}
                                 >
                                    <FormattedMessage id={`collection-editor.field-type-${type}`} />
                                 </option>
                              )}
                           </NativeSelect>

                           <TextField
                              variant='standard'
                              placeholder={intl.formatMessage({ id: 'collection-editor.field-title-placeholder' })}
                              {...register(`fields.${index}.title`, { required: 'Field is requried' })}
                              error={Boolean(errors?.fields?.[index].title?.message)}
                              control={control}
                           />
                           <Button
                              color='error'
                              size='small'
                              onClick={() => remove(index)}
                           >
                              <FormattedMessage id='collection-editor.field-delete-button' />
                           </Button>
                        </Stack>
                     );
                  })}
               </Stack>

               <Stack
                  direction='row'
                  spacing={2}
               >
                  <Button
                     size='large'
                     variant='contained'
                     type='submit'
                  >
                     <FormattedMessage id='collection-editor.save-button' />
                  </Button>

                  <Button
                     size='small'
                     onClick={goBack}
                  >
                     <FormattedMessage id='collection-editor.cancell-button' />
                  </Button>
               </Stack>
            </Stack>
         </Paper>
      </Container>
   );
};

export default CollectionEditor;