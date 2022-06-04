import React, {useState} from 'react'
import "./Header.css";
import { Link } from "react-router-dom";
import{
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
}  from '@mui/icons-material';

import MessageIcon from '@mui/icons-material/Message';


const Header = () => {
 
    const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className='header'>

        <Link to="/" onClick={()=>setTab('/')}>
            {
                tab === "/" ? <Home style={{color:"black"}}/> : <HomeOutlined/>  
            }
        </Link>    

        <Link to="/newpost" onClick={()=>setTab('/newpost')}>
            
            {
                tab === "/newpost" ? <Add style={{color:"black"}}/> :  <AddOutlined/>
            }
        </Link>    

        <Link to="/search" onClick={()=>setTab('/search')}>
            {
                tab === "/search" ? <Search style={{color:"black"}}/> :  <SearchOutlined/>
            }
        </Link>    

        <Link to="/account" onClick={()=>setTab('/account')}>
            {
                tab === "/account" ? <AccountCircle style={{color:"black"}}/> : <AccountCircleOutlined/>
            }
        </Link>   

        <Link to="/messanger" onClick={()=>setTab('/messanger')}>
            {
                tab === "/messanger" ? <MessageIcon style={{color:"black"}}/> : <MessageIcon/>
            }
        </Link>   

    </div>
  )
}

export default Header