import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { parse } from 'node:url';

const PORT = 3000;
async function handler(req, res) {
  if (req.method === 'GET' && req.url.includes('products')) {
    const {
      query: { name },
    } = parse(req.url, true);
    const item = {
      id: randomUUID(),
      product: name,
    };
    return res.end(JSON.stringify(item));
  }
  return res.end('Hello World');
}

createServer(handler)
  .listen(PORT)
  .on('listening', () =>
    console.log(`Product API is running on http://localhost:${PORT}`)
  );
