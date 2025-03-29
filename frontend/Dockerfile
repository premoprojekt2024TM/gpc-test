# Build stage
FROM node:lts AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage (this just prepares the build artifacts)
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from build stage
COPY --from=build /app/dist /app/dist

# Install serve to serve the built assets
RUN npm install -g serve

# Expose the port (we'll use port 5000 for serving the app)
EXPOSE 3000

# Start the app using serve to serve the static files from /app/dist
CMD ["serve", "-s", "dist", "-l", "3000"]
