import { Box } from '@mui/material'
import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
  return (
    <Box
        component="span"
        onClick={onClick}
        sx={{
            border: '1px solid gold',
            borderRadius: 2,
            padding: "10px 20px",
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&: hover" : {
                backgroundColor: "gold",
                color: "black",
            },
            // width: "22%",
            flex: "1 1 auto",
            minWidth: "120px",
            maxWidth: "200px",
            margin: "5px",
            textAlign: "center",
        }}
        >
      {children}
    </Box>
  )
}

export default SelectButton
