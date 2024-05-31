"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  return (
    <div className='mt-2 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPrompts, setAllPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <section className='feed'>
      <PromptCardList data={allPrompts} />
    </section>
  );
};

export default Feed;