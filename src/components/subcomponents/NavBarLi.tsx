import {motion}  from 'framer-motion';

export const NavBarLi = () => {
  return (
    <ul className='lg:flex'>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay:0.3, duration: 2}}
            className='my-4 lg:my-0 border-b-2 lg:border-b-0'
        >
            <a className='text-[1.4rem] px-6 lg:hover:border-b-2' href="/">Home</a>
        </motion.div>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay:0.4, duration: 2}}
            className='my-4 lg:my-0 border-b-2 lg:border-b-0'
        >
            <a className='text-[1.4rem] px-6 lg:hover:border-b-2' href="/Comics">Comics</a>
        </motion.div>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay:0.5, duration: 2}}
            className='my-4 lg:my-0 border-b-2 lg:border-b-0'
        >
            <a className='text-[1.4rem] px-6 lg:hover:border-b-2' href="/Games">Films</a>
        </motion.div>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay:0.6, duration: 2}}
            className='my-4 lg:my-0 border-b-2 lg:border-b-0'
        >
            <a className='text-[1.4rem] px-6 lg:hover:border-b-2' href="#">Games</a>
        </motion.div>
    </ul>
  )
}

export default NavBarLi