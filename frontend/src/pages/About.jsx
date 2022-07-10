import { React, useEffect, useState } from "react";
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";

const About = () => {
  const { user, token } = useAuth();
  const { get } = todoApi();

  return (
    <div>
      <h3>About</h3>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p>
    </div>
  );
};

export default About;
