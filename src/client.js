const myDB = async () =>
  Array.from({ length: 1000 }, (_, i) => {
    return `${i}-laptop`;
  });

const PRODUCTS_API = `http://localhost:3000/products`;
const CART_API = `http://localhost:4000/cart`;

async function* processDBDataGen() {
  const products = await myDB();

  for (const product of products) {
    const productInfo = await fetch(`${PRODUCTS_API}?name=${product}`).then(
      (data) => data.text()
    );
    const cartInfo = await fetch(`${CART_API}`, {
      method: 'POST',
      body: productInfo,
    }).then((data) => data.text());

    yield cartInfo;
  }
}

for await (const item of processDBDataGen()) {
  console.log(item);
}
