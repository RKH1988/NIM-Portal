import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMMENTS, QUERY_ME_BASIC } from '../utils/queries';
import CommentList from '../components/CommentList';
import FriendList from '../components/FriendList';
import About from '../components/About';
import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_COMMENTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const comments = data?.comments || [];
  console.log(comments);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
        <div className="col-12 mb-3">
        <ThoughtForm />
      </div>
    )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {loggedIn ? (
                <CommentList comments = { comments } title = "See What's Happening in Our Organization" />
              ): <About/>}
            </div>
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};
export default Home;