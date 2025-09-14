#!/bin/bash

# Weather App Setup Script
# This script helps new developers get the weather app running quickly

echo "🌤️  Weather App Setup Script"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    echo "   Using Yarn..."
    yarn install
else
    echo "   Using npm..."
    npm install
fi

echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "🔑 Creating .env file..."
    cat > .env << EOL
# Weather API Configuration
VITE_WEATHER_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://api.weatherstack.com
VITE_APP_ENV=development
EOL
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your Weatherstack API key to the .env file"
    echo "   1. Get a free API key from: https://weatherstack.com/"
    echo "   2. Replace 'your_api_key_here' in the .env file with your actual API key"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Run tests to verify setup
echo "🧪 Running tests to verify setup..."
if command -v yarn &> /dev/null; then
    yarn test:run
else
    npm run test:run
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Weatherstack API key to the .env file"
echo "2. Run 'npm run dev' or 'yarn dev' to start the development server"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more information, see the README.md file"
