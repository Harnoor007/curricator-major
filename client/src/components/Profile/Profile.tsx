import { Checkbox, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { Button } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
const Profile: React.FC = () => {
  const [isLogHistoryEnabled, setLogHistoryEnabled] = useState<boolean>(false);

  const handleLogHistoryToggle = () => {
    setLogHistoryEnabled(!isLogHistoryEnabled);
  };

  return (
    <div className="profile">
      <header className="bg-teal-700 text-white py-4 px-6 rounded-md mx-12">
        <h1 className="text-3xl font-semibold text-center">
          Profile
        </h1>
        {/* Add any additional information here */}
      </header>
      <div className="min-h-screen flex justify-between">
        <div className="w-96 h-96 rounded-md  bg-gray-200 my-12 flex items-center justify-center p-8 ml-12">

          {/* Image Column */}
          <div className="">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Profile Picture"
              className=" w-32 h-32 rounded-full"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 bg-gray-200 rounded-md mt-12 mr-12">
        <div className=" mb-6 col-span-2 mt-4 flex flex-row justify-between">
                <div className="flex items-center space-x-2">
                <label
                  htmlFor="logHistory"
                  className="block text-l font-medium text-gray-700"
                >
                  Log History
                </label>
                <Checkbox crossOrigin={undefined} 
                  color="teal"
                  onClick={handleLogHistoryToggle}
                />
                </div>
                <div className="flex flex-row gap-3">
                <Button
                  variant="outlined"
                  >
                    <PencilIcon className='w-5 h-5 mr-1 my-0 '/>  
                  {/* Edit */}
                </Button>
                <Button

                >
                  Save
                </Button>
                </div>
              </div>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md ==">
              {/* <div className="mb-4">
              </div> */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='user@institution.com'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='User'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='User'
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='Applied Science'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='PhD'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience (in years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='20'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='Assistant Professor'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="resetPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reset Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="resetPassword"
                  name="resetPassword"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='password1'
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="userGroup"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Group <span className="text-red-500">*</span>
                </label>
                <Select
                  id="userGroup"
                  name="userGroup"
                  className="mt-1 p-2 rounded-md w-full bg-white"
                  value="Course Owner"
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="Chairman">Chairman</Option>
                  <Option value="CourseOwner">Course Owner</Option>
                  <Option value="Director">Director</Option>
                  <Option value="ProgramOwner">Program Owner</Option>
                </Select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value='password1'
                />
              </div>

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
