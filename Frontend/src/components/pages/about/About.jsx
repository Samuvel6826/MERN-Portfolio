import React from 'react'
import './About.css'
import AboutImg from "../../../assets/about.jpg"
import { FaAward } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";

const About = () => {
    return <section id='about' className=' h-[calc(100vh-4rem)] bg-primary text-white mx-auto flex flex-col items-center justify-evenly px-4 py-2'>

        <div id='about-container' className=' container h-full mx-auto flex flex-col justify-between gap-2'>

            <header id='about-header' className=' w-full text-secondary text-center'>
                <h1 id='about-page-title'>About Me</h1>
                <p id='about-page-desc'>My Introduction</p>
            </header>

            <div id="about-wrapper" className=" h-[92%] flex flex-col gap-2">
                <img id='about-img' className='w-full h-[30%] rounded-2xl' src={AboutImg} alt="" />

                <div id='about-content' className='w-full h-[70%] flex flex-col gap-2'>
                    <div id='about-box-container' className=' grid grid-cols-3 w-full gap-2'>
                        <div id='s-box'>
                            <FaAward />
                            <h4>Experience</h4>
                            <p>2 years</p>
                        </div>
                        <div id='s-box'>
                            <FaAward />
                            <h4>Experience</h4>
                            <p>2 years</p>
                        </div>
                        <div id='s-box'>
                            <FaAward />
                            <h4>Experience</h4>
                            <p>2 years</p>
                        </div>
                    </div>
                    <p id='about-para' className=' text-justify text-[1.8vh] leading-5'>
                        I Proficient in HTML, CSS, and JavaScript, I specialize in frontend development. Leveraging frameworks like Bootstrap and Tailwind CSS, I streamline the design responsive websites. I'm well-versed in backend technologies, including Node.js, Express.js, and MongoDB, Handling everything from server-side logic to database management. Furthermore experience with version control systems like Git and GitHub, ensuring efficient collaboration and code management. Please find below the list of skills I possess.
                    </p>
                    <button id='about-resume-btn'>
                        <a href="">Download Resume</a>
                        <LiaFileDownloadSolid />
                    </button>
                </div>
            </div>
        </div>
    </section>

}

export default About