import Button from "components/Button/Button";
import { useState } from "react";
import styles from "./ComposeTweet.module.css";
import useUser from "hooks/useUser";
// eslint-disable-next-line import/no-absolute-path
import { addTweet } from "/firebase/client";
export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        className={styles.textarea}
        placeholder="Que estas pensando?"
      ></textarea>
      <Button disabled={message.length === 0}> Twittear </Button>
    </form>
  );
}
