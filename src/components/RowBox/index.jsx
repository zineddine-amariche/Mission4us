import { Box } from '@mui/system'
import React from 'react'
import useStyles from './styles'

const RowBox = ({children}) => {

   const classes = useStyles()
  return (
    <Box className={classes.conatiner} >{children}</Box>
  )
}

export default RowBox



