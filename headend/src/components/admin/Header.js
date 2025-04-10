import React from 'react';
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Header } = Layout;

const AdminHeader = ({ loggedInUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        navigate('/');
        window.location.reload();
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <div style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#fff', marginLeft: '210px' }}>
                学生竞赛管理平台Admin端
            </div>
            {loggedInUser && (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <img src={`http://localhost:5000${loggedInUser.avatarUrl}`} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                    <span style={{ color: '#fff' }}>{loggedInUser.username}</span>
                </div>
            )}
            <Button type="primary" onClick={handleLogout} style={{ marginRight: '10px' }}>
                退出
            </Button>
        </Header>
    );
};

export default AdminHeader;
