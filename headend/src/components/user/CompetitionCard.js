import React from 'react';
import { Card, Button, Row, Col } from 'antd';

const CompetitionCard = ({ competitions, paginatedCompetitions, showCompetitionDetailModal, showRegisterModal, isRegistered }) => (
  <>
    <Row gutter={[16, 16]}>
      {paginatedCompetitions.map((competition) => (
        <Col span={8} key={competition.id}>
          <Card
            title={competition.title}
            extra={
              <Button type="link" onClick={() => showCompetitionDetailModal(competition)}>
                详情
              </Button>
            }
          >
            <p><strong>比赛描述:</strong> {competition.description}</p>
            <p><strong>比赛地点:</strong> {competition.location}</p>
            <p><strong>报名截止时间:</strong> {new Date(competition.registrationDeadline).toLocaleString()}</p>
            <Button
              type="primary"
              onClick={() => showRegisterModal(competition)}
              disabled={isRegistered(competition.id)}
            >
              {isRegistered(competition.id) ? '已报名' : '报名'}
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);

export default CompetitionCard;
