import { app } from './app';
import { run } from './db/db';
import { SETTINGS } from './settings';

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
