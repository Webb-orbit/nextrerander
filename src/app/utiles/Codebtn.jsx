import React from 'react'
import { motion } from 'framer-motion'

const Codebtn = ({ children, hovered, control}) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={` mx-2 `}
            onClick={control}>
            {children}
        </motion.button>
    )
}

export default Codebtn