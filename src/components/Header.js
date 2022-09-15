import React,{useState,useEffect}from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../redux/actions/action';
import Table from 'react-bootstrap/esm/Table';
// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-bootstrap';
const Header = () => {
  const [price,setPrice] = useState(0);
  

      const getdata = useSelector((state)=> state.cartreducer.carts);
      

      const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const dlt = (id)=>{
      dispatch(DLT(id))
  }


  const total = ()=>{
      let price = 0;
      getdata.map((ele,k)=>{
        return  price = ele.price * ele.qnty + price
      });
      setPrice(price);
  };

  useEffect(()=>{
      total();
  },[total])

  return (
    <div>
       <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className='text-decoration-none text-light mx-3'>Add to Cart</NavLink>
          <Nav className="me-auto">
            <Nav.Link to="/" className='text-decoration-none text-light'>Home</Nav.Link>
          </Nav>

          <Badge badgeContent={4} color="primary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
          >
          <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:25,cursor:"pointer"}}></i>
         </Badge>
        </Container>
      <Menu
         id="basic-menu"
         anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >  


        {
        getdata.length ? 
        <div className='card_details' style={{width:"24rem",padding:10}}>
          <Table>
                  <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Restaurant Name</th>
                         </tr>
                 </thead>
                <tbody>
                   {
                      getdata.map((e)=>{
                          return (
                              <>
                                  <tr>
                                      <td>
                                      <NavLink to={`/cart/${e.id}`}   onClick={handleClose}>
                                      <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                                      </NavLink>   
                                      </td>
                                      <td>
                                          <p>{e.rname}</p>
                                          <p>Price : ₹{e.price}</p>
                                          <p>Quantity : {e.qnty}</p>
                                          <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                              <i className='fas fa-trash smalltrash'></i>
                                          </p>
                                      </td>

                                      <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}}  onClick={()=>dlt(e.id)}>
                                      <i className='fas fa-trash largetrash'></i>
                                      </td>
                                  </tr>
                              </>
                          )
                      })
                    }
                          <p className='text-center'>Total :₹ {price}</p>
                  </tbody>
           </Table>
         </div>:
      
              <div className='card_details d-flex justify-content-centre align-item-centre' style={{width:"24rem",padding:10,position:"relative"}} >
                <i className='fas fa-close smallclose' onClick={handleClose} style={{position : "absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
                <p style={{fontSize:22}}>Your cart is Empty</p>
                <img src='./cart.gif' alt='' className='emptycart_img' style={{width:"5rem",padding:10}}/>
             </div>
            }
     </Menu>
   </Navbar>

  </div>
)
}

export default Header
