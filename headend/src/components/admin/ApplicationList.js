import React from 'react';
import { Table, Button, Popconfirm, Form, Input, Pagination } from 'antd';
import { CloseCircleOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';

const ApplicationList = ({
    applications,
    currentPage,
    pageSize,
    totalApplications,
    handlePageChange,
    showDetailModal,
    searchForm,
    handleSearch,
}) => {
    const applicationColumns = [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '比赛标题', dataIndex: 'title', key: 'title' },
        {
            title: '审批情况',
            dataIndex: 'state_description',
            key: 'state_description',
            render: (text) => (
                <>
                    {text}
                    {text === '审核未通过' && <CloseCircleOutlined style={{ color: 'red', marginLeft: 8 }} />}
                    {text === '待审核' && <LoadingOutlined style={{ color: 'orange', marginLeft: 8 }} />}
                    {text === '审核通过' && <CheckCircleOutlined style={{ color: 'green', marginLeft: 8 }} />}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => showDetailModal(record)}>详情</Button>
            ),
        },
    ];

    return (
        <>
            <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
                <Form.Item name="username" label="用户名">
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="title" label="标题">
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="state_description" label="审批情况">
                    <Input placeholder="State Description" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
            <Table dataSource={applications} columns={applicationColumns} rowKey="id" />
            {/* 分页组件 */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalApplications}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: 16 }}
            />
        </>
    );
};

export default ApplicationList;
