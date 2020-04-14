import { useEffect, useState } from 'react';
import { auth } from '../../store/firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      // set up listener to auth object
      auth.onAuthStateChanged((user) => {
        if (user) {
          // SET USER data to the state
          setUser(user);
        } else {
          console.log('USER_HAS_LOGED_OUT');
          setUser(null);
        }
      }),
    []
  );

  return { user, isLogin: !!user };
};

export default useAuth;
