import { Layout } from 'antd'

const {Content,Sider} = Layout
import AdminNav from '../nav/AdminNav';
function AdminLayout({children}){
    return (

        <Layout>
           
           <AdminNav></AdminNav>

            <Layout>
               <Content style={{padding:"10px"}}>{children}</Content>
            </Layout>
        </Layout>
        
    );
}

export default AdminLayout;