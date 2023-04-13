import React from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SignIn from '../../components/signIn/SignIn';
import SignUp from '../../components/signUp/SignUp';


import 'react-tabs/style/react-tabs.css';
import s from './registration.module.scss'


const Registration: React.FC = () => {

    return (
        <div className={s.registration}>
            <Tabs className={s.registration__tabs}>
                <TabList className={s.registration__tabList}>
                    <Tab className={s.registration__tab}>Sign In</Tab>
                    <Tab className={s.registration__tab}>Sign Up</Tab>
                </TabList>
                <TabPanel>
                    <SignIn/>
                </TabPanel>
                <TabPanel>
                    <SignUp />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Registration