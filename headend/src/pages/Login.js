
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, message, Layout, Card } from 'antd';
import Cookies from 'js-cookie';

const { Option } = Select;
const { Content } = Layout;

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'user'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (value) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            const { token, user } = response.data;
            Cookies.set('token', token, { expires: 1 });
            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            if (user.role === 'admin') {
                navigate('/adminapp');
            } else {
                navigate('/userapp');
            }
        } catch (error) {
            message.error('Invalid username, password, or role');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Card style={{ width: 450 }}>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <h2>Login</h2>
                    </div>
                    <Form onFinish={handleSubmit} layout="vertical">
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input name="username" value={formData.username} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password name="password" value={formData.password} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Role" name="role" rules={[{ required: true, message: '请选择角色!' }]}>
                            <Select value={formData.role} onChange={handleRoleChange}>
                                <Option value="user">User</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                        <div style={{ flex: 1, textAlign: 'center',marginLeft:'40px' }}>
                            <Link to="/register">没有帐户？注册</Link>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Link to="/">Home</Link>
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
