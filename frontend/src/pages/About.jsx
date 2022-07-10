import { React, useEffect, useState } from "react";
import { useAuth } from "../providers/auth";


const About = () => {
  const { user } = useAuth();

  return (
    <div>
      <h3>About</h3>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
    </div>
  );
};

export default About;
