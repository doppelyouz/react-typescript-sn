import { Routes, Route} from 'react-router-dom';
import Registration from './views/registration/Registration';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const Router = () => {

  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
        <Routes>
          {
            currentUser ? 
            <>
              <Route path="/" element={<Registration />} />
              <Route path="/profile" element={<Registration />} />
              <Route path="/create" element={<Registration />} />
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