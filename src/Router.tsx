import { Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Feed from './views/feed/Feed';
import Profile from './views/profile/Profile';
import Registration from './views/registration/Registration';
import NewPost from './views/newPost/NewPost';
import OnePost from './views/onePost/OnePost';

const Router = () => {

  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
        <Routes>
          {
            currentUser ? 
            <>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<NewPost />} />
              <Route path="/posts/:id" element={<OnePost />} />
            </>
            :
            <>
              <Route path="/*" element={<Registration />} />
            </>
          }
        </Routes>
  )
}

export default Router