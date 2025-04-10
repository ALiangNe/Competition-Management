import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, TrophyOutlined, UsergroupAddOutlined, CarryOutOutlined, FileOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: React.createElement(UsergroupAddOutlined),
        label: '用户管理',
    },
    {
        key: '4',
        icon: React.createElement(TrophyOutlined),
        label: '竞赛管理',
    },
    {
        key: '5',
        icon: React.createElement(CarryOutOutlined),
        label: '审批管理',
    },
    {
        key: '6',
        icon: React.createElement(FileOutlined),
        label: '作品打分',
    },
    {
        key: 'profile',
        icon: React.createElement(UserOutlined),
        label: '基本信息',
    },
];

const SiderMenu = ({ selectedKey, handleMenuClick }) => (
    <Sider width={200} style={{ background: '#fff' }}>
        <Menu
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
        />
    </Sider>
);

export default SiderMenu;
