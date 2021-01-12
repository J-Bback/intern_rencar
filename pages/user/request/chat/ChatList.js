import React from 'react';
import ChatItem from './ChatItem';
import styles from './ChatContainer.scss';

const ChatList = ({ messageList, user }) => {
  const chatLists =
    messageList &&
    messageList.map((chat) => {
      return (
        <>
          <ChatItem
            name={chat.name}
            message={chat.text}
            date={chat.created_at}
            user={user}
          />
        </>
      );
    });
  return <div className={styles.chat_list}>{chatLists}</div>;
};

export default ChatList;
