import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const hero = () => {
  return (
    <div className="min-h-screen bg-black-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Main content */}
        <div className="space-y-6 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            <span className="block">Hi, I'm</span>
            <span className="block text-black-500">James Victor Alvarez</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300">
            Computer Science student at Concordia University
          </p>
          
          <p className="text-gray-400 text-lg max-w-2xl">
            I am a Computer Science student at Concordia University, Montreal, Canada. 
            I am passionate about software development and I love to learn new things. 
          </p>

          {/* Social links */}
          <div className="flex gap-6 justify-center sm:justify-start mt-8">
            <a href="https://github.com/JamesVictorAlvarez" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/jv-alvarez/" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="jamesvictoralvarez@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="bg-black-500 hover:bg-black-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              View My Work
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default hero