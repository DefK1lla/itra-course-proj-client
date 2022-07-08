import { Stack, FormControlLabel, TextField, Checkbox } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { Controller } from 'react-hook-form';

import SettingsState from '../store/SettingsState';


const Fieldset = ({ fields, register, control, errors }) => {
   const localeMap = {
     en: enLocale,
     ru: ruLocale,
   };

   return (
      <fieldset
         name='fields'
      >
         <Stack
            spacing={2}
         >
            {fields.map((field, index) => {
               if (field.type === 'checkbox') {
                  return (
                     <FormControlLabel
                        key={field._id} 
                        control={
                           <Checkbox />
                        } 
                        label={field.title} 
                        {
                           ...register(`fields[${index}].${field.title}`, 
                           { required: false })
                        }
                     />
                  );
               }
   
               if (field.type === 'date') {
                  return (
                     <Controller
                        key={field._id}
                        name={`fields[${index}].${field.title}`} 
                        control={control} 
                        defaultValue={new Date()}
                        render={({ field }) => 
                           <LocalizationProvider 
                              dateAdapter={AdapterDateFns}
                              adapterLocale={localeMap[SettingsState.locale]}
                           > 
                              <DesktopDatePicker
                                 {...field}
                                 defaultValue={new Date()}
                                 label={field.title}
                                 inputFormat="dd.MM.yyyy"
                                 renderInput={(props) => 
                                    <TextField
                                       fullWidth
                                       variant='standard'
                                       {...props} 
                                    />
                                 }
                              /> 
                           </LocalizationProvider> 
                        } 
                     />
                  );
               }

               if (field.type === 'textarea') {
                  return (
                     <TextField
                        key={field._id}
                        label={field.title}
                        multiline
                        rows={10}
                        variant="standard"
                        error={Boolean(errors?.fields?.[index]?.[field.title])}
                        {
                           ...register(`fields[${index}].${field.title}`, 
                           { required: true })
                        }
                     />
                  );
               }

               return (
                  <TextField
                     key={field._id}
                     label={field.title}
                     type={field.type}
                     rows={10}
                     variant='standard'
                     error={Boolean(errors?.fields?.[index]?.[field.title])}
                     {
                        ...register(`fields[${index}].${field.title}`, 
                        { required: true })
                     }
                  />
               );

            })}
         </Stack>
      </fieldset>
   );
};

export default Fieldset;