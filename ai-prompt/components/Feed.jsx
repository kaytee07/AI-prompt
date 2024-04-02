"use client"
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { data } from "autoprefixer";


const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length && data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [post, setPost] = useState([]);
  

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setPost(filterPrompts(e.target.value));
  }

  const filterPrompts = (searchText) => {
    let regex = new RegExp(searchText, "i");

    return allPost.filter((prompt) => {
      return regex.test(prompt.creator.username) || 
      regex.test(prompt.tag) || regex.test(prompt.prompt)
    })
  }

  const handleTag = (tag) => {
    setSearchText(tag)
    setPost(filterPrompts(tag));
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {
        cache: "no-store"
      });
      const data = await response.json();
      console.log(data)
      setAllPost(data);
      setPost(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList
        data={post}
        handleTagClick={handleTag}
      />
    
    </section>
  )
}

export default Feed
