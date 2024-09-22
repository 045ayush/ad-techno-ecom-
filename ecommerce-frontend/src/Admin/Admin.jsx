import React, { useEffect, useState } from 'react'
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import PeopleIcon from '@mui/icons-material/People';
import { deepPurple } from "@mui/material/colors";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Components/Dashboard';
import AllVariants from './Components/AllVariants';
import AllProducts from './Components/AllProducts';
import OrdersTable from './Components/OrdersTable';
import Customers from './Components/customers';
import AddProduct from './Components/CreateProductForm/CreateProductFrom';
import AddVariant from './Components/CreateProductForm/CreateVariant';
import AdminNavbar from './Navigation/AdminNavbar';
import OrderDetails from './Components/OrderDetails';
import UserDetails from './Components/userDetails';
import LoginUserForm from './Login';
import { getUser, logout } from "../Redux/Auth/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 240;

const menu = [
    // {name:"Dashboard",path:"/admin"},
    {name:"Variants",path:"/admin/variants"},
    {name:"Products",path:"/admin/products"},
    {name:"Customers",path:"/admin/customers"},
    {name:"Orders",path:"/admin/orders"},
    // {name:"Total Earnings",path:"/admin"},
    // {name:"Weekly Overview",path:"/admin"},
    {name:"Add Product",path:"/admin/product/create"},
  ];

export const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const { user, auth_Loading, auth_error } = useSelector((state) => state.auth);    
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
      if (jwt) {
        dispatch(getUser(jwt));
      }
      console.log(user);
      
    }, [jwt]);

    const handleLogout = () => {
      dispatch(logout());
      navigate("/admin")
    };

    const drawer = (
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {menu.map((item, index) => (
            <ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <ShopTwoIcon /> :
                  index===1? <ShoppingCartIcon />:
                  index===2?<PeopleIcon></PeopleIcon>:
                  index===3?<LocalShippingIcon></LocalShippingIcon>:
                  index===4?<AddCardIcon></AddCardIcon>:<LabelIcon></LabelIcon>}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
  
        <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Divider />
         
          <ListItem onClick={handleLogout}  disablePadding >
              <ListItemButton>
              <Avatar
  className="text-white"
  onClick={handleLogout}
  sx={{
    width: 32,           // Set width to 32px
    height: 32,          // Set height to 32px
    fontSize: 16,        // Set font size to 16px
    color: "white",
    cursor: "pointer",
  }}
>
  {user?.firstName[0].toUpperCase()}
</Avatar>

                <ListItemText className="ml-5" primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          
        </List>
      </Box>
    );

    const handleSideBarViewInMobile = () => {
      setSideBarVisible(true);
    };
  
    const handleCloseSideBar = () => {
      setSideBarVisible(false);
    };

    const drawerVariant = isLargeScreen ? "permanent" : "temporary";
  
  return (
    <div>
      {!isLargeScreen&&<AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />}
      { user?.role=="ADMIN" ? <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}`,paddingTop: `${isLargeScreen ? "0px" : "54px"}`}}>
        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                  {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={ <Dashboard />}></Route>
            <Route path="/product/create" element={<AddProduct/>}></Route>
            <Route path="/variant/create" element={<AddVariant/>}></Route>
            {/* <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route> */}
            <Route path="/variants" element={<AllVariants/>}></Route>
            <Route path="/products" element={<AllProducts/>}></Route>
            <Route path="/orders" element={<OrdersTable/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/order/:orderId" element={<OrderDetails/>}></Route>
            <Route path="/user/:userId" element={<UserDetails/>}></Route>
            {/* <Route path="/demo" element={<DemoAdmin />}></Route> */}
          </Routes>
        </Box>
      </Box>:<div className='flex justify-center items-center'> 
      <Box className="rounded-md" sx={style}>
      <LoginUserForm></LoginUserForm>
      </Box>

      </div>}

    </div>
  )
}
