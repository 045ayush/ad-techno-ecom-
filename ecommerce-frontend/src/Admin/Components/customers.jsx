// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, Button, CardHeader, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  getALLUser
} from "../../Redux/Auth/Action"; 
import { useEffect } from 'react'






const Customers = () => {
  const {users,user,auth_Loading,auth_error, } = useSelector((store) => store.auth);

  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {   
    dispatch(getALLUser());
  }, [dispatch]);

  
  const handleDetail=(userId)=>{
    console.log("hii");
    
    navigate(`/admin/user/${userId}`)
  }
  return (
    <Box>
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>User Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Details</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item) => (
              <TableRow hover key={item.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.firstName+" "+item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                >
                <Button
                      onClick={() => handleDetail(item.id)}
                      variant="text"
                    >
                      details
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </Box>
   
  )
}

export default Customers;
