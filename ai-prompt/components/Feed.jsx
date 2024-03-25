"use client"
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layour">
      {data.map((post) => {
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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
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
        handleTagClick={()=> {}}
      />
    
    </section>
  )
}

export default Feed
