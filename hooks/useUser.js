import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-absolute-path
import { onAuthStateChanged } from "/firebase/client";

export default function useUser() {
  const [user, setUser] = useState(null);

  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  // useEffect(() => {
  //   user === null && router.push('/')
  // }, [user])

  return user;
}
