# 🚀 Quick Start Guide

Get the Weather App running in 5 minutes!

## Option 1: Automated Setup (Recommended)

```bash
# 1. Clone the repository
git clone <repository-url>
cd weather-app

# 2. Run the setup script
./setup.sh

# 3. Add your API key to .env file
# Edit .env and replace 'your_api_key_here' with your actual API key

# 4. Start the app
npm run dev
```

## Option 2: Manual Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd weather-app
npm install

# 2. Create environment file
cp env.template .env

# 3. Edit .env file
# Replace 'your_api_key_here' with your Weatherstack API key

# 4. Start development server
npm run dev
```

## 🔑 Getting Your API Key

1. Go to [Weatherstack.com](https://weatherstack.com/)
2. Sign up for a free account
3. Copy your API key
4. Paste it in the `.env` file

## ✅ Verify Setup

```bash
# Run tests to make sure everything works
npm run test:run

# Check for any code issues
npm run lint
```

## 🌐 Access the App

Open your browser and go to: `http://localhost:5173`

## 🆘 Need Help?

- Check the full [README.md](./README.md) for detailed instructions
- Look at the console for error messages
- Ensure your API key is correct in the `.env` file

---

**That's it! You should now have the Weather App running locally.** 🌤️
