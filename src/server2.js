import { createServer } from 'node:http';
import { once } from 'node:events';

const PORT = 4000;
async function handler(req, res) {
  if (req.method === 'POST' && req.url.includes('cart')) {
    const data = await once(req, 'data');

    const item = JSON.parse(data);
    console.log('received item:', item);

    return res.end(`Process succeeded for item: ${item.id}`);
  }
  return res.end('Hello World');
}

createServer(handler)
  .listen(PORT)
  .on('listening', () =>
    console.log(`Cart API is running on http://localhost:${PORT}`)
  );
