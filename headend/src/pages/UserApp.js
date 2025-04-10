import React, { useState, useEffect } from 'react';
import { Layout, message, Pagination, Form, Button, Row, Col, Card } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UserMenu from '../components/user/UserMenu';
import UserBreadcrumb from '../components/user/UserBreadcrumb';
import UserProfile from '../components/user/UserProfile';
import CompetitionSearchForm from '../components/user/CompetitionSearchForm';
import CompetitionCard from '../components/user/CompetitionCard';
import UserProfileEditModal from '../components/user/UserProfileEditModal';
import CompetitionDetailModal from '../components/user/CompetitionDetailModal';
import RegisterModal from '../components/user/RegisterModal';
import UploadModal from '../components/user/UploadModal';
import RegisteredCompetitionsTable from '../components/user/RegisteredCompetitionsTable';

const { Content, Sider } = Layout;

const UserApp = () => {
  // selectedKey：当前选中的键，默认为'1'。setSelectedKey：用于设置
  const [selectedKey, setSelectedKey] = useState('1');
  //users：用户列表。setUsers：用于设置users状态的函数。
  const [users, setUsers] = useState([]);
  //competitions：比赛列表。setCompetitions：用于设置
  const [competitions, setCompetitions] = useState([]);
  //filteredCompetitions：筛选后的比赛列表。setFilteredCompetitions：用于设置
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  //registeredCompetitions：已注册的比赛列表。setRegisteredCompetitions：用于设置
  const [registeredCompetitions, setRegisteredCompetitions] = useState([]);
  //approvedCompetitions：已批准的比赛列表。setApprovedCompetitions：用于设置
  const [approvedCompetitions, setApprovedCompetitions] = useState([]);
  //currentCompetition：当前比赛。setCurrentCompetition：用于设置
  const [currentCompetition, setCurrentCompetition] = useState(null);
  //isDetailModalVisible：详细信息模态框是否可见。setIsDetailModalVisible：用于设置
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  //isProfileEditModalVisible：个人资料编辑模态框是否可见。
  const [isProfileEditModalVisible, setIsProfileEditModalVisible] = useState(false);
  //isRegisterModalVisible：注册模态框是否可见。
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  //isUploadModalVisible：上传模态框是否可见。
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  //currentPage：当前页码。
  const [currentPage, setCurrentPage] = useState(1);
  //itemsPerPage：每页显示的项目数。
  const itemsPerPage = 6;
  //navigate：用于导航到其他页面的函数。
  const navigate = useNavigate();
  //loggedInUser：已登录的用户。
  const [loggedInUser, setLoggedInUser] = useState({});
  //avatarUrl：用户头像URL。
  const [avatarUrl, setAvatarUrl] = useState('');
  //applications：应用程序。
  const [applications, setApplications] = useState({});
  //profileEditForm：个人资料编辑表单。
  const [profileEditForm] = Form.useForm();
  //searchForm：搜索表单。
  const [searchForm] = Form.useForm();
  //uploadForm：上传表单。
  const [uploadForm] = Form.useForm();
  //isLoggedIn：是否已登录。
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token'); // 首先获取token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
      setIsLoggedIn(true); // 允许登录
    } else {
      setIsLoggedIn(false);// 拒绝登录
    }
  }, []);

  /* handleMenuClick函数主要用于处理菜单点击事件， */
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    if (e.key === '1') {
      fetchUsers();
    } else if (e.key === '4') {
      fetchCompetitions();
    } else if (e.key === '5') {
      fetchUserRegisteredCompetitions(loggedInUser.id);
    } else if (e.key === '6') {
      fetchApprovedCompetitions(loggedInUser.id);
    } else if (e.key === 'profile') {
      fetchUserProfile();
    }
  };
  /* 而useEffect钩子函数useEffect不仅处理菜单点击事件，
  还用于在组件挂载时或selectedKey发生变化时执行一段逻辑。 */
  useEffect(() => {
    if (selectedKey === '1') {
      fetchUsers();
    } else if (selectedKey === '4') {
      fetchCompetitions();
    } else if (selectedKey === '5') {
      fetchUserRegisteredCompetitions(loggedInUser.id);
    } else if (selectedKey === '6') {
      fetchApprovedCompetitions(loggedInUser.id);
    }
  }, [selectedKey]);

  // 判断用户是否已经注册了某个比赛。
  const isRegistered = (competitionId) => {
    return applications[competitionId];
  };

  // 用于显示上传模态框，允许用户上传文件。
  const showUploadModal = (competition) => {
    setCurrentCompetition(competition);
    setIsUploadModalVisible(true);
  };

  // 用户取消上传，取消模态款显示
  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
    uploadForm.resetFields();
  };

  //显示比赛详情模态框
  const showCompetitionDetailModal = (competition) => {
    setCurrentCompetition(competition);
    setIsDetailModalVisible(true);
  };

  //处理关闭比赛详情模态框
  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setCurrentCompetition(null);
  };

  //处理分页
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 显示修改个人信息模态框
  const showProfileEditModal = () => {
    setIsProfileEditModalVisible(true);
    profileEditForm.setFieldsValue({ ...loggedInUser, avatarUrl });
  };

  // 设置个人信息模态框的false还是true
  const handleProfileEditCancel = () => {
    setIsProfileEditModalVisible(false);
  };

  // 退出按钮
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    navigate('/');
    window.location.reload();
  };

    // 设置头像文件的新路径
    const handleFileChange = async (info) => {
      if (info.file.status === 'done') {
        const newAvatarUrl = info.file.response.filePath;
        setAvatarUrl(newAvatarUrl);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
  
    // 弹出报名模态框，并且判断是否超过报名截止时间
    const showRegisterModal = (competition) => {
      const currentDate = new Date();
      const registrationDeadline = new Date(competition.registrationDeadline);
  
      if (currentDate > registrationDeadline) {
        message.error('报名失败，超过报名时间！');
        return;
      }
  
      setCurrentCompetition(competition);
      setIsRegisterModalVisible(true);
    };
  

  // 三种方查询报名竞赛
  const handleSearch = (values) => {
    const { title, location, dateRange } = values;
    const startDate = dateRange ? dateRange[0].startOf('day').toISOString() : null;
    const endDate = dateRange ? dateRange[1].endOf('day').toISOString() : null;

    const filtered = competitions.filter((competition) => {
      const matchesTitle = title ? competition.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesLocation = location ? competition.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesDateRange = dateRange
        ? new Date(competition.registrationDeadline) >= new Date(startDate) && new Date(competition.registrationDeadline) <= new Date(endDate)
        : true;

      return matchesTitle && matchesLocation && matchesDateRange;
    });

    //更新筛选后的比赛列表和当前页码
    setFilteredCompetitions(filtered);
    setCurrentPage(1);
  };

  //当前页面的比赛列表切片，以便在分页显示时只显示当前页的内容
  const paginatedCompetitions = filteredCompetitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // get 获取个人信息卡片
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      setLoggedInUser(response.data);
      setAvatarUrl(response.data.avatarUrl);
      fetchUserApplications(response.data.id);
      fetchUserRegisteredCompetitions(response.data.id);
      fetchApprovedCompetitions(response.data.id);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  // get 查询报名用户列表，控制报名按钮失效
  const fetchUserApplications = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/application/user/${userId}`);
      const apps = response.data.reduce((acc, app) => {
        acc[app.competitions_id] = true;
        return acc;
      }, {});
      setApplications(apps);
    } catch (error) {
      console.error('Failed to fetch user applications:', error);
    }
  };

  // get 获取用户报名的竞赛
  const fetchUserRegisteredCompetitions = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/application/user/${userId}/competitions`);
      setRegisteredCompetitions(response.data);
    } catch (error) {
      console.error('Failed to fetch registered competitions:', error);
    }
  };

  // get 获取用户已通过的竞赛
  const fetchApprovedCompetitions = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/application/user/${userId}/approved`);
      setApprovedCompetitions(response.data);
    } catch (error) {
      console.error('Failed to fetch approved competitions:', error);
    }
  };

  // get 获取用户列表
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // get 获取竞赛列表
  const fetchCompetitions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/competitions');
      setCompetitions(response.data);
      setFilteredCompetitions(response.data);
    } catch (error) {
      console.error('Failed to fetch competitions:', error);
    }
  };

  // put 修改个人信息的请求
  const handleProfileEditSubmit = async (values) => {
    try {
      const updatedUser = { ...loggedInUser, ...values, avatarUrl };
      const response = await axios.put('http://localhost:5000/api/profile', updatedUser);
      message.success('Profile updated successfully!');
      setIsProfileEditModalVisible(false);
      fetchUserProfile();
    } catch (error) {
      message.error('Failed to update profile.');
      console.error('Failed to update profile:', error);
    }
  };

  // post 用户报名竞赛
  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/application', {
        users_id: loggedInUser.id,
        competitions_id: currentCompetition.id,
        state: 1,
        state_description: '待审核',
      });
      message.success('Successfully registered for the competition!');
      fetchUserApplications(loggedInUser.id);
      fetchUserRegisteredCompetitions(loggedInUser.id);
      setIsRegisterModalVisible(false);
    } catch (error) {
      message.error('Failed to register for the competition.');
      console.error('Failed to register for the competition:', error);
    }
  };


  // post 提交作品请求
  const handleUploadSubmit = async (values) => {
    if (!currentCompetition) {
      message.error('请先选择一个比赛');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', loggedInUser.id);
    formData.append('competition_id', currentCompetition.id);
    formData.append('description', values.description);
    values.files.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/submissions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('作品提交成功');
      setIsUploadModalVisible(false);
      uploadForm.resetFields();
    } catch (error) {
      message.error('提交失败');
      console.error('Failed to submit work:', error);
    }
  };



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <UserHeader loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <UserMenu selectedKey={selectedKey} handleMenuClick={handleMenuClick} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <UserBreadcrumb selectedKey={selectedKey} />
          <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff' }}>
            {/* 不存在token */}
            {!isLoggedIn ? (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>您还未登录，先去首页逛逛吧！</h2>
                <Button type="primary" onClick={() => navigate('/')}>返回首页</Button>
              </div>
            ) : (
              <>
                {/* 选择=1，显示首页 */}
                {selectedKey === '1' && (
                  <div style={{ textAlign: 'center', marginTop: '230px' }}>
                    <h1>欢迎来到学生竞赛平台</h1>
                    <p>在这里，你可以参与各种精彩的竞赛，展示你的才能。</p>
                  </div>
                )}
                {/* 选择=4，显示竞赛卡片信息 */}
                {selectedKey === '4' && (
                  <>
                    {/* 搜索框 */}
                    <CompetitionSearchForm searchForm={searchForm} handleSearch={handleSearch} />
                    {/* 竞赛卡片信息 */}
                    <CompetitionCard // 卡片显示
                      competitions={competitions} 
                      paginatedCompetitions={paginatedCompetitions}
                      showCompetitionDetailModal={showCompetitionDetailModal}
                      showRegisterModal={showRegisterModal}
                      isRegistered={isRegistered}
                    />
                    {/* 分页组件 */}
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={filteredCompetitions.length}
                      onChange={handlePageChange}
                      style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                  </>
                )}
                {/* 选择=5，显示已经报名竞赛 */}
                {selectedKey === '5' && (
                  <>
                    {/* 列表形式显示已经报名竞赛信息 */}
                    <RegisteredCompetitionsTable
                      registeredCompetitions={registeredCompetitions}
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      handlePageChange={handlePageChange}
                      showCompetitionDetailModal={showCompetitionDetailModal} // Pass the function here
                    />
                  </>
                )}
                {/* 选择=6，显示通过审核的竞赛，并且上传个人作品 */}
                {selectedKey === '6' && (
                  <>
                    <Row gutter={[16, 16]}>
                      {approvedCompetitions.map((competition) => (
                        <Col span={8} key={competition.id}>
                          <Card
                            title={competition.title}
                            extra={
                              <Button type="link" onClick={() => showCompetitionDetailModal(competition)}>
                                详情
                              </Button>
                            }
                          >
                            <p><strong>描述:</strong> {competition.description}</p>
                            <p><strong>地点:</strong> {competition.location}</p>
                            <p><strong>比赛开始时间:</strong> {new Date(competition.startTime).toLocaleString()}</p>
                            <p><strong>比赛结束时间:</strong> {new Date(competition.endTime).toLocaleString()}</p>
                            <p><strong>报名状态:</strong> {competition.state_description}</p>
                            {/* 显示上传个人作品模态框 */}
                            <Button type="primary" onClick={() => showUploadModal(competition)}>
                              上传个人作品
                            </Button>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                    {/* 分页 */}
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={approvedCompetitions.length}
                      onChange={handlePageChange}
                      style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                  </>
                )}
                {/* 选择profile，显示个人信息 */}
                {selectedKey === 'profile' && (
                  <UserProfile loggedInUser={loggedInUser} showProfileEditModal={showProfileEditModal} />
                )}
                {/* 个人信息模态框 */}
                <UserProfileEditModal
                  isProfileEditModalVisible={isProfileEditModalVisible}
                  handleProfileEditCancel={handleProfileEditCancel}
                  handleProfileEditSubmit={handleProfileEditSubmit}
                  profileEditForm={profileEditForm}
                  handleFileChange={handleFileChange}
                  avatarUrl={avatarUrl}
                />
                {/* 竞赛信息模态框 */}
                <CompetitionDetailModal
                  isDetailModalVisible={isDetailModalVisible}
                  handleDetailCancel={handleDetailCancel}
                  currentCompetition={currentCompetition}
                />
                {/* 报名模态框 */}
                <RegisterModal
                  isRegisterModalVisible={isRegisterModalVisible}
                  setIsRegisterModalVisible={setIsRegisterModalVisible}
                  currentCompetition={currentCompetition}
                  loggedInUser={loggedInUser}
                  handleRegister={handleRegister} // 发送post请求
                />
                {/*上传模态框 */}
                <UploadModal
                  isUploadModalVisible={isUploadModalVisible}
                  handleUploadCancel={handleUploadCancel}
                  handleUploadSubmit={handleUploadSubmit} // 发送post请求
                  uploadForm={uploadForm}
                  loggedInUser={loggedInUser}
                  currentCompetition={currentCompetition}
                />
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserApp;
