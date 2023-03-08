import { useState } from "react"; //inside fuctional component
// no need of class component
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined

} from "@ant-design/icons";

import ToggleTheme from "./ToggleTheme";

// NO Loading { Link } tag (react-router-dom) alternative is there in next
import Link from 'next/link'
//No destructuring here
 


const { SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="dark">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link href="/">
            <a>CMS</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="signup" icon={<UserAddOutlined />}>
      <Link href="/signup">
            <a>SignUp</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="signin" icon={<UserOutlined />}>
      <Link href="/signin">
            <a>SignIn</a>
        </Link>
      </Menu.Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Dashboard"
        style={{marginLeft:"auto"}}
      >
        <Menu.ItemGroup title="Management">

          <Menu.Item key="setting:2">
            <Link href="/admin">
                <a>Admin</a>
            </Link>
            
          </Menu.Item>
        </Menu.ItemGroup>
        
      </SubMenu>
      {/* we don't need to apply margin here its already applied above so it will be alligned */}
      
      {/* <Menu.Item style={{marginLeft:"auto"}}> */}
        {/* <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a> */}
      <Menu.Item>
        <ToggleTheme/>
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
