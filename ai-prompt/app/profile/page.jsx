"use client"
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";


const profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const promptCreatorId = searchParams.get('id');
  

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${promptCreatorId}/posts`);
      const data = await response.json();
      setPosts(data)
    }

    if(session?.user.id){
      fetchPost();
    };
  }, [session])


  return (
     <>
    <Suspense  fallback={<>Loading...</>} >
    {posts.length && <Profile
      name={posts[0].creator.username}
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={()=> {}}
      handleDelete={()=> {}}
    />}
    </Suspense>
   </>
  )
}

export default profile;
