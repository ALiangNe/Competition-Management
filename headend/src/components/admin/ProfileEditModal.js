import React from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileEditModal = ({
    isVisible,
    handleCancel,
    handleSubmit,
    handleFileChange,
    form,
    loggedInUser
}) => (
    <Modal title="修改信息" visible={isVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} initialValues={loggedInUser} onFinish={handleSubmit} layout="vertical">
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '邮箱格式有误' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码不得小于6位!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item label="角色" name="role">
                <Input />
            </Form.Item>
            <Form.Item label="姓名" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="自我爱好" name="bio">
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="头像" name="avatarUrl">
                <Upload name="avatar" action="http://localhost:5000/api/upload" onChange={handleFileChange} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
                {loggedInUser.avatarUrl && (
                    <div>
                        <img
                            src={`http://localhost:5000${loggedInUser.avatarUrl}`}
                            alt="avatar"
                            style={{ marginTop: '10px', width: '100px' }}
                        />
                    </div>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    保存修改
                </Button>
            </Form.Item>
        </Form>
    </Modal>
);

export default ProfileEditModal;
