import React from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';

const CompetitionEditModal = ({
    isVisible,
    currentCompetition,
    handleCancel,
    handleSubmit,
    form,
}) => (
    <Modal title="竞赛修改" visible={isVisible} onCancel={handleCancel} footer={null}>
        {currentCompetition && (
            <Form form={form} initialValues={currentCompetition} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="比赛标题" name="title" rules={[{ required: true, message: '请输入比赛标题!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入比赛简介!' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="地点" name="location" rules={[{ required: true, message: '请输入比赛地点!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="比赛开始时间" name="startTime" rules={[{ required: true, message: '请输入比赛开始时间!' }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="比赛结束时间" name="endTime" rules={[{ required: true, message: '请输入比赛结束时间!' }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="报名截止时间" name="registrationDeadline" rules={[{ required: true, message: '请输入报名截止时间!' }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="最大报名人数" name="maxParticipants" rules={[{ required: true, message: '请输入最大报名人数!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        保存修改
                    </Button>
                </Form.Item>
            </Form>
        )}
    </Modal>
);

export default CompetitionEditModal;
