"use client"
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation"; 
import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams(); 
  const promptCreatorId = searchParams.get('id'); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (promptCreatorId && session?.user?.id) {
          const response = await fetch(`/api/users/${promptCreatorId}/posts`);
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, [promptCreatorId, session]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {posts.length > 0 && (
        <Profile
          name={posts[0].creator.username}
          desc="Welcome to your personalized profile"
          data={posts}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      )}
    </Suspense>
  );
};

export default ProfilePage;
