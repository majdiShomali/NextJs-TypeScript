"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const payload = {
  //     userEmail: event.currentTarget.userEmail.value,
  //     userPassword: event.currentTarget.userPassword.value,
  //   };

  //   try {
  //     const { data } = await axios.post("/api/auth/login", payload);

  //     alert(JSON.stringify(data));

  //     // redirect the user to /dashboard
  //     push("/dashboard");
  //   } catch (e) {
  //     const error = e as AxiosError;

  //     alert(error.message);
  //   }
  // };

  return (
    <main>
      <h1>Nextjs authentication JWT verify http cookie only</h1>

      <form 
      // onSubmit={handleSubmit} 
      className="flex flex-col gap-4">
        <div>
          <label htmlFor="userEmail">userEmail:</label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            required
            className="border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="userPassword">userPassword:</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            required
            className="border rounded border-black"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}