export default async function PaymentSession(
  reservationId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/session`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        appointmentId: reservationId,
      }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    return null;
  }
}
