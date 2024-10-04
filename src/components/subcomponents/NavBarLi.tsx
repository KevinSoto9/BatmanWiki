import { motion } from 'framer-motion';

export const NavBarLi = () => {
  return (
    <ul className='flex flex-col min-[1500px]:flex-row'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/">Home</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/Comics">Comics</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/Characters">Characters</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/Locations">Locations</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/Concepts">Concepts</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="/Movies">Movies</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 2 }}
        className='my-4 border-b-2 min-[1500px]:border-b-0 min-[1500px]:my-0'
      >
        <a className='text-[1.4rem] px-6 min-[1500px]:hover:border-b-2' href="#">Games</a>
      </motion.div>
    </ul>
  );
}

export default NavBarLi;
