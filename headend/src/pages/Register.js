
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, message, Layout, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import bcrypt from 'bcryptjs';

const { Option } = Select;
const { Content } = Layout;

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
        name: '',
        bio: '',
        avatarUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (value) => {
        setFormData({ ...formData, role: value });
    };

    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            setFormData({ ...formData, avatarUrl: info.file.response.filePath });
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleSubmit = async () => {
        try {
            // Hash the password before sending the data to the server
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            const dataToSubmit = { ...formData, password: hashedPassword };

            await axios.post('http://localhost:5000/api/register', dataToSubmit);
            message.success('Registration successful!');
        } catch (error) {
            message.error('Registration failed');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Content>
                <Card  style={{ width: 550 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <h2>Register</h2>
                    </div>
                    <Form onFinish={handleSubmit} layout="vertical">
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input name="username" value={formData.username} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[
                            { required: true, message: '请输入邮箱!' },
                            { type: 'email', message: '邮箱格式有误!' }
                        ]}>
                            <Input name="email" value={formData.email} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[
                            { required: true, message: '请输入密码!' },
                            { min: 6, message: '密码长度不得小于6位!' }
                        ]}>
                            <Input.Password name="password" value={formData.password} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Role" name="role" rules={[{ required: true, message: '请选择角色!' }]}>
                            <Select value={formData.role} onChange={handleRoleChange}>
                                <Option value="user">User</Option>
                                {/* <Option value="admin">Admin</Option> */}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Name" name="name">
                            <Input name="name" value={formData.name} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Bio" name="bio">
                            <Input.TextArea name="bio" value={formData.bio} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Avatar URL" name="avatarUrl">
                            <Upload
                                name="avatar"
                                action="http://localhost:5000/api/upload"
                                onChange={handleFileChange}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>上传文件</Button>
                            </Upload>
                            {formData.avatarUrl && (
                                <div>
                                    <img
                                        src={`http://localhost:5000${formData.avatarUrl}`}
                                        alt="avatar"
                                        style={{ marginTop: '10px', width: '100px' }}
                                    />
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                        <div style={{ flex: 1, textAlign: 'center',marginLeft:'40px' }}>
                            <Link to="/login">已有账户？登录</Link>
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

export default Register;
