import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { Stack, Typography, Button, NativeSelect, TextField } from '@mui/material';

const FieldsGenerator = ({ fields, append, remove, register, errors, control, fieldTypes }) => {
   const intl = useIntl();

   return (
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
                  direction={{ 
                     xs: 'column', 
                     sm: 'row' 
                  }}
                  component='fieldset'
                  spacing={1}
                  key={item.id}
               >

                  <NativeSelect
                     {...register(`fields.${index}.type`, { 
                        required: true,
                        validate: (value) => value !== 'selectType'
                     })}
                     error={Boolean(errors?.fields?.[index].type)}
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
                     error={Boolean(errors?.fields?.[index].title)}
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
   );
};

export default FieldsGenerator;