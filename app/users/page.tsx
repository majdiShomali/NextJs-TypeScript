import AddUserForm from "@/components/AddUserForm";
import UserCard from "@/components/UserCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(`${NEXT_PUBLIC_API_URL}/api/users`)
const getUsers = async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, {
        next: {
          revalidate: 20, //ISR===== ssr with sec
        },
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
    const { users } = await getUsers();
    console.log(users)
    return (
      <>
        <AddUserForm />
        <div className="flex flex-wrap justify-center gap-5 my-5">
          <UserCard users={users} />
        </div>
      </>
    );
}

export default UsersPage