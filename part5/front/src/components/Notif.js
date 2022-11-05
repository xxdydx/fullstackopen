import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Notif = ({error, success }) => {

    if (error === null && success === null) {
      return null
    }
    else if (error === null) {
      return (    
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{success}</Alert>
    </Stack>
    )

    }
  
    return (
      
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
    </Stack>

      
    )
  }

  export default Notif