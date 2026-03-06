# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## MongoDB Configuration

This project’s backend uses Mongoose for database interactions. The connection string is read from
`backend/.env` via the `MONGODB_URI` variable. By default, the template points at a local Compass
database:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/smartsurplus
```

To switch over to **MongoDB Atlas**:

1. Create a free Atlas account at https://cloud.mongodb.com/ and spin up a cluster.
2. In the Atlas dashboard, go to **Database > Connect** and choose "Connect your application".
3. Copy the provided connection string and replace the placeholder values (`<username>`,
   `<password>`, and `<dbname>`) with your credentials.
4. Update `backend/.env` with the new URI, for example:
   ```dotenv
   MONGODB_URI="mongodb+srv://myuser:mysecret@cluster0.abcd.mongodb.net/smartsurplus?retryWrites=true&w=majority"
   ```
5. Make sure your IP address (or `0.0.0.0/0` for development) is whitelisted under **Network
   Access** in the Atlas dashboard.
6. Restart the backend server (`npm run dev` from the `backend` folder). It will automatically pick
   up the new connection string.
### Inventory API

The backend now exposes a simple inventory interface under `/api/inventory`.

- `GET /api/inventory` – list all items (used by the admin dashboard).
- `POST /api/inventory` – add a new item. JSON body must include `name`,
  `quantity` and `expiry` (ISO date). The request will also generate a log entry
  containing the inventory details.

The admin page (`/admin`) includes a form for recording available quantity and
expiry dates; submissions are persisted to Atlas and appear in both the
inventory table and the activity log.
With the environment variable configured, the existing `server.js` connection logic works
the same and no code changes are required other than pointing at Atlas.

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
