import React from 'react';
import { Modal, Card } from 'antd';

const CompetitionDetailModal = ({ isVisible, currentCompetition, handleCancel }) => (
    <Modal title="竞赛详情" visible={isVisible} onCancel={handleCancel} footer={null}>
        {currentCompetition && (
            <Card>
                <p><strong>ID:</strong> {currentCompetition.id}</p>
                <p><strong>比赛标题:</strong> {currentCompetition.title}</p>
                <p><strong>描述:</strong> {currentCompetition.description}</p>
                <p><strong>地点:</strong> {currentCompetition.location}</p>
                <p><strong>比赛开始时间:</strong> {new Date(currentCompetition.startTime).toLocaleString()}</p>
                <p><strong>比赛结束时间:</strong> {new Date(currentCompetition.endTime).toLocaleString()}</p>
                <p><strong>报名截止时间:</strong> {new Date(currentCompetition.registrationDeadline).toLocaleString()}</p>
                <p><strong>最大报名人数:</strong> {currentCompetition.maxParticipants}</p>
                <p><strong>竞赛创建者ID:</strong> {currentCompetition.createdBy}</p>
                <p><strong>竞赛创建时间:</strong> {new Date(currentCompetition.createdAt).toLocaleString()}</p>
                <p><strong>竞赛修改时间:</strong> {new Date(currentCompetition.updatedAt).toLocaleString()}</p>
            </Card>
        )}
    </Modal>
);

export default CompetitionDetailModal;
