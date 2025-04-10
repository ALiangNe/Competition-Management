import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

const CompetitionSearchForm = ({ searchForm, handleSearch }) => (
  <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
    <Form.Item name="title" label="竞赛名称">
      <Input placeholder="Title" />
    </Form.Item>
    <Form.Item name="location" label="地点">
      <Input placeholder="Location" />
    </Form.Item>
    <Form.Item name="dateRange" label="报名截止时间">
      <RangePicker />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">搜索</Button>
    </Form.Item>
  </Form>
);

export default CompetitionSearchForm;
