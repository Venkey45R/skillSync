import React from 'react';
import home_bg from '../assets/home_bg.mp4';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import creator from '../assets/creator.jpeg';
import { FaUsers, FaTasks, FaComments, FaProjectDiagram } from 'react-icons/fa';
import contributor from '../assets/contributor.jpeg';
import CountUp from 'react-countup';
import Footer from './Footer';
import { useInView } from 'react-intersection-observer';

function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3,     
  });
  return (
    <div className='relative overflow-hidden font-serif'>
      <video autoPlay muted loop playsInline className=' inset-0 w-full fixed min-h-screen object-cover z-[-1] blur'>
        <source src={home_bg} type='video/mp4' />
      </video>
      <div className='relative z-10 text-white'>
        <div className='flex justify-between px-8 py-6 border-b border-white lg:px-20'>
          <div>
            <h1 className='text-2xl font-bold text-white lg:text-3xl font-rubik'>Skill Sync</h1>
          </div>
          <div className='flex gap-4 lg:gap-14'>
            <Link to='/signin' className='px-4 py-2 border border-white rounded-xl hover:bg-white hover:text-black'>Sign In</Link>
            <Link to='/signup' className='px-4 py-2 border border-white rounded-xl hover:bg-white hover:text-black'>Sign Up</Link>
          </div>
        </div>
        <motion.div className='flex justify-center my-6 lg:my-16' initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} transition={{duration: 1.5, ease: 'easeOut'}}>
          <div className='max-w-72 lg:max-w-xl'>
            <h2 className='my-6 text-3xl font-semibold text-center leading-12 lg:text-5xl lg:leading-16'>A Platform Built for Dream Teams</h2>
            <p className='my-6 leading-7 text-center'>Don’t just imagine your dream project. Build it with a team that shares your passion. SkillSync is where ideas meet action.</p>
            <div className='flex justify-center my-6'>
              <Link to="/signin" className='px-4 py-2 text-center border border-white rounded-xl hover:bg-white hover:text-black'>Start Collaborating</Link>
            </div> 
          </div>
        </motion.div>
        <motion.div className='justify-center block gap-20 lg:flex' initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.5, ease: 'easeOut' }}>
          <div className='flex justify-center my-6 lg:my-0'>
            <div className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-72 hover:bg-white/20">
              70% of developers are eager to contribute to real world projects
            </div>
          </div>
          <div className='flex justify-center my-6 lg:my-0'>
            <div className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-72 hover:bg-white/20">
              successful projects need 3-5 people with different skills to thrive
            </div>
          </div>
          <div className='flex justify-center my-6 lg:my-0'>
            <div className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-72 hover:bg-white/20">
              90% of projects never go beyond ideation
            </div>
          </div>
        </motion.div>
      </div>      
      <motion.div className='min-h-screen py-12 text-white' initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 2.2 }}>
        <h2 className='my-6 text-2xl text-center text-white'>What in for you</h2>
        <div className='justify-center block my-10 lg:flex'>
          <div className='justify-between block gap-20 lg:flex'>
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg max-w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <img src={creator} alt='creator' className='rounded-xl'/>
                <h3 className='my-4 text-xl'>For creators</h3>
              </div>
            </div>
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaUsers size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Build your dream team</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Find like-minded devs</li>
                  <li className='my-3'>Match complementary skills</li>
                  <li className='my-3'>Grow together fast</li>
                </ul>
              </div>
            </div>
            
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaTasks size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Manage projects efficiently</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Track tasks easily</li>
                  <li className='my-3'>Set clear deadlines</li>
                  <li className='my-3'>Stay on schedule</li>
                </ul>
              </div>
            </div>
            
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaComments size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Collaborate in real-time</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Live team updates</li>
                  <li className='my-3'>Instant feedback loops</li>
                  <li className='my-3'>Smooth coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='justify-center block my-10 lg:flex'>
          <div className='justify-between block gap-20 lg:flex'>
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg max-w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <img src={contributor} alt='contributor' className='rounded-xl'/>
                <h3 className='my-4 text-xl'>For contributors</h3>
              </div>
            </div>
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaProjectDiagram size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Work on real projects</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Apply your skills</li>
                  <li className='my-3'>Solve real problems</li>
                  <li className='my-3'>Build credibility</li>
                </ul>
              </div>
            </div>
            
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaTasks size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Find intresting projects</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Choose your niche</li>
                  <li className='my-3'>Match your passions</li>
                  <li className='my-3'>Stay motivated always</li>
                </ul>
              </div>
            </div>
            
            <div className='flex justify-center my-6 lg:my-0'>
              <div className='p-4 text-center shadow-lg w-72 rounded-xl max-h-72 bg-white/20 backdrop-blur-lg'>
                <div className='flex justify-center'>
                  <FaComments size={100} className="text-blue-500" />
                </div>
                <h3 className='my-4 text-xl'>Build your Network</h3>
                <ul className='ml-6 text-sm text-left list-disc'>
                  <li className='my-3'>Connect with peers</li>
                  <li className='my-3'>Collaborate with mentors</li>
                  <li className='my-3'>Grow career opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>  
      <div ref={ref} className='flex justify-center py-0 my-4 font-serif text-white lg:my-16 lg:py-0'>
        <div>
          <div className='flex flex-col justify-center gap-6 text-center lg:flex-row lg:gap-32'>
            <h3 className='text-md'>
              <span className='py-10 text-xl font-bold lg:py-0'>
                {inView && <CountUp start={0} end={100} duration={2} />}+
              </span> live projects
            </h3>
            <h3 className='text-md'>
              <span className='py-10 text-xl font-bold lg:py-0'>
                {inView && <CountUp start={0} end={500} duration={2} />}+
              </span> contributors
            </h3>
            <h3 className='text-md'>
              <span className='py-10 text-xl font-bold lg:py-0'>
                {inView && <CountUp start={0} end={4} duration={2} />} /5 ⭐️
              </span> rated
            </h3>
          </div>
          <div className='flex justify-center mx-4 my-8 lg:mx-0'>
            <div>
              <div className='max-w-xl px-6 py-3 my-6 rounded-xl bg-white/10'>
                <div className='flex justify-between my-3'>
                  <p className='text-sm'>Arjun R., Full Stack Enthusiast</p>
                  <span className=''>⭐️⭐️⭐️⭐️⭐️</span>
                </div>
                <p className='px-10 italic leading-6 text-center text-md'>"I joined as a contributor and ended up leading a project! Great platform for learning and real-world collaboration."</p>
              </div>
              <div className='max-w-xl px-6 py-3 my-6 rounded-xl bg-white/10'>
                <div className='flex justify-between my-3'>
                  <p className='text-sm'>Aadvik R., Computer Science Student</p>
                  <span className=''>⭐️⭐️⭐️⭐️</span>
                </div>
                <p className='px-10 italic leading-6 text-center text-md'>"Perfect place for students like me to gain experience, work in a team, and build a strong portfolio."</p>
              </div>
              <div className='max-w-xl px-6 py-3 my-6 rounded-xl bg-white/10'>
                <div className='flex justify-between my-3'>
                  <p className='text-sm'>Siddharth T., Backend Developer</p>
                  <span className=''>⭐️⭐️⭐️⭐️⭐️</span>
                </div>
                <p className='px-10 italic leading-6 text-center text-md'>"This platform gave me the confidence to build and launch my first open-source project. Truly empowering."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
