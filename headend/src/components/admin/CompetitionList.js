import React from 'react';
import { Row, Col, Card, Button, Popconfirm, Pagination, Form, Input, DatePicker } from 'antd';

const CompetitionList = ({
    competitions,
    currentPage,
    pageSize,
    totalCompetitions,
    handlePageChange,
    showDetailModal,
    showEditModal,
    handleDelete,
    showAddModal,
    searchForm,
    handleSearch,
}) => {
    const paginatedCompetitions = competitions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ flex: 1 }}>
                    <Form.Item name="title" label="标题" style={{ width: 200 }}>
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="location" label="地点" style={{ width: 230 }}>
                        <Input placeholder="Location" />
                    </Form.Item>
                    <Form.Item name="dateRange" label="报名截止" style={{ width: 450 }}>
                        <DatePicker.RangePicker showTime />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={showAddModal}>添加竞赛</Button>
            </div>
            <Row gutter={16}>
                {paginatedCompetitions.map((competition) => (
                    <Col span={8} key={competition.id} style={{ marginBottom: 16 }}>
                        <Card
                            title={competition.title}
                            extra={
                                <>
                                    <Button onClick={() => showDetailModal(competition)} style={{ marginRight: '10px' }}>详情</Button>
                                    <Button onClick={() => showEditModal(competition)} type="primary" style={{ marginRight: '10px' }}>修改</Button>
                                    <Popconfirm
                                        title="确定删除竞赛?"
                                        onConfirm={() => handleDelete(competition.id)}
                                        okText="是"
                                        cancelText="否"
                                        style={{ marginRight: '10px' }}
                                    >
                                        <Button type="danger" style={{ border: '1px solid red', color: 'red' }}>删除</Button>
                                    </Popconfirm>
                                </>
                            }
                        >
                            <p><strong>比赛描述:</strong> {competition.description}</p>
                            <p><strong>地点:</strong> {competition.location}</p>
                            <p><strong>报名截止时间:</strong> {new Date(competition.registrationDeadline).toLocaleString()}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCompetitions}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: 16 }}
            />
        </>
    );
};

export default CompetitionList;
