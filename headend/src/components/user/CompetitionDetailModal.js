import React from 'react';
import { Modal, Card } from 'antd';

const CompetitionDetailModal = ({ isDetailModalVisible, handleDetailCancel, currentCompetition }) => (
  <Modal
    title="竞赛详情"
    visible={isDetailModalVisible}
    onCancel={handleDetailCancel}
    footer={null}
  >
    {currentCompetition && (
      <Card>
        <p><strong>ID:</strong> {currentCompetition.id}</p>
        <p><strong>名称:</strong> {currentCompetition.title}</p>
        <p><strong>描述:</strong> {currentCompetition.description}</p>
        <p><strong>地点:</strong> {currentCompetition.location}</p>
        <p><strong>开始时间:</strong> {new Date(currentCompetition.startTime).toLocaleString()}</p>
        <p><strong>结束时间:</strong> {new Date(currentCompetition.endTime).toLocaleString()}</p>
        <p><strong>报名截止时间:</strong> {new Date(currentCompetition.registrationDeadline).toLocaleString()}</p>
        <p><strong>最大报名人数:</strong> {currentCompetition.maxParticipants}</p>
        <p><strong>比赛发布时间:</strong> {new Date(currentCompetition.createdAt).toLocaleString()}</p>
      </Card>
    )}
  </Modal>
);

export default CompetitionDetailModal;
