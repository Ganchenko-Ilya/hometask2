import { app } from './app';
import { SETTINGS } from './settings';
import { run } from './db/db';

const PORT = SETTINGS.PORT;

const startApp = async () => {
  const result = await run();

  if (result) {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } else {
    process.exit(1);
  }
};

startApp();
