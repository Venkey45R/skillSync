import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <div className='flex justify-center w-full py-6 text-white border-t border-white text-serif'>
        <div>
            <h2 className='my-3 text-base font-normal text-center lg:font-bold lg:text-xl'>Skill Sync --- Built for developers, by developers.</h2>
            <p className="my-2 text-sm text-center">© 2025 SkillSync. All rights reserved.</p>
            <h3 className='my-6 font-bold text-center text-md'>Website Built by: <a href="https://venkatesh-portfolio-eight.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> Venkatesh A</a></h3>
            <div className='flex justify-center mb-3 text-3xl font-bold text-blue-500 gap-14'>
                <a href="http://www.linkedin.com/in/venkateshamulraj2004" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/Venkey45R" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="mailto:venkateshamulraj@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
            </div>
            <p className='mt-10 text-sm text-center'>Made with ❤️ as a portfolio project</p>
        </div>
    </div>
  )
}

export default Footer