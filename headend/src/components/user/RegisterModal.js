import React from 'react';
import { Modal, Card, Button } from 'antd';

const RegisterModal = ({ isRegisterModalVisible, setIsRegisterModalVisible, currentCompetition, loggedInUser, handleRegister }) => (
  <Modal
    title="报名确认"
    visible={isRegisterModalVisible}
    onCancel={() => setIsRegisterModalVisible(false)}
    footer={null}
  >
    {currentCompetition && (
      <Card>
        <img
          src={`http://localhost:5000${loggedInUser.avatarUrl}`}
          alt="avatar"
          style={{ width: '100%', height: 'auto', borderRadius: '50%', marginBottom: '20px' }}
        />
        <p><strong>比赛标题:</strong> {currentCompetition.title}</p>
        <p><strong>比赛截止时间:</strong> {new Date(currentCompetition.registrationDeadline).toLocaleString()}</p>
        <p><strong>用户名:</strong> {loggedInUser.username}</p>
        <p><strong>邮箱:</strong> {loggedInUser.email}</p>
        <Button type="primary" onClick={handleRegister} style={{ width: '100%' }}>
          确定报名
        </Button>
      </Card>
    )}
  </Modal>
);

export default RegisterModal;
