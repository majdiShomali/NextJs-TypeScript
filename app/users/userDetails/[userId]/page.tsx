import React from 'react'
import UserCard from '@/components/UserCard'
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUser(userId:string){
  const topicResponce =await fetch(`${NEXT_PUBLIC_API_URL}/api/users/${userId}`,{ next: {
    revalidate: 20, //ISR===== ssr with sec
  },})
  return topicResponce.json();
}

interface UserDetailsProps {
  params: {
    userId: string;
  };
}
const UserDetails: React.FC<UserDetailsProps>  = async ({params}) => {
  const {user} = await getUser(params.userId)

  return (
    <div className="w-full flex flex-wrap justify-center">
    <UserCard users={[user]} />
</div>
  )
}

export default UserDetails