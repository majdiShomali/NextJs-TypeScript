import AddUserForm from "@/components/AddUserForm";
import UserCard from "@/components/UserCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUsers = async () => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/users`, {
      // cache:"force-cache",//SSG getStaticSideProps
      cache: "no-store", //SSR getServerSideProps
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

export default async function Home() {
  const { users } = await getUsers();
  return (
    <>
      <AddUserForm />
      <div className="flex flex-wrap justify-center gap-5 my-5">
        <UserCard users={users} />
      </div>
    </>
  );
}
