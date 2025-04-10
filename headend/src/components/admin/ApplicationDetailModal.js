import React from 'react';
import { Modal, Card, Button } from 'antd';

const ApplicationDetailModal = ({
    isVisible,
    currentApplication,
    handleCancel,
    handleApprove,
    handleReject,
}) => (
    <Modal title="详情页面" visible={isVisible} onCancel={handleCancel} footer={null}>
        {currentApplication && (
            <Card>
                <p><strong>用户名:</strong> {currentApplication.username}</p>
                <p><strong>邮箱:</strong> {currentApplication.email}</p>
                <p><strong>头像:</strong></p>
                <img
                    src={`http://localhost:5000${currentApplication.avatarUrl}`}
                    alt="avatar"
                    style={{ marginBottom: '10px', width: '100px' }}
                />
                <p><strong>比赛标题:</strong> {currentApplication.title}</p>
                <p><strong>审批状态:</strong> {currentApplication.state_description}</p>
                <Button type="primary" onClick={handleApprove} style={{ marginRight: '10px' }}>
                    批准
                </Button>
                <Button type="danger" onClick={handleReject}>
                    拒绝
                </Button>
            </Card>
        )}
    </Modal>
);

export default ApplicationDetailModal;
