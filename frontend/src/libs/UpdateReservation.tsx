import { start } from "repl";

export default async function UpdateReservation(
  token: string,
  appId: string,
  additional : string
) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${appId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      additional
    }),
  });
  const body = await response.json();
  return body;
}
