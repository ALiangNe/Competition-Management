import React from 'react';
import { Modal, Card } from 'antd';
import moment from 'moment';

const SubmissionDetailModal = ({ isVisible, currentSubmission, handleCancel }) => (
    <Modal title="作品详情" visible={isVisible} onCancel={handleCancel} footer={null}>
        {currentSubmission && (
            <Card>
                <p><strong>用户名:</strong> {currentSubmission.username}</p>
                <p><strong>比赛标题:</strong> {currentSubmission.title}</p>
                <p><strong>描述:</strong> {currentSubmission.description}</p>
                <p><strong>提交时间:</strong> {moment(currentSubmission.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p><strong>作品下载:</strong> <a href={`http://localhost:5000${currentSubmission.file_path}`} download>Download</a></p>
            </Card>
        )}
    </Modal>
);

export default SubmissionDetailModal;
