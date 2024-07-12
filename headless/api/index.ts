import main from '../src/server.js';

main().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
