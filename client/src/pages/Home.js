import React from 'react';
import About from '../components/About';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_COMMENTS, QUERY_ME_BASIC } from '../utils/queries';

import BorderWrapper from "react-border-wrapper";

// import bottomElement from "../components/Elements";


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
        <CommentForm />
      </div>
    )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {loggedIn ? (
                <CommentList comments = {comments} title = "See What's Happening in Our Organization" />
              ): 
              <BorderWrapper
              borderColour="#b66d35"
              borderWidth="5px"
              borderRadius="15px"
              borderType="solid"
              innerPadding="30px"
              // bottomElement={bottomElement}
              topPosition={0.05}
              topOffset="22px"
              topGap="4px"
              // rightElement={rightElement}
              rightPosition={0.1}
              rightOffset="22px"
              rightGap="4px"
              >
                <About/>
              </BorderWrapper>
              } 
              
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