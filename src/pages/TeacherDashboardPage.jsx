// pages/TeacherDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Users, QrCode, TrendingUp, Award, Crown, BookOpen,
  Bell, Search, Activity, Coins, BarChart3, PieChart,
  Settings, User, Heart
} from 'lucide-react';
import { isTokenExpired } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { fetchStudents, registerStudent } from "../api/students";
import { getStudentByQR, awardPointsToStudent } from "../api/qrScanning";

// Component imports
import FloatingIcon from '../components/FloatingIcon';
import StatCard from '../components/StatCard';
import StudentCard from '../components/StudentCard';
import TransactionItem from '../components/TransactionItem';
import QuickAction from '../components/QuickAction';
import RegisterStudentModal from '../components/RegisterStudentModal';
import AwardPointsModal from '../components/AwardPointsModal';
import QRScannerModal from '../components/QRScannerModal';

const TeacherDashboardPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || isTokenExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);

  const [currentTeacher, setCurrentTeacher] = useState({
    username: 'MrsJohnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    totalStudents: 24,
    activeStudents: 22,
    totalPointsAwarded: 15750,
    thisWeekPoints: 890,
    averageStudentBalance: 425
  });

  const [students, setStudents] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [pointsToAward, setPointsToAward] = useState(50);
  const [awardReason, setAwardReason] = useState('');
  const [isAwarding, setIsAwarding] = useState(false);

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    salvationDate: '',
    phoneNumber: '',
    email: '',
    gender: ''
  });

  // Load students on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    loadStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const fullName = student.name || "";
    const username = student.username || "";
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle QR scan - fetch student data from backend
  const handleQRScan = async (qrValue) => {
    console.log("📦 QR Code scanned:", qrValue);
    
    try {
      const studentData = await getStudentByQR(qrValue);
      console.log("✅ Student data received:", studentData);
      
      // Set the student for the award modal
      setSelectedStudent(studentData);
      
      // Close QR scanner
      setShowQRScanner(false);
      
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      
      const errorMessage = error.response?.data?.error || 'Failed to fetch student data';
      alert(`Error: ${errorMessage}`);
      
      // Keep QR scanner open so they can try again
    }
  };

  // Handle awarding points - send to backend
  const awardPoints = async () => {
    if (!selectedStudent || !pointsToAward || !awardReason) {
      alert('Please fill in all fields');
      return;
    }

    if (isAwarding) return; // Prevent double submission

    setIsAwarding(true);

    try {
      const result = await awardPointsToStudent(
        selectedStudent.id,
        pointsToAward,
        awardReason
      );

      console.log("✅ Points awarded successfully:", result);

      // Update local student list with new balance
      setStudents(prev => prev.map(s =>
        s.id === selectedStudent.id
          ? { ...s, balance: result.new_balance }
          : s
      ));

      // Add to recent transactions
      const newTransaction = {
        id: result.transaction.id,
        studentName: selectedStudent.name,
        type: 'earn',
        amount: pointsToAward,
        reason: awardReason,
        timestamp: 'Just now',
        teacherAction: true
      };
      setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);

      // Update teacher stats
      setCurrentTeacher(prev => ({
        ...prev,
        totalPointsAwarded: prev.totalPointsAwarded + pointsToAward,
        thisWeekPoints: prev.thisWeekPoints + pointsToAward
      }));

      // Reset form and close modal
      setSelectedStudent(null);
      setPointsToAward(50);
      setAwardReason('');

      alert(`✅ Successfully awarded ${pointsToAward} points to ${selectedStudent.name}!`);

    } catch (error) {
      console.error("❌ Error awarding points:", error);
      
      const errorMessage = error.response?.data?.error || 'Failed to award points';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsAwarding(false);
    }
  };

  const registerStudentHandler = async () => {
    try {
      const payload = {
        username: newStudent.username,
        password: newStudent.password,
        email: newStudent.email,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        phoneNumber: newStudent.phoneNumber,
        birthday: newStudent.birthday,
        salvationDate: newStudent.salvationDate,
        gender: newStudent.gender,
      };

      const studentToAdd = await registerStudent(payload);

      setStudents((prev) => [studentToAdd, ...prev]);
      setCurrentTeacher((prev) => ({
        ...prev,
        totalStudents: prev.totalStudents + 1,
        activeStudents: prev.activeStudents + 1,
      }));

      setNewStudent({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        salvationDate: "",
        phoneNumber: "",
        email: "",
        gender: "",
      });

      setShowRegisterModal(false);
      alert(`Successfully registered ${studentToAdd.name}!`);
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to register student. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={Crown} delay={0} position="top-8 left-8" color="text-yellow-400" />
      <FloatingIcon icon={BookOpen} delay={1000} position="top-16 right-16" color="text-blue-400" />
      <FloatingIcon icon={Award} delay={2000} position="bottom-20 left-12" color="text-green-400" />
      <FloatingIcon icon={Users} delay={3000} position="bottom-16 right-20" color="text-purple-400" />

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                👩‍🏫
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                <Crown size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, {currentTeacher.firstName}!</h1>
              <p className="text-purple-200">Teacher Dashboard • {currentTeacher.totalStudents} Students</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowQRScanner(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <QrCode size={20} />
              <span>Scan QR Code</span>
            </button>

            <button className="relative p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
                3
              </div>
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Active Students"
            value={`${currentTeacher.activeStudents}/${currentTeacher.totalStudents}`}
            subtitle="This week"
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
            trend={8}
          />
          <StatCard
            icon={Coins}
            title="Points Awarded"
            value={currentTeacher.totalPointsAwarded.toLocaleString()}
            subtitle="All time"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            trend={12}
          />
          <StatCard
            icon={TrendingUp}
            title="This Week"
            value={currentTeacher.thisWeekPoints}
            subtitle="Points given"
            color="bg-gradient-to-br from-purple-500 to-violet-600"
            trend={5}
          />
          <StatCard
            icon={BarChart3}
            title="Avg Balance"
            value={currentTeacher.averageStudentBalance}
            subtitle="Per student"
            color="bg-gradient-to-br from-orange-500 to-red-500"
            trend={-2}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <QuickAction
            icon={QrCode}
            title="Scan Student QR"
            description="Award points instantly by scanning student QR codes"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            onClick={() => setShowQRScanner(true)}
          />
          <QuickAction
            icon={User}
            title="Register Student"
            description="Add a new student to your class"
            color="bg-gradient-to-br from-pink-500 to-rose-600"
            onClick={() => setShowRegisterModal(true)}
          />
          <QuickAction
            icon={PieChart}
            title="Class Analytics"
            description="View detailed reports and student progress"
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
            onClick={() => setActiveTab('analytics')}
          />
          <QuickAction
            icon={Settings}
            title="Manage Settings"
            description="Configure point values and class preferences"
            color="bg-gradient-to-br from-purple-500 to-violet-600"
            onClick={() => setActiveTab('settings')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Management */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Users className="mr-2 text-blue-500" size={24} />
                Student Management
              </h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredStudents.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onAwardPoints={(student) => {
                    console.log('Student card clicked:', student);
                    setSelectedStudent(student);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Activity className="mr-2 text-green-500" size={24} />
                Recent Activity
              </h3>
              <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentTransactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <RegisterStudentModal
          show={showRegisterModal}
          setShow={setShowRegisterModal}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          registerStudent={registerStudentHandler}
        />

        <AwardPointsModal
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          pointsToAward={pointsToAward}
          setPointsToAward={setPointsToAward}
          awardReason={awardReason}
          setAwardReason={setAwardReason}
          onAwardPoints={awardPoints}
          isAwarding={isAwarding}
        />

        <QRScannerModal
          show={showQRScanner}
          setShow={setShowQRScanner}
          onScan={handleQRScan}
        />

        {/* Footer */}
        <div className="text-center py-8 mt-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 text-white backdrop-blur-sm">
            <Crown className="text-yellow-400" size={16} />
            <span className="text-sm font-semibold">Empowering young hearts, one point at a time!</span>
            <Heart className="text-red-400" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;