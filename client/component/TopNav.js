import { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined 
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";

// importing for signout
import { AuthContext } from '../context/auth'
import { useContext } from "react";
import { useRouter } from 'next/router'

const { SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  

  const [auth,setAuth] = useContext(AuthContext)

 

  const router = useRouter()
  const signOut =()=>{
    //remove from local storage 
    localStorage.removeItem("auth")
    
    //remove from context 
    setAuth({
      user:null,
      token:""
    })
    // redirect to login 
   
    router.push("/signin")


  }

  const roleBasedLink =()=>{
      if(auth?.user?.role === 'Admin')
      return '/admin'
      else if(auth?.user?.role === 'Author')
      return '/author'
      else
      return "/subscriber";
    
    };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link href="/">
          <a>CMS</a>
        </Link>
      </Menu.Item>
      {auth && auth.user===null &&(<>
        <Menu.Item key="signup" icon={<UserAddOutlined />} style={{ marginLeft: "auto" }}>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="signin" icon={<UserOutlined />}>
          <Link href="/signin">
            <a>Signin</a>
          </Link>
        </Menu.Item>
      </>
      )}
      
      


      {auth?.user!==null && (<><SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title={auth?.user?.name || "Dashboard"}
        style={{ marginLeft: "auto" }}
      >
        <Menu.ItemGroup title="Management">
          <Menu.Item key="setting:2">
            <Link href={roleBasedLink()}> 
              <a>Dashboard</a>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={()=>{signOut()}}>
      <Link href="/signin">
        <a>Sign Out</a>
      </Link>
    </Menu.Item>
    </>
      )}
      <Menu.Item>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
