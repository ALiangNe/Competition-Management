// src/components/user/RegisteredCompetitionsColumns.js
import React from 'react';
import { Button } from 'antd';

const registeredCompetitionsColumns = (showCompetitionDetailModal) => [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '地点',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: '报名截止时间',
    dataIndex: 'registrationDeadline',
    key: 'registrationDeadline',
    render: (text) => new Date(text).toLocaleString(),
  },
  {
    title: '状态',
    dataIndex: 'state_description',
    key: 'state_description',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Button type="link" onClick={() => showCompetitionDetailModal(record)}>
        详情
      </Button>
    ),
  },
];

export default registeredCompetitionsColumns;
