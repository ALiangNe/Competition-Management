import React from 'react';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserAddModal = ({
    isVisible,
    handleCancel,
    handleSubmit,
    handleFileChange,
    avatarUrl,
    form,
}) => (
    <Modal title="添加用户" visible={isVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '邮箱格式有误!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码不得小于6位!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="身份" name="role" rules={[{ required: true, message: '请输入身份!' }]}>
                <Select>
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                </Select>
            </Form.Item>
            <Form.Item label="姓名" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="个人爱好" name="bio">
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="头像" name="avatarUrl">
                <Upload name="avatar" action="http://localhost:5000/api/upload" onChange={handleFileChange} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
                {avatarUrl && (
                    <div>
                        <img
                            src={`http://localhost:5000${avatarUrl}`}
                            alt="avatar"
                            style={{ marginTop: '10px', width: '100px' }}
                        />
                    </div>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    添加用户
                </Button>
            </Form.Item>
        </Form>
    </Modal>
);

export default UserAddModal;
