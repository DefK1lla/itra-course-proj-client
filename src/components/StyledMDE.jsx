import React from 'react';

import { styled } from '@mui/material/styles'
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

const StyledMDE = ({ value, onChange, options }) => {
   const StyledEditor = React.useMemo(() => (
      styled(SimpleMDE)(({ theme }) => ({
         "& .fullscreen ": {
            display: 'none'
         },
         "& .side-by-side ": {
            display: 'none'
         },
         "& .CodeMirror": {
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
            backgroundColor: "inherit"
         },
         "& .editor-toolbar": {
            color: theme.palette.divider
         },
         "& .CodeMirror .CodeMirror-selected": {
            backgroundColor: theme.palette.divider
         },
         "& .cm-s-easymde .CodeMirror-cursor": {
            borderColor: theme.palette.text.primary
         },
         "& .editor-toolbar > *": {
            color: theme.palette.text.primary
         },
         "& .editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment": {
           backgroundColor: theme.palette.background.default
         },
         "& .editor-preview": {
           backgroundColor: theme.palette.background.default
         }
      }))
   ), []);

   return (
      <StyledEditor
         value={value} 
         onChange={onChange} 
         options={options} 
      />
   );
};

export default StyledMDE;