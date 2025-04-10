import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const UserHeader = ({ loggedInUser, handleLogout }) => (
  <Header style={{ display: 'flex', alignItems: 'center' }}>
    <div className="demo-logo" />
    <div style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#fff', marginLeft: '140px' }}>
      学生竞赛管理平台User端
    </div>
    {loggedInUser.avatarUrl && (
      <img
        src={`http://localhost:5000${loggedInUser.avatarUrl}`}
        alt="avatar"
        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
      />
    )}
    <span style={{ color: '#fff', marginRight: '10px' }}>{loggedInUser.username}</span>
    <Button type="primary" onClick={handleLogout} style={{ marginRight: '10px' }}>
      退出
    </Button>
  </Header>
);

export default UserHeader;
