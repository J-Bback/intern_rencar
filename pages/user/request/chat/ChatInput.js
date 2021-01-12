import React from 'react';
import styles from './ChatContainer.scss';

const ChatInput = ({ onChange, onClick, value }) => {
  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Text Message'
        className={styles.user_input}
        onChange={onChange}
        value={value}
      />
      <input
        type='button'
        value='SEND'
        className={styles.send_button}
        onClick={onClick}
      />
    </div>
  );
};

export default ChatInput;
