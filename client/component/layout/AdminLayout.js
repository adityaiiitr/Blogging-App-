import { Layout } from 'antd'

const {Content} = Layout
import AdminNav from '../nav/AdminNav';
function AdminLayout({children}){
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