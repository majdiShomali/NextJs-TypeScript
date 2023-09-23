import UserCard from "@/components/UserCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers'
import { COOKIE_NAME } from "@/constants";
const getUsers = async (token:string | undefined) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // next: {
        //   revalidate: 20, //ISR===== ssr with sec
        // },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };
  
const UsersPage = async() => {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)
    const data= await getUsers(token?.value) || [];
    return (
      <>
        <div className="flex flex-wrap justify-center gap-5 my-5">
          <UserCard users={data?.users} />
        </div>

      </>
    );
}

export default UsersPage