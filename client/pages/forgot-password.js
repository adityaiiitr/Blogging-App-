import { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

function ForgotPassword() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  // hooks
  const router = useRouter();
  //clear form detaisl
  const [form] = Form.useForm()

  const forgotPasswordRequest = async(values)=>{
    try{
      setLoading(true)
      const {data}  = await axios.post("/forgot-password",values)
      if(data.error){
        toast.error(data.error);
        setLoading(false)
      } else{
        toast.success("Check your Email for Reset Link.")
        setVisible(true)
        setLoading(false)
      }
    }catch(err){
      console.log(err)
      toast.error("Forgot Password Failed. Try Again!")
      setLoading(false)
    }
  }

  const resetPasswordRequest = async(values)=>{
    try{
      setLoading(true)
      const {data}  = await axios.post("/reset-password",values)
      if(data.error){
        toast.error(data.error);
        setLoading(false)
      } else{
        toast.success("Password Changed Successfully! Please Login with New Password.")
        form.resetFields("email")
        setVisible(false)
        setLoading(false)
      }
    }catch(err){
      console.log("Aditya",err)
      toast.error("Reset Password Failed. Try Again!")
      setLoading(false)
    }
  }

  


  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Forgot Password</h1>

        <Form
          form ={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true}}
          
          onFinish={visible? resetPasswordRequest: forgotPasswordRequest}
        >
          {/* email */}
          <Form.Item name="email" rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {/* password */}
          {visible && <>
            <Form.Item name="resetCode">
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter Reset Code"
            />
          </Form.Item>
            <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your New Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          </>}
          




          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
