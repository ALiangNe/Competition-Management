import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button, Card, Row, Col, Pagination } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, TrophyOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: '平台首页',
    },
    {
        key: '2',
        icon: React.createElement(TrophyOutlined),
        label: '全国著名比赛',
    },

];

const Home = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const [competitions, setCompetitions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedKey === '2') {
            fetchCompetitions();
        }
    }, [selectedKey]);

    const fetchCompetitions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/competitions');
            setCompetitions(response.data);
        } catch (error) {
            console.error('Failed to fetch competitions:', error);
        }
    };

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedCompetitions = competitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <div style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#fff', marginLeft: '130px' }}>
                    学生竞赛管理平台
                </div>
                <Button type="primary" onClick={handleLogin} style={{ marginRight: '10px' }}>
                    登录
                </Button>
                <Button type="primary" onClick={handleRegister} style={{ marginRight: '10px' }}>
                    注册
                </Button>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: '#fff',
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>学生竞赛管理平台</Breadcrumb.Item>
                        <Breadcrumb.Item>首页介绍</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {selectedKey === '1' && (
                            <div style={{ textAlign: 'center' }}>
                                <h1>欢迎来到学生竞赛平台</h1>
                                <p>在这里，你可以参与各种精彩的竞赛，展示你的才能。</p>
                            </div>
                        )}
                        {selectedKey === '2' && (
                            <>
                                <Row gutter={16}>
                                    {paginatedCompetitions.map((competition) => (
                                        <Col span={8} key={competition.id} style={{ marginBottom: 160,width: '100vh'}}>
                                            <Card title={competition.title}>
                                                <p><strong>比赛描述:</strong> {competition.description}</p>
                                                <p><strong>比赛地点:</strong> {competition.location}</p>
                                                <p><strong>开始时间:</strong> {new Date(competition.startTime).toLocaleString()}</p>
                                                <p><strong>结束时间:</strong> {new Date(competition.endTime).toLocaleString()}</p>
                                                <p><strong>报名截止时间:</strong> {new Date(competition.registrationDeadline).toLocaleString()}</p>
                                                <p><strong>最大参加人数:</strong> {competition.maxParticipants}</p>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={competitions.length}
                                    onChange={handlePageChange}
                                    style={{ textAlign: 'center', marginTop: 16 }}
                                />
                            </>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
