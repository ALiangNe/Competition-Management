import React from 'react';
import { Breadcrumb } from 'antd';

const UserBreadcrumb = ({ selectedKey }) => (
  <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item>学生竞赛管理平台</Breadcrumb.Item>
    <Breadcrumb.Item>用户端</Breadcrumb.Item>
    <Breadcrumb.Item>
      {selectedKey === '1' ? '首页' : selectedKey === '4' ? '竞赛报名入口' : selectedKey === '5' ? '已报名竞赛' : selectedKey === '6' ? '上传个人作品' : '基本信息'}
    </Breadcrumb.Item>
  </Breadcrumb>
);

export default UserBreadcrumb;
