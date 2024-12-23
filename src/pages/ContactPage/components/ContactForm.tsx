import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

const ContactForm = () => {
  const { formData, handleChange, handleSubmit, status } = useContactForm();

  return (
    <div className="col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">שלח הודעה</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">שם מלא</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">אימייל</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">טלפון</label>
            <input
              type="tel"
              name="phone"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">נושא</label>
            <input
              type="text"
              name="subject"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">הודעה</label>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          {status && (
            <span className="text-green-400 flex items-center">
              <MessageCircle className="h-5 w-5 ml-2" />
              {status}
            </span>
          )}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full flex items-center space-x-2 space-x-reverse transition-all"
          >
            <Send className="h-5 w-5" />
            <span>שלח הודעה</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;