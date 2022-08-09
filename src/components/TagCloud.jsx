import { Link as RouterLink } from 'react-router-dom';

import { Grid, Chip } from '@mui/material';

const TagCloud = ({ tags }) => {
   return(
      <Grid
         container
         spacing={1}
      >
         {tags.map(tag => 
            <Grid
               key={tag}
               item
            >
               <Chip 
                  sx={{ cursor: 'pointer' }}
                  component={RouterLink}
                  to={`/search?keyword=${tag}`}
                  label={`${tag}`}
                  variant='outlined'
               />
            </Grid>
         )}
      </Grid>
   );
};

export default TagCloud;