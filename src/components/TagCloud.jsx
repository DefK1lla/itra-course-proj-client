import { Grid, Chip } from '@mui/material';

const TagCloud = ({ tags }) => {
   return(
      <Grid
         container
         spacing={1}
      >
         {tags.map(tag => 
            <Grid
               item
            >
               <Chip 
                  label={`${tag}`}
                  variant='outlined'
                  onClick={e => console.log(e)}
               />
            </Grid>
         )}
      </Grid>
   );
};

export default TagCloud;