import React from 'react';
import styles from './ChatContainer.scss';

const ChatItem = ({ message, name, date, user }) => {
  if (name === user) {
    return (
      <div className={styles.chat_item_supplier}>
        <div className={styles.name_container}>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={styles.message_container}>
          <span className={styles.date}>{date.split(' ')[1]}</span>
          <span className={styles.message}>{message}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.chat_item_client}>
        <div className={styles.name_container}>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={styles.message_container}>
          <span className={styles.message}>{message}</span>
          <span className={styles.date}>{date.split(' ')[1]}</span>
        </div>
      </div>
    );
  }
};

export default ChatItem;

// return (
//   <div
//     className={
//       name === user ? styles.chatItem_supplier : styles.chatItem_client
//     }>
//     <div className={styles.nameContainer}>
//       <div className={styles.name}>{name}</div>
//     </div>
//     <div className={styles.messageContainer}>
//       <span className={styles.date}>{date.split(' ')[1]}</span>
//       <span className={styles.message}>{message}</span>
//     </div>
//   </div>
// );
