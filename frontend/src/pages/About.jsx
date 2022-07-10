import { React, useEffect, useState } from "react";
import { useAuth } from "../providers/auth";


const About = () => {
  const { user, token } = useAuth();

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
