import React from 'react';
import { Modal, Form, Input, Button, Rate } from 'antd';

const ScoreModal = ({
    isVisible,
    handleCancel,
    handleSubmit,
    form,
}) => (
    <Modal title="评分" visible={isVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item label="分数" name="score" rules={[{ required: true, message: '请输入分数!' }]}>
                <Rate />
            </Form.Item>
            <Form.Item label="评论" name="comment" rules={[{ required: true, message: '请输入评论!' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    </Modal>
);

export default ScoreModal;
