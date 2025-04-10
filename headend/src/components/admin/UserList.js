import React from 'react';
import { Table, Button, Popconfirm, Form, Input, Select } from 'antd';

const { Option } = Select;

const UserList = ({
    users,
    filteredUsers,
    showEditModal,
    handleDelete,
    showDetailModal,
    showAddUserModal,
    searchForm,
    handleSearch
}) => {
    const userColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '身份', dataIndex: 'role', key: 'role' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        {
            title: '头像',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (text) => <img src={`http://localhost:5000${text}`} alt="avatar" style={{ width: '90px' }} />
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => showEditModal(record)} type="primary" style={{ marginRight: '10px' }}>修改</Button>
                    <Popconfirm
                        title="确定删除此用户?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="是"
                        cancelText="否"
                        style={{ marginRight: '10px' }}
                    >
                        <Button type="danger" style={{ border: '1px solid red', color: 'red' }}>删除</Button>
                    </Popconfirm>
                    <Button onClick={() => showDetailModal(record)}>详情</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
                <Form.Item name="id" label="ID">
                    <Input placeholder="ID" />
                </Form.Item>
                <Form.Item name="username" label="用户名">
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="role" label="身份">
                    <Select placeholder="Role" style={{ width: 120 }}>
                        <Option value="user">User</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={showAddUserModal}>添加用户</Button>
                </Form.Item>
            </Form>
            <Table dataSource={filteredUsers} columns={userColumns} rowKey="id" />
        </>
    );
};

export default UserList;
