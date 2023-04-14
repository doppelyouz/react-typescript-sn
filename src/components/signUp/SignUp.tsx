import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../service/usersService';

import s from './signUp.module.scss'
import { User } from '../../shared/types';

const SignUp: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = React.useState('');

    const {mutate: create} = useMutation({
        mutationFn: createUser
    })

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    
    const signUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: User = {
            email,
            password,
            username,
            posts: [],
            image: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
        }
        create(user)

        setEmail('')
        setPassword('')
        setUsername('')
    };

    return (
        <div className={s.gradientFormContainer}>
            <form className={s.gradientForm} onSubmit={signUpSubmit}>
                <input
                    className={s.gradientFormInput}
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    className={s.gradientFormInput}
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className={s.gradientFormInput}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button className={s.gradientFormButton} type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default SignUp