# 🐛 Troubleshooting Guide

Common issues and solutions for the Weather App.

## ❌ Common Issues

### 1. "API Key Not Working" Error

**Symptoms:**
- App shows "No weather data available"
- Console shows API errors
- Network tab shows 401/403 errors

**Solutions:**
```bash
# Check if .env file exists and has the right format
cat .env

# Should show:
# VITE_WEATHER_API_KEY=your_actual_key_here
# VITE_API_BASE_URL=http://api.weatherstack.com
# VITE_APP_ENV=development
```

**Fix:**
1. Get a valid API key from [Weatherstack](https://weatherstack.com/)
2. Make sure the key is in the `.env` file (not `.env.local` or other files)
3. Restart the development server after changing `.env`
4. Check if you have the right plan for the features you're using

### 2. "Module Not Found" Errors

**Symptoms:**
- `Module not found: Can't resolve...`
- Build fails with import errors

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock
yarn install
```

### 3. Port Already in Use

**Symptoms:**
- `Port 5173 is already in use`
- Development server won't start

**Solutions:**
```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### 4. Tests Failing

**Symptoms:**
- `npm run test:run` shows failures
- CI/CD pipeline fails

**Solutions:**
```bash
# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Check if API key is set for integration tests
echo $VITE_WEATHER_API_KEY

# Run linting to check for code issues
npm run lint
```

### 5. Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript compilation errors

**Solutions:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint

# Check for missing dependencies
npm ls
```

### 6. CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- API calls fail in browser

**Solutions:**
- Weatherstack API should work without CORS issues
- If using a different API, you may need a proxy
- Check if you're using HTTPS vs HTTP correctly

## 🔍 Debugging Steps

### 1. Check Environment Variables

```bash
# Verify .env file exists and has correct content
cat .env

# Check if variables are loaded (in browser console)
console.log(import.meta.env.VITE_WEATHER_API_KEY)
```

### 2. Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for failed API requests
5. Check request headers and response

### 3. Check Console Errors

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check for JavaScript errors

### 4. Verify API Key

```bash
# Test API key directly
curl "http://api.weatherstack.com/current?access_key=YOUR_KEY&query=London"
```

## 🛠️ Development Tools

### Useful Commands

```bash
# Start with different environment
npm run dev:staging

# Build for different environments
npm run build:staging
npm run build:production

# Run tests in watch mode
npm run test

# Check code quality
npm run lint

# Preview production build
npm run preview
```

### Environment-Specific Issues

**Development:**
- Uses `http://api.weatherstack.com`
- More verbose logging
- Hot reload enabled

**Staging/Production:**
- May use different API endpoints
- Optimized builds
- Different error handling

## 📞 Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Run `npm run test:run` and `npm run lint`
3. ✅ Check browser console for errors
4. ✅ Verify your API key is correct
5. ✅ Try restarting the development server

### When Reporting Issues

Include:
- Operating system and Node.js version
- Error messages from console
- Steps to reproduce the issue
- Screenshots if applicable

### Useful Resources

- [Weatherstack API Documentation](https://weatherstack.com/documentation)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Still having issues? Check the main README.md for more detailed information.** 🔧
