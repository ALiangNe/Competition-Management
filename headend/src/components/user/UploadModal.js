import React from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadModal = ({
  isUploadModalVisible,
  handleUploadCancel,
  handleUploadSubmit,
  uploadForm,
  loggedInUser,
  currentCompetition
}) => (
  <Modal
    title="上传作品"
    visible={isUploadModalVisible}
    onCancel={handleUploadCancel}
    footer={null}
  >
    <Form form={uploadForm} onFinish={handleUploadSubmit} layout="vertical">
      <Form.Item label="用户名" name="username">
        <Input value={loggedInUser.username} disabled />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input value={loggedInUser.email} disabled />
      </Form.Item>
      <Form.Item label="比赛标题" name="competitionTitle">
        <Input value={currentCompetition?.title} disabled />
      </Form.Item>
      <Form.Item
        label="作品描述"
        name="description"
        rules={[{ required: true, message: '请输入作品描述' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="上传文件"
        name="files"
        valuePropName="fileList"
        getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[{ required: true, message: '请上传文件' }]}
      >
        <Upload name="files" beforeUpload={() => false} multiple>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          提交
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default UploadModal;
