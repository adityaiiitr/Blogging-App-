import { Layout } from 'antd'
import AdminLayout from '../../component/layout/AdminLayout';

const {Content,Sider} = Layout
function Admin (){
    return (

     <AdminLayout>
        <h1>this is adimin page props</h1>
        <p>this is affed judt to check</p>
     </AdminLayout>
        
    );
}

export default Admin;