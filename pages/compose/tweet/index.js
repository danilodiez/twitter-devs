import Button from "components/Button/Button";
import { useState } from "react";
import styles from "./ComposeTweet.module.css";
import useUser from "hooks/useUser";
/* eslint-disable import/no-absolute-path */
import { addTweet } from "/firebase/client";
import { useRouter } from "next/router";

const COMPOSE_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  USER_NOT_KNOWN: "user_not_known",
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  // const [task, setTask] = useState(null)
  // const [imgURL, setImgURL] = useState(null)

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

  // useEffect(() => {
  //   if (task) {
  //     // let onProgress = () => { }
  //     // let onError = () => { }
  //     // let onComplete = () => {
  //       console.log("onComplete")
  //     }
  //     task.on("state_changed",
  //       onProgress,
  //       onError,
  //       onComplete)
  //   }
  // }, [task])
  const handleDragEnter = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    // const file = await event.dataTransfer.files[0]
    // const task = uploadImage(file)

    // setTask(task)
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        style={{
          border:
            drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "2px dashed #09f"
              : "2px solid transparent",
        }}
        onChange={handleChange}
        placeholder="Que estas pensando?"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      ></textarea>
      <Button disabled={isButtonDisabled}> Twittear </Button>
    </form>
  );
}
