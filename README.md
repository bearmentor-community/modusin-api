# Modusin API Data (Backend)

--------------------------------------------------------------------------------

## Development

Install and run MongoDB service

```sh
sudo service mongodb start
```

Install dependencies

```sh
npm install
```

Run development server

```sh
npm run dev
```

--------------------------------------------------------------------------------

## Testing

### Create a new user

```
POST /users
{
  "email": "me@mhaidarhanif.com",
  "password": "sangatrahasiasekali"
}
```
