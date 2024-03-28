import Profiles from "./Profile";
import { Suspense } from "react";


const ProfilePage = () => {
  return (
    <Suspense>
      <Profiles/>
    </Suspense>
  )
}

export default ProfilePage
