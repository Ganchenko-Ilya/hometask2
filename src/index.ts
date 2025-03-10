import { app } from './app';
import { SETTINGS } from './settings';

const PORT = SETTINGS.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
