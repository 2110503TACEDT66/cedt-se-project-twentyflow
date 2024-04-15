export default async function GetpriceId(
  name: string,
  price_hourly: number,
  startTime: string,
  endTime: string,
  token: string
) {
  //get all products and prices to make list
  const urlGet = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment`;
  try {
    const resGet = await fetch(urlGet, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const bodyGet = await resGet.json();
    if (bodyGet.success) {
      const products = bodyGet.products;
      const prices = bodyGet.prices;

      //filter product by name and duration
      const duration: number = Math.ceil(
        (new Date(endTime).getTime() - new Date(startTime).getTime()) /
          (1000 * 60 * 60)
      );

      var foundProduct = false;
      var productId = "";
      for (let i = 0; i < products.data.length; i++) {
        if (
          products.data[i].name === name &&
          products.data[i].description === String(duration)
        ) {
          foundProduct = true;
          productId = products.data[i].id;
          break;
        }
      }

      if (foundProduct) {
        for (let i = 0; i < prices.data.length; i++) {
          if (productId === prices.data[i].product) return prices.data[i].id;
        }
      }

      //create new product
      const urlCreate = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment`;
      const resCreate = await fetch(urlCreate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: String(duration),
          amount: String(price_hourly * duration * 100),
        }),
      });
      const bodyCreate = await resCreate.json();
      return bodyCreate.price.id;
    }
  } catch (err) {
    console.log("Get wrong when fetch products");
    return null;
  }
}
