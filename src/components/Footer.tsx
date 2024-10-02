import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-gray-800 to-black text-white py-2'>
      <div className='flex flex-col items-center'>
        <p className='mb-2'>A community dedicated to Batman fans.</p>
        <a 
          href='https://github.com/KevinSoto9/BatmanWiki' 
          target='_blank' 
          rel='noopener noreferrer' 
          className='flex items-center gap-2 text-blue-400 hover:text-blue-600'
        >
          <FaGithub className='w-5 h-5' />
          View on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
