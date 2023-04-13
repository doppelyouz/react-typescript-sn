import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { Link } from 'react-router-dom';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

import s from './topbar.module.scss'

const Topbar: React.FC = () => {

  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <div className={s.topbar}>
      <div className={s.topbar__logo}>doppelyouz</div>
      <ul className={s.topbar__menu}>
        {
          currentUser ?
            <>
              <li><Link to="/" className={s.topbar__menuItem}><HomeIcon /> Home</Link></li>
              <li><Link to="/create" className={s.topbar__menuItem}><AddCircleOutlineIcon /> New Post</Link></li>
              <li><Link to="/profile"><div className={s.topbar__image + ' ' + s.topbar__menuItem}><img src={currentUser.image} alt='avatar'/> {currentUser.username}</div></Link></li>
            </> 
            :
            <>
              <li><Link to="/*" className={s.topbar__menuItem}><LoginIcon /> Register</Link></li>
            </>
        }
      </ul>
    </div>
  )
}

export default Topbar