import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styles from './Button.module.css'; // Import css modules stylesheet as styles



const Button = ({children,link}) => {
  const theme = useSelector((state)=>state.theme.value)
    console.log({children,link});
  return (
    <div className={`${styles.primaryButton} ${theme?.value ?? ""}`}>
        <Link to={link}>{children}</Link>
    </div>
  )
}

export default Button