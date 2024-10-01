import { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import { AiOutlineClose, AiOutlineAlignRight} from "react-icons/ai";
import NavBarLi from './subcomponents/NavBarLi';

export const NavBar = () => {

    const [show, setShow] = useState(false)

    const [imageSrc, setImageSrc] = useState('/src/assets/NavSymbol.png');

    const handleError = () => {
        setImageSrc('../src/assets/NavSymbol.png');
    };

    return (
    <div className='bg-gradient-to-b from-black to-gray-800 text-white h-[4rem] px-10 pb-10 py-6 w-full fixed top-0 left-0 z-50'>
        <div className='flex justify-between'>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay:0.3, duration: 2}}
            >
                <div className='flex items-center gap-4'>
                    <a href='/'><h1 className='text-[1.5rem]'>{'BatmanWiki'}</h1></a>
                    <img 
                    src={imageSrc} 
                    alt='batman' 
                    className='w-[3rem] h-[2rem]' 
                    onError={handleError}
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay:0.3, duration: 2}}
                className='lg:hidden'
            >
                <button onClick={() => setShow(!show)} >
                    {show ?

                        <AiOutlineClose className='w-[2rem] h-[2rem]'/> :
                        <AiOutlineAlignRight className='w-[2rem] h-[2rem]'/>
                    }
                </button>
            </motion.div>
            <div className='hidden lg:block'>
                <NavBarLi/>
            </div>
        </div>
        
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{right: "-100%"}}
                    animate={{right: "0%"}}
                    exit={{right: "-100%"}}
                    transition={{duration: 0.7}}
                    className='lg:hidden h-screen bg-gray-800 text-white absolute w-[100%] top-[3.9rem] right-0'
                >
                    <div className='mt-[4rem] mx-2'>
                        <NavBarLi/>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default NavBar