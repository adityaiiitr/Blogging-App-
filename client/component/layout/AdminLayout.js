import { Layout } from 'antd'
const {Content} = Layout

import AdminNav from '../nav/AdminNav';

import {AuthContext} from "../../context/auth"
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LoadingOutlined } from "@ant-design/icons";


function AdminLayout({children}){
    // const data = JSON.parse(localStorage.getItem("auth")) // localstorage Not Available when rendering on server side environmnet
    const [auth,setAuth] = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

      useEffect(()=>{
        // if(auth?.user?.role !== 'Admin')
        // router.push('/')
        // else
        // setLoading(false)
      
        if(auth?.token) getCurrentAdmin()

        
      },[auth?.token])

      const getCurrentAdmin = async () =>{
        try{
          const {data} = await axios.get("/current-admin")
          // console.log(data)
          setLoading(false)

        }catch (err){
          console.log(err)
          router.push('/')
        }

      }

      if(loading)
      return (
      // <h1>Please Wait...</h1>
      
        <LoadingOutlined
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "50px",
            color: "#001529",
          }}
        />

      ) // here we can add a spinner

      

    return (
        

        <Layout>
           
           <AdminNav/>

            <Layout>
               <Content style={{padding:"10px"}}>{children}</Content>
            </Layout>
        </Layout>
        
    );
}

export default AdminLayout;