import React, { useState } from 'react'
import { getUsers } from '../../service/usersService';
import { useDispatch } from 'react-redux';

import s from './signIn.module.scss'
import { User } from '../../shared/types';
import { login } from '../../store/slices/user';

const SignIn: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

 
    const signInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password) {
          try {
            const users: User[] = await getUsers().then(users => users);
            const user: User | undefined = users.find(
                (user) => user.email === email && user.password === password
            );
            if(user) {
                dispatch(login(user))
                setEmail('')
                setPassword('');
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      
    return (
        <div className={s.gradientFormContainer}>
            <form className={s.gradientForm} onSubmit={signInSubmit}>
                <input className={s.gradientFormInput} placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
                <input className={s.gradientFormInput} placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                <button className={s.gradientFormButton} type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default SignIn