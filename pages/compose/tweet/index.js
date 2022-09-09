import Button from "components/Button/Button";
import { useState } from "react";
import styles from "./ComposeTweet.module.css";
import useUser from "hooks/useUser";
// eslint-disable-next-line import/no-absolute-path
import { addTweet } from "/firebase/client";
import { useRouter } from "next/router";

const COMPOSE_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  USER_NOT_KNOWN: "user_not_known",
};
export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        className={styles.textarea}
        placeholder="Que estas pensando?"
      ></textarea>
      <Button disabled={isButtonDisabled}> Twittear </Button>
    </form>
  );
}
