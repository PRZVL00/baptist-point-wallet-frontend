import React from "react";
import { User, Sparkles, Heart } from "lucide-react";

const RegisterStudentModal = ({
  show,
  setShow,
  newStudent,
  setNewStudent,
  registerStudent
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <User className="mr-2 text-pink-500" size={24} />
              Register New Student
            </h3>
            <p className="text-gray-600 text-sm mt-1">Add a new student to your Baptist Points class</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {/* Basic Info */}
          <div className="md:col-span-2 bg-purple-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-purple-800 mb-3 flex items-center">
              <Sparkles size={16} className="mr-2" />
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  <span className="text-red-500">*</span> First Name
                </label>
                <input
                  type="text"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  <span className="text-red-500">*</span> Last Name
                </label>
                <input
                  type="text"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Gender
                </label>
                <select
                  value={newStudent.gender || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="md:col-span-2 bg-blue-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <User size={16} className="mr-2" />
              Account Details
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  <span className="text-red-500">*</span> Username
                </label>
                <input
                  type="text"
                  value={newStudent.username}
                  onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter unique username"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    <span className="text-red-500">*</span> Password
                  </label>
                  <input
                    type="password"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    <span className="text-red-500">*</span> Confirm Password
                  </label>
                  <input
                    type="password"
                    value={newStudent.confirmPassword}
                    onChange={(e) => setNewStudent({ ...newStudent, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors ${newStudent.password && newStudent.confirmPassword && newStudent.password !== newStudent.confirmPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-purple-500'
                      }`}
                    placeholder="Confirm password"
                    required
                  />
                  {newStudent.password && newStudent.confirmPassword && newStudent.password !== newStudent.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="md:col-span-2 bg-green-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <Heart size={16} className="mr-2" />
              Personal Information <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={newStudent.phoneNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Birthday</label>
                <input
                  type="date"
                  value={newStudent.birthday || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, birthday: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              {/* Salvation Date - Optional religious field */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Salvation Date</label>
                <input
                  type="date"
                  value={newStudent.salvationDate || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, salvationDate: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShow(false)}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={registerStudent}
            disabled={
              !newStudent.firstName ||
              !newStudent.lastName ||
              !newStudent.username ||
              !newStudent.password ||
              newStudent.password !== newStudent.confirmPassword
            }
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <User size={20} />
            <span>Register Student</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudentModal;