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

# Expose the port for the app (we can still expose a port, but it won't be used by Caddy inside the container)
EXPOSE 3000

# Start the application with a basic node command if needed
CMD ["npm", "run", "start"]
