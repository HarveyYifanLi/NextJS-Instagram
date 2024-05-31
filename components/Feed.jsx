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
    // fetch posts from database, if no posts exist, then fetch random posts from the Lorem Ipsum for photos site at https://picsum.photos/
    let response = await fetch("/api/prompt");
    let data = await response.json();

    if (data.length === 0) {
      // fetch random posts from the Lorem Ipsum for photos
      response = await fetch("/api/prompt/random");
      data = await response.json();
    }

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