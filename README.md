# 🌤️ Weather App

A modern, interactive weather application built with React, TypeScript, and Vite. Features real-time weather data, 3-day forecasts, historical weather, and dynamic backgrounds.

## ✨ Features

- **Current Weather** - Real-time weather data with detailed information
- **3-Day Forecast** - Interactive forecast with clickable day tiles
- **3-Day History** - Historical weather data for the past 3 days
- **Dynamic Backgrounds** - Background images change based on weather conditions
- **Interactive Selection** - Click any day to view detailed weather information
- **Responsive Design** - Works on desktop and mobile devices
- **Weather Icons** - Dynamic weather icons based on conditions
- **Detailed Metrics** - Wind, pressure, humidity, cloud cover, visibility, sunrise/sunset

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Weather API Key** (see API Setup below)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd weather-app
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. API Setup

This app uses the Weatherstack API. You'll need to:

1. **Get a free API key** from [Weatherstack](https://weatherstack.com/)
2. **Create environment file**:

```bash
# Create .env file in the root directory
touch .env
```

3. **Add your API key** to `.env`:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://api.weatherstack.com
VITE_APP_ENV=development
```

### 4. Run the Application

```bash
# Development mode
npm run dev

# Or using yarn
yarn dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:staging` | Start with staging environment |
| `npm run build` | Build for production |
| `npm run build:staging` | Build for staging |
| `npm run build:production` | Build for production environment |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Run ESLint |

## 🧪 Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm run test

# Run linting
npm run lint
```

**Test Coverage:**
- ✅ API integration tests
- ✅ Error handling scenarios
- ✅ Timeout handling
- ✅ Data validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   └── weather-component.tsx
├── services/           # API services and utilities
│   ├── apiService.ts   # HTTP request wrapper
│   └── weatherService.ts # Weather API integration
├── styles/             # SCSS stylesheets
│   ├── components/     # Component-specific styles
│   ├── globals/        # Global styles and variables
│   └── animations/     # CSS animations
├── __tests__/          # Unit tests
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_WEATHER_API_KEY` | Weatherstack API key | Required |
| `VITE_API_BASE_URL` | API base URL | `http://api.weatherstack.com` |
| `VITE_APP_ENV` | Application environment | `development` |

### API Plans

- **Free Tier**: Current weather only
- **Standard Plan** ($4.99/month): + Historical data
- **Professional Plan** ($9.99/month): + Forecast data

## 🎨 Customization

### Changing Location

Edit the location in `src/pages/weather-component.tsx`:

```typescript
const location = 'Your City, State, Country';
```

### Adding New Weather Icons

1. Add icon classes to `getWeatherIcon()` function
2. Update the weather code mapping
3. Add corresponding CSS styles

### Styling

The app uses SCSS with a modular structure:
- `_variables.scss` - Color schemes and variables
- `_weather-wrapper.scss` - Main component styles
- `_animations.scss` - CSS animations

## 🚀 Deployment

### Build for Production

```bash
npm run build:production
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 🐛 Troubleshooting

### Common Issues

**1. API Key Not Working**
- Verify your API key is correct
- Check if you have the right plan for the features you're using
- Ensure the API key is in the `.env` file

**2. CORS Errors**
- Weatherstack API should work without CORS issues
- If using a different API, you may need a proxy

**3. Build Errors**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed
- Check TypeScript errors with `npx tsc --noEmit`

**4. Tests Failing**
- Make sure all dependencies are installed
- Check if API key is set for integration tests
- Run `npm run test:run` to see detailed error messages

### Getting Help

1. Check the console for error messages
2. Run `npm run lint` to identify code issues
3. Check the browser's Network tab for API errors
4. Review the test output for specific failures

## 📝 Development Notes

- The app uses React 19 with TypeScript
- Styling is done with SCSS modules
- State management uses React hooks
- API calls are wrapped with timeout handling
- All components are fully typed
- Tests use Vitest and React Testing Library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:run`
5. Run linting: `npm run lint`
6. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Happy coding! 🌤️**