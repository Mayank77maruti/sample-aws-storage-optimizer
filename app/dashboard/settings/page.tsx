"use client"

import DeveloperGuide from '@/components/developer';
import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';

interface FormInputProps {
    label: string;
    type?: string;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SettingsCardProps {
    title: string;
    children: ReactNode;
}
  
function SettingsCard({ title, children }: SettingsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        {children}
        </div>
    );
}

function FormInput({ label, type = 'text', placeholder, value, name, onChange }: FormInputProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
}


function Settings() {

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnsubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    console.log("formdata: ", personalInfo)
    try {
      const res = await axios.get('/api/sellerId');
      const { sellerId }: { sellerId: string } = res.data;

      const response = await axios.put('/api/profile', { ...personalInfo, sellerId });
      console.log("profile updated successfully: ", response.data);
    } catch (error) {
      console.error('Error updating the profile: ', error);
    }

  }

  const getUserInfo = async() => {
    try {
      const response = await axios.get('/api/profile', {
        withCredentials: true
      });
      console.log('Fetched user successfully :', response.data);
      const user = response.data.seller;

      setPersonalInfo({ ...personalInfo, 
        name: user.name, 
        email: user.email, 
        phone: user.phone, 
        address: user.address,
        city: user.city,
        country: user.country,
        pincode: user.pincode,
        state: user.state
      });
    } catch (error) {
      console.error('Error fetching the user: ', error);
    }
  }

  useEffect(()=>{
    getUserInfo();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <form onSubmit={handleOnsubmit}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>

        <SettingsCard title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="name"
              placeholder="Enter your first name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
            <FormInput
              label="Phone Number"
              type="tel"
              name='phone'
              placeholder="Enter your phone number"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Address">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput
                label="Street Address"
                name="address"
                placeholder="Enter your street address"
                value={personalInfo.address}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <FormInput
              label="City"
              name="city"
              placeholder="Enter your city"
              value={personalInfo.city}
              onChange={handlePersonalInfoChange}
            />
            <FormInput
              label="State/Province"
              name="state"
              placeholder="Enter your state"
              value={personalInfo.state}
              onChange={handlePersonalInfoChange}
            />
            <FormInput
              label="ZIP/Postal Code"
              name="pincode"
              placeholder="Enter your ZIP code"
              value={personalInfo.pincode}
              onChange={handlePersonalInfoChange}
            />
            <FormInput
              label="Country"
              name="country"
              placeholder="Enter your country"
              value={personalInfo.country}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </SettingsCard>
      </form>
    
    </div>
  );
}

export default Settings;