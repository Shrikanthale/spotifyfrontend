# Spotify Frontend

A modern web application built with React, TypeScript, and Vite that provides a beautiful and responsive user interface for interacting with Spotify's features.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Shrikanthale/spotifyfrontend.git
cd spotyfyfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Spotify API credentials:
```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- React Router DOM
- Axios
- ESLint

## Project Structure

```
spotyfyfrontend/
├── src/              # Source files
├── public/           # Static assets
├── index.html        # Entry HTML file
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies and scripts
```

## Development

The project uses ESLint for code quality and TypeScript for type safety. The development server includes:
- Hot Module Replacement (HMR)
- Fast Refresh
- TypeScript compilation
- ESLint integration

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
