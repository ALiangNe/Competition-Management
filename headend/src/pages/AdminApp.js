import React, { useState, useEffect } from 'react';
import { Layout, message, Modal, Form, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import AdminHeader from '../components/admin/Header';
import SiderMenu from '../components/admin/SiderMenu';
import Breadcrumbs from '../components/admin/Breadcrumbs';
import UserList from '../components/admin/UserList';
import UserDetailModal from '../components/admin/UserDetailModal';
import UserEditModal from '../components/admin/UserEditModal';
import UserAddModal from '../components/admin/UserAddModal';
import CompetitionList from '../components/admin/CompetitionList';
import CompetitionDetailModal from '../components/admin/CompetitionDetailModal';
import CompetitionEditModal from '../components/admin/CompetitionEditModal';
import CompetitionAddModal from '../components/admin/CompetitionAddModal';
import ApplicationList from '../components/admin/ApplicationList';
import ApplicationDetailModal from '../components/admin/ApplicationDetailModal';
import SubmissionList from '../components/admin/SubmissionList';
import SubmissionDetailModal from '../components/admin/SubmissionDetailModal';
import ScoreModal from '../components/admin/ScoreModal';
import Profile from '../components/admin/Profile';
import ProfileEditModal from '../components/admin/ProfileEditModal';

const { Content } = Layout;

const AdminApp = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const [users, setUsers] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [applications, setApplications] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);// 用户报名的过滤数组
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);// 用户报名模态框是否可见
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [isEditCompetitionModalVisible, setIsEditCompetitionModalVisible] = useState(false);
    const [isAddCompetitionModalVisible, setIsAddCompetitionModalVisible] = useState(false);
    const [isProfileEditModalVisible, setIsProfileEditModalVisible] = useState(false);
    const [isScoreModalVisible, setIsScoreModalVisible] = useState(false); // 新增的状态
    const [currentUser, setCurrentUser] = useState(null);
    const [currentCompetition, setCurrentCompetition] = useState(null);
    const [currentApplication, setCurrentApplication] = useState(null);//返回当前的用户申请
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const [addUserForm] = Form.useForm();
    const [editCompetitionForm] = Form.useForm();
    const [addCompetitionForm] = Form.useForm();
    const [profileEditForm] = Form.useForm();
    const [submissionSearchForm] = Form.useForm();
    const [scoreForm] = Form.useForm(); // 新增的表单
    const [addUserAvatarUrl, setAddUserAvatarUrl] = useState('');
    const [searchForm] = Form.useForm();
    const [competitionSearchForm] = Form.useForm();
    const [applicationSearchForm] = Form.useForm();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 当前页码
    const [currentPage, setCurrentPage] = useState(1);
    // 一页可以存放的总个数
    const pageSize = 6;

    // 获取存在Cookie中的token
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserProfile();
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        if (e.key === '1') {
            fetchUsers();
        } else if (e.key === '4') {
            fetchCompetitions();
        } else if (e.key === '5') {
            fetchApplications();
        } else if (e.key === '6') {
            fetchSubmissions();
        } else if (e.key === 'profile') {
            fetchUserProfile();
        }
    };

    useEffect(() => {
        if (selectedKey === '1') {
            fetchUsers();
        } else if (selectedKey === '4') {
            fetchCompetitions();
        } else if (selectedKey === '5') {
            fetchApplications();
        } else if (selectedKey === '6') {
            fetchSubmissions();
        }
    }, [selectedKey]);

    // 编辑模态框
    const showEditModal = (user) => {
        setCurrentUser(user);
        setIsEditModalVisible(true);
    };

    // 详情模态框
    const showDetailModal = (user) => {
        setCurrentUser(user);
        setIsDetailModalVisible(true);
    };

    // 添加用户模态框
    const showAddUserModal = () => {
        setIsAddUserModalVisible(true);
    };

    // 展示添加竞赛模态框
    const showAddCompetitionModal = () => {
        setIsAddCompetitionModalVisible(true);
    };

    // 个人基本信息模态框
    const showProfileEditModal = () => {
        setIsProfileEditModalVisible(true);
        profileEditForm.setFieldsValue({ ...loggedInUser, avatarUrl: loggedInUser.avatarUrl });
    };

    // 用户报名详情模态框
    const showApplicationDetailModal = (application) => {
        setCurrentApplication(application);//设置当前竞赛信息
        setIsDetailModalVisible(true);
    };

    // 竞赛列表详情模态框
    const showCompetitionDetailModal = (competition) => {
        setCurrentCompetition(competition);
        setIsDetailModalVisible(true);
    };

    // 竞赛列表编辑模态框
    const showEditCompetitionModal = (competition) => {
        setCurrentCompetition(competition);
        setIsEditCompetitionModalVisible(true);
        editCompetitionForm.setFieldsValue({
            ...competition,
            startTime: competition.startTime ? moment(competition.startTime) : null,
            endTime: competition.endTime ? moment(competition.endTime) : null,
            registrationDeadline: competition.registrationDeadline ? moment(competition.registrationDeadline) : null
        });
    };

    // 用于设置分页状态的函数
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 分数模态框
    const showScoreModal = (submission) => {
        console.log('Selected submission:', submission); // 调试信息
        setCurrentSubmission(submission);
        setIsScoreModalVisible(true);
    };

    // 理编辑模态框（Modal）的取消操作
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setCurrentUser(null);
    };

    // 处理关闭详情模态框的操作
    const handleDetailCancel = () => {
        setIsDetailModalVisible(false); // 关闭模态框
        setCurrentUser(null); 
        setCurrentCompetition(null);
        setCurrentApplication(null);
        setCurrentSubmission(null);
    };

    // 处理关闭添加用户模态框
    const handleAddUserCancel = () => {
        setIsAddUserModalVisible(false);
        setAddUserAvatarUrl('');
        addUserForm.resetFields();
    };

    // 处理添加竞赛模态框
    const handleAddCompetitionCancel = () => {
        setIsAddCompetitionModalVisible(false);
        addCompetitionForm.resetFields();
    };

    // 处理个人信息详情按钮模态框
    const handleProfileEditCancel = () => {
        setIsProfileEditModalVisible(false);
    };

    // 处理评分模态框
    const handleScoreCancel = () => {
        setIsScoreModalVisible(false);
        scoreForm.resetFields();
    };

    // 处理竞赛列表编辑模态框
    const handleEditCompetitionCancel = () => {
        setIsEditCompetitionModalVisible(false);
        setCurrentCompetition(null);
    };

    // 搜索用户，三种搜索
    const handleSearch = (values) => {
        const { id, username, role } = values;
        const filtered = users.filter((user) => {
            return (
                (id ? user.id.toString().includes(id) : true) &&
                (username ? user.username.includes(username) : true) &&
                (role ? user.role.includes(role) : true)
            );
        });
        setFilteredUsers(filtered);
    };

    //文件上传完成后，它会从上传响应中获取文件路径，并使用 setLoggedInUser 函数更新登录用户的 avatarUrl。
    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            const avatarUrl = info.file.response.filePath;
            setLoggedInUser((prevUser) => ({
                ...prevUser,
                avatarUrl,
            }));
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    //当文件上传完成后，它会从上传响应中获取文件路径，并使用 setAddUserAvatarUrl 函数更新添加用户时的 avatarUrl
    const handleAddUserFileChange = (info) => {
        if (info.file.status === 'done') {
            setAddUserAvatarUrl(info.file.response.filePath);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    // get 获取个人基本信息
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile');
            setLoggedInUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    // get 获取所有用户列表
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // get 获取竞赛列表
    const fetchCompetitions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/competitions');
            setCompetitions(response.data);
            setFilteredCompetitions(response.data);
        } catch (error) {
            console.error('Failed to fetch competitions:', error);
        }
    };

    // get 获取用户申请列表
    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/applications');
            console.log('Fetched applications:', response.data);
            setApplications(response.data);
            setFilteredApplications(response.data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    };

    // get 获取用户作品列表
    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/submissions/list');
            console.log('Fetched submissions:', response.data);
            setSubmissions(response.data);
            setFilteredSubmissions(response.data);
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
        }
    };

    // put 处理编辑用户信息的表单提交
    const handleEditSubmit = async (values) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(values.password, salt);
            const updatedUser = { ...values, password: hashedPassword, avatarUrl: currentUser.avatarUrl };
            await axios.put(`http://localhost:5000/api/admin/users/${currentUser.id}`, updatedUser);
            message.success('User updated successfully!');
            fetchUsers();
            setIsEditModalVisible(false);
        } catch (error) {
            message.error('Failed to update user.');
        }
    };

    // put 处理编辑竞赛信息的表单提交
    const handleEditCompetitionSubmit = async (values) => {
        try {
            const updatedCompetition = {
                ...values,
                startTime: values.startTime ? values.startTime.format('YYYY-MM-DD HH:mm:ss') : null,
                endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : null,
                registrationDeadline: values.registrationDeadline ? values.registrationDeadline.format('YYYY-MM-DD HH:mm:ss') : null,
            };
            await axios.put(`http://localhost:5000/api/admin/competitions/${currentCompetition.id}`, updatedCompetition);
            message.success('Competition updated successfully!');
            fetchCompetitions();
            setIsEditCompetitionModalVisible(false);
        } catch (error) {
            message.error('Failed to update competition.');
        }
    };

    // post 处理添加用户信息的表单提交
    const handleAddUserSubmit = async (values) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(values.password, salt);
            const newUser = { ...values, password: hashedPassword, avatarUrl: addUserAvatarUrl };
            await axios.post('http://localhost:5000/api/admin/users', newUser);
            message.success('User added successfully!');
            fetchUsers();
            setIsAddUserModalVisible(false);
            setAddUserAvatarUrl('');
            addUserForm.resetFields();
        } catch (error) {
            message.error('Failed to add user.');
        }
    };

    // post 处理添加竞赛信息的表单提交
    const handleAddCompetitionSubmit = async (values) => {
        try {
            const newCompetition = {
                ...values,
                startTime: values.startTime ? values.startTime.format('YYYY-MM-DD HH:mm:ss') : null,
                endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : null,
                registrationDeadline: values.registrationDeadline ? values.registrationDeadline.format('YYYY-MM-DD HH:mm:ss') : null,
            };
            await axios.post('http://localhost:5000/api/admin/competitions', newCompetition);
            message.success('Competition added successfully!');
            fetchCompetitions();
            setIsAddCompetitionModalVisible(false);
            addCompetitionForm.resetFields();
        } catch (error) {
            message.error('Failed to add competition.');
        }
    };

    // put 处理修改个人信息的表单提交
    const handleProfileEditSubmit = async (values) => {
        try {
            const updatedProfile = { ...values, id: loggedInUser.id, avatarUrl: loggedInUser.avatarUrl };
            await axios.put('http://localhost:5000/api/profile', updatedProfile);
            message.success('Profile updated successfully!');
            fetchUserProfile();
            setIsProfileEditModalVisible(false);
        } catch (error) {
            message.error('Failed to update profile.');
        }
    };

    // post 处理提交分数的表单
    const handleScoreSubmit = async (values) => {
        console.log('Current submission:', currentSubmission); // 调试信息
        if (!currentSubmission || !currentSubmission.id) {
            message.error('无法获取当前作品的信息');
            return;
        }
        try {
            const scoreData = {
                submission_id: currentSubmission.id,
                user_id: loggedInUser.id,
                score: values.score,
                comment: values.comment,
            };
            const response = await axios.post('http://localhost:5000/api/scores', scoreData);
            message.success('评分成功!');
            setIsScoreModalVisible(false);
            fetchSubmissions(); // 重新获取作品列表以显示新的评分
        } catch (error) {
            message.error('评分失败!');
            console.error('Failed to submit score:', error.response ? error.response.data : error.message);
        }
    };

    // delete 处理删除用户的表单提交
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
            message.success('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            message.error('Failed to delete user.');
        }
    };

    // delete 处理删除竞赛信息的表单提交
    const handleCompetitionDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/competitions/${id}`);
            message.success('Competition deleted successfully!');
            fetchCompetitions();
        } catch (error) {
            message.error('Failed to delete competition.');
        }
    };

    // get 处理获取竞赛列表搜索选择
    const handleCompetitionSearch = (values) => {
        const { title, location, dateRange } = values;
        const filters = {
            title,
            location,
            start: dateRange && dateRange.length === 2 ? dateRange[0].toISOString() : null,
            end: dateRange && dateRange.length === 2 ? dateRange[1].toISOString() : null,
        };

        axios.get('http://localhost:5000/api/admin/competitions', { params: filters })
            .then(response => {
                setFilteredCompetitions(response.data);
                setCurrentPage(1); // Reset to first page on new search
            })
            .catch(error => {
                console.error('Failed to fetch competitions:', error);
            });
    };

    // 过滤用户申请的竞赛列表（查询）
    const handleApplicationSearch = (values) => { // values对象
        const { username, title, state_description } = values;
        const filtered = applications.filter((application) => {// 遍历application数组（竞赛数组）
            return (// 返回并且添加到filtered数组里面
                (username ? application.username.includes(username) : true) &&
                (title ? application.title.includes(title) : true) &&
                (state_description ? application.state_description.includes(state_description) : true)
            );
        });
        setFilteredApplications(filtered);
    };

    // 过滤用户提交的作品列表（查询）
    const handleSubmissionSearch = (values) => {
        const { username, title, created_at } = values;
        const filtered = submissions.filter((submission) => {
            return (
                (username ? submission.username.includes(username) : true) &&
                (title ? submission.title.includes(title) : true) &&
                (created_at ? moment(submission.created_at).isSame(created_at, 'day') : true)
            );
        });
        setFilteredSubmissions(filtered);
    };

    // put 审批用户提交的申请
    const handleApplicationStatus = async (id, state, state_description) => {
        try {
            if (!id) {
                console.error("Application ID is undefined");
                return;
            }
            await axios.put(`http://localhost:5000/api/admin/applications/${id}`, { state, state_description });
            message.success('Application status updated successfully!');
            fetchApplications();
        } catch (error) {
            console.error('Failed to update application status:', error);
            message.error('Failed to update application status.');
        }
    };

    // 调用handleApplicationStatus，更新状态
    const handleApprove = () => {
        handleApplicationStatus(currentApplication.id, 2, '审核通过');
        setIsDetailModalVisible(false); // 关闭模态框
    };

    // 调用handleApplicationStatus，更新状态
    const handleReject = () => {
        handleApplicationStatus(currentApplication.id, 0, '审核未通过');
        setIsDetailModalVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminHeader loggedInUser={loggedInUser} />
            <Layout>
                <SiderMenu selectedKey={selectedKey} handleMenuClick={handleMenuClick} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumbs selectedKey={selectedKey} />
                    <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff' }}>
                        {/* 判断没有登录，显示返回主页 */}
                        {!isLoggedIn ? (
                            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                                <h2>您还未登录，先去首页逛逛吧！</h2>
                                <Button type="primary" onClick={() => navigate('/')}>返回首页</Button>
                            </div>

                        ) : selectedKey === '1' ? (
                            <>
                                {/* 选择=1，那么显示用户列表字段 */}
                                <UserList
                                    users={users}
                                    filteredUsers={filteredUsers}
                                    showEditModal={showEditModal}
                                    handleDelete={handleDelete}
                                    showDetailModal={showDetailModal}
                                    showAddUserModal={showAddUserModal}
                                    searchForm={searchForm}
                                    handleSearch={handleSearch}
                                />
                                {/* 用户详情模态框 */}
                                <UserDetailModal
                                    isVisible={isDetailModalVisible}
                                    currentUser={currentUser}
                                    handleCancel={handleDetailCancel}
                                />
                                {/* 用户编辑模态框 */}
                                <UserEditModal
                                    isVisible={isEditModalVisible}
                                    currentUser={currentUser}
                                    handleCancel={handleEditCancel}
                                    handleSubmit={handleEditSubmit}
                                    handleFileChange={handleFileChange}
                                />
                                {/* 添加用户模态框 */}
                                <UserAddModal
                                    isVisible={isAddUserModalVisible}
                                    handleCancel={handleAddUserCancel}
                                    handleSubmit={handleAddUserSubmit}
                                    handleFileChange={handleAddUserFileChange}
                                    avatarUrl={addUserAvatarUrl}
                                    form={addUserForm}
                                />
                            </>
                            //选择=profile，显示个人基本信息 
                        ) : selectedKey === 'profile' ? (
                            <>
                                {/* 个人基本信息卡片 */}
                                <Profile
                                    loggedInUser={loggedInUser}
                                    showProfileEditModal={showProfileEditModal}
                                />
                                {/* 个人基本信息模态框 */}
                                <ProfileEditModal
                                    isVisible={isProfileEditModalVisible}
                                    handleCancel={handleProfileEditCancel}
                                    handleSubmit={handleProfileEditSubmit}
                                    handleFileChange={handleFileChange}
                                    form={profileEditForm}
                                    loggedInUser={loggedInUser}
                                />
                            </>
                            // 选择=5，显示用户申请竞赛列表
                        ) : selectedKey === '5' ? (
                            <>
                                {/* 用户申请竞赛列表组件 */}
                                <ApplicationList
                                    applications={filteredApplications}// vue的表单组件
                                    currentPage={currentPage}//当前页数
                                    pageSize={pageSize}// 一页总个数
                                    totalApplications={filteredApplications.length}
                                    handlePageChange={handlePageChange}//设置分页
                                    showDetailModal={showApplicationDetailModal}// 模态框
                                    searchForm={applicationSearchForm}// 初始化两个表单组件
                                    handleSearch={handleApplicationSearch} //搜索过滤
                                />
                                {/* 用户申请竞赛详情 */}
                                <ApplicationDetailModal
                                    isVisible={isDetailModalVisible}//是否要打开模态框
                                    currentApplication={currentApplication}
                                    handleCancel={handleDetailCancel}//关闭模态框
                                    handleApprove={handleApprove}// 通过
                                    handleReject={handleReject}// 拒绝
                                />
                            </>
                            // 选择=6，显示用户提交的作品
                        ) : selectedKey === '6' ? (
                            <>
                                {/* 用户提交作品列表 */}
                                <SubmissionList
                                    submissions={filteredSubmissions}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalSubmissions={filteredSubmissions.length}
                                    handlePageChange={handlePageChange}
                                    showScoreModal={showScoreModal}
                                    searchForm={submissionSearchForm}
                                    handleSearch={handleSubmissionSearch}
                                />
                                {/* 用户提交做皮详情模态框 */}
                                <SubmissionDetailModal
                                    isVisible={isDetailModalVisible}
                                    currentSubmission={currentSubmission}
                                    handleCancel={handleDetailCancel}
                                />
                                {/* 评分模态框 */}
                                <ScoreModal
                                    isVisible={isScoreModalVisible}
                                    handleCancel={handleScoreCancel}
                                    handleSubmit={handleScoreSubmit}
                                    form={scoreForm}
                                />
                            </>
                        ) : (
                            // 竞赛列表
                            <>
                                <CompetitionList
                                    competitions={filteredCompetitions}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalCompetitions={filteredCompetitions.length}
                                    handlePageChange={handlePageChange}
                                    showDetailModal={showCompetitionDetailModal}
                                    showEditModal={showEditCompetitionModal}
                                    handleDelete={handleCompetitionDelete}
                                    showAddModal={showAddCompetitionModal}
                                    searchForm={competitionSearchForm}
                                    handleSearch={handleCompetitionSearch}
                                />
                                <CompetitionDetailModal
                                    isVisible={isDetailModalVisible}
                                    currentCompetition={currentCompetition}
                                    handleCancel={handleDetailCancel}
                                />
                                <CompetitionEditModal
                                    isVisible={isEditCompetitionModalVisible}
                                    currentCompetition={currentCompetition}
                                    handleCancel={handleEditCompetitionCancel}
                                    handleSubmit={handleEditCompetitionSubmit}
                                    form={editCompetitionForm}
                                />
                                <CompetitionAddModal
                                    isVisible={isAddCompetitionModalVisible}
                                    handleCancel={handleAddCompetitionCancel}
                                    handleSubmit={handleAddCompetitionSubmit}
                                    form={addCompetitionForm}
                                />
                            </>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminApp;
