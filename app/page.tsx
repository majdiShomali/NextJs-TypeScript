
import ContextTest from "@/components/test/ContextTest";
import ReduxTest from "@/components/test/ReduxTest";
import { cookies } from 'next/headers'
import { COOKIE_NAME } from "@/constants";
export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)
  const TokenValue:string | undefined = token?.value
  return (
    <main>
     <ContextTest/>
     <ReduxTest token={TokenValue}/>
    </main>
  );
}