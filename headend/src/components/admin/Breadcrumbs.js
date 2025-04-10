import React from 'react';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ selectedKey }) => (
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>学生竞赛管理平台</Breadcrumb.Item>
        <Breadcrumb.Item>管理员端</Breadcrumb.Item>
        <Breadcrumb.Item>
            {selectedKey === '1' ? '用户列表' : selectedKey === '4' ? '竞赛列表' : selectedKey === '5' ? '用户申请列表' : selectedKey === '6' ? '作品打分' : '基本信息'}
        </Breadcrumb.Item>
    </Breadcrumb>
);

export default Breadcrumbs;
