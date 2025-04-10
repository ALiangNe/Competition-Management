import React from 'react';
import { Card, Button } from 'antd';

const UserProfile = ({ loggedInUser, showProfileEditModal }) => (
  <Card style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
    <img
      src={`http://localhost:5000${loggedInUser.avatarUrl}`}
      alt="avatar"
      style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
    />
    <p><strong>用户名:</strong> {loggedInUser.username}</p>
    <p><strong>邮箱:</strong> {loggedInUser.email}</p>
    <p><strong>姓名:</strong> {loggedInUser.name}</p>
    <p><strong>自我爱好:</strong> {loggedInUser.bio}</p>
    <Button type="primary" onClick={showProfileEditModal}>
      编辑
    </Button>
  </Card>
);

export default UserProfile;
