import React from 'react';
import { Modal, Card } from 'antd';

const UserDetailModal = ({ isVisible, currentUser, handleCancel }) => (
    <Modal title="用户详情" visible={isVisible} onCancel={handleCancel} footer={null}>
        {currentUser && (
            <Card>
                <p><strong>ID:</strong> {currentUser.id}</p>
                <p><strong>用户名:</strong> {currentUser.username}</p>
                <p><strong>邮箱:</strong> {currentUser.email}</p>
                <p><strong>密码:</strong> {currentUser.password}</p>
                <p><strong>身份:</strong> {currentUser.role}</p>
                <p><strong>姓名:</strong> {currentUser.name}</p>
                <p><strong>个人爱好:</strong> {currentUser.bio}</p>
                <p><strong>头像:</strong></p>
                <img
                    src={`http://localhost:5000${currentUser.avatarUrl}`}
                    alt="avatar"
                    style={{ marginBottom: '10px', width: '100px' }}
                />
                <p><strong>账号创建时间:</strong> {currentUser.createdAt}</p>
                <p><strong>账号修改时间:</strong> {currentUser.updatedAt}</p>
            </Card>
        )}
    </Modal>
);

export default UserDetailModal;
