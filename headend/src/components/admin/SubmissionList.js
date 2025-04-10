import React from 'react';
import { Table, Button, Form, Input, DatePicker, Pagination } from 'antd';
import moment from 'moment';

const SubmissionList = ({
    submissions,
    currentPage,
    pageSize,
    totalSubmissions,
    handlePageChange,
    showScoreModal,
    searchForm,
    handleSearch,
}) => {
    const submissionColumns = [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '竞赛标题', dataIndex: 'title', key: 'title' },
        { title: '竞赛描述', dataIndex: 'competition_description', key: 'competition_description' },
        { title: '作品描述', dataIndex: 'submission_description', key: 'submission_description' },
        { title: '上传时间', dataIndex: 'created_at', key: 'created_at', render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: '文件路径', dataIndex: 'file_path', key: 'file_path', render: (text) => <a href={`http://localhost:5000${text}`} download>下载</a> },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => showScoreModal(record)}>评分</Button>
            ),
        },
    ];

    return (
        <>
            <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
                <Form.Item name="username" label="用户名">
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item name="title" label="比赛标题">
                    <Input placeholder="比赛标题" />
                </Form.Item>
                <Form.Item name="created_at" label="提交时间">
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
            <Table dataSource={submissions} columns={submissionColumns} rowKey="id" />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalSubmissions}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: 16 }}
            />
        </>
    );
};

export default SubmissionList;
