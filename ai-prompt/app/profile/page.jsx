"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });
        console.log(post)
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
        console.log(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      console.log(session?.user.id)
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data)
    }

    if(session?.user.id){
      console.log(true);
      fetchPost()
    };
  }, [session])

  return (
     <>
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
   </>
  )
}

export default MyProfile;
