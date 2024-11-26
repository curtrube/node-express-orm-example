import { bootstrap } from './app.js';

try {
  await bootstrap();
  console.log('server started');
} catch (e) {
  console.error(e);
}
