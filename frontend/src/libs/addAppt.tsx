export default async function addAppt(
  startTime: string,
  endTime: string,
  user: string,
  cid: string,
  token: string,
  priceId: string,
  room: string,
  Date : Date

) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings/${cid}/appointments`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      startTime,
      endTime,
      user: user,
      room  ,
      Date ,
      priceId: priceId,
    }),
  });
  const body = await response.json();
  return body;
}
