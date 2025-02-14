import React from 'react';
import { HoverEffect } from './ui/card-hover-effect';
import Image from 'next/image';
import { HoverBorderGradient } from './ui/hover-border-gradiant';
import { FaReact, FaJs, FaPython, FaJava, FaNodeJs, FaPhp } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiDart, SiFlutter, SiFirebase } from "react-icons/si";
import { DiGithubBadge } from "react-icons/di";

const AboutMe = () => {

    const skillIcons = {
        React: <FaReact />,
        JavaScript: <FaJs />,
        TypeScript: <SiTypescript />,
        Python: <FaPython />,
        "GitHub": <DiGithubBadge />,
        "C++": <SiCplusplus />,
        Java: <FaJava />,
        Flutter: <SiFlutter />,
        Dart: <SiDart />,
        PHP: <FaPhp />,
        Firebase: <SiFirebase />,
        "Node.js": <FaNodeJs />
    };

  return (
    <section id='about'>
        <div className="min-h-screen sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="text-center">
            <div className="relative w-36 h-36 mx-auto mb-8">
                <Image
                fill
                src="/Me.jpg"
                alt="Profile"
                className="rounded-full"
                />
            </div>
            </div>
            <div className='text-center'>
                <h2 className="text-4xl font-bold text-slate-300 mb-5">About Me</h2>
                <div className='flex items-center justify-center mb-5'>
                    <div className='h-2 bg-black-500 w-[90px]'></div>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    I started coding in 2020 after high school when I was trying to find what I wanted to do in life.
                    After falling in love with programming, I decided to pursue it as a career. My enthusiasm lies in 
                    learning cutting-edge technologies that push the boundaries of what&apos;s possible on the internet
                    Whether it&apos;s through coding, design, or experimentation, I&apos;m always excited to explore new ways to 
                    bring ideas to life.
                </p>
            </div>
            <div className="max-w-5xl mx-auto px-8 cursor-default">
                <HoverEffect items={[
                {
                    title: "Languange",
                    description: "English, French, Tagalog"
                },
                {
                    title: "Location",
                    description:
                    "Located in Laval, Quebec, Canada"
                },
                {
                    title: "School",
                    description:
                    "Finished a DEC in Computer Science at Vanier College and continuing in Concordia University"
                },
                ]} />
            </div>

            {/* Skills Section */}
            <h2 className="text-3xl font-bold text-center text-slate-200 mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.entries(skillIcons).map(([skill, Icon]) => (
                <HoverBorderGradient
                    containerClassName="rounded-full flex items-center justify-center"
                    key={skill}
                    className=" bg-black-400 text-slate-300 dark:text-white px-4 py-2 text-center w-full flex items-center justify-center text-xl"
                    as='div'
                >
                    {Icon}
                </HoverBorderGradient>
                ))}
            </div>
        </div>
        </div>
    </section>
  );
};

export default AboutMe;