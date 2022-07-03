import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Typography } from '@mui/material'

const Feed = () => {
   return (
      <Typography variant='h1' component='h2'>
         <FormattedMessage id='hello.world' />
      </Typography>
   )
}

export default Feed
