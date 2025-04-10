import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, TrophyOutlined, UnorderedListOutlined, FileAddOutlined } from '@ant-design/icons';

const items2 = [
  {
    key: '4',
    icon: React.createElement(TrophyOutlined),
    label: '竞赛报名',
  },
  {
    key: '5',
    icon: React.createElement(UnorderedListOutlined),
    label: '报名详情',
  },
  {
    key: '6',
    icon: React.createElement(FileAddOutlined),
    label: '上传作品',
  },
  {
    key: 'profile',
    icon: React.createElement(UserOutlined),
    label: '基本信息',
  },
];

const UserMenu = ({ selectedKey, handleMenuClick }) => (
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%', borderRight: 0 }}
    items={items2}
    onClick={handleMenuClick}
  />
);

export default UserMenu;
