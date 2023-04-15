import { useState, useEffect } from "react";
import { Layout } from "antd";
import AdminLayout from "../../../component/layout/AdminLayout";
import { Form, Input, Row, Col, Button,List } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Content, Sider } = Layout;

function Categories() {
  // state
  const [loading, setLoading] = useState(false);

  //hooks 
  const [form] =Form.useForm();

  // Bring in all the data to frontend
  const [categories,setCategories]= useState([])
  useEffect(()=>{
    getCategories();
  },[])

  const getCategories=async()=>{
    try{
      const {data} = await axios.get('/categories');
      setCategories(data);
    }catch(err){
      console.log(err);
    }
  }


  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/category", values);
      setCategories([data,...categories]);
      console.log(data);
      toast.success("Category created successfully");
      setLoading(false);
      form.resetFields(['name']);
    } catch (err) {
      console.log(err);
      toast.error("Category create failed");
      setLoading(false);
    }
  };
  return (
    <AdminLayout>
      <Row>
        {/* first column */}
        <Col span={12}>
          <h1>Categories</h1>
          <p>Add new category</p>

          <Form onFinish={onFinish} form ={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
        {/* <pre>
        {JSON.stringify(categories,null,5)}
        </pre> */}
          {/* <p>Show categories list...</p> */}
          <List
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item) => (
            <List.Item actions={[
              <a>Edit</a>,
              <a>Delete</a>
            ]}>
              <List.Item.Meta title={item.name}/>
              <hr/>
              {/* <p>{item.name}</p>  */}
            </List.Item>
          )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Categories;
