# --- Stage 1: Build the React application ---
FROM node:22-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy all project files first, including package.json and node_modules (if present locally)
# This ensures everything is in place before npm install
COPY . .

# Clean npm cache and node_modules to ensure a fresh install
RUN rm -rf node_modules
RUN npm cache clean --force

# Install dependencies - npm ci is preferred for CI/CD
RUN npm ci

# Build the React application for production
# This command assumes your package.json has a "build" script (e.g., "vite build")
RUN npm run build

# --- Stage 2: Serve the static files with Nginx ---
FROM nginx:alpine

# Copy the built React app from the builder stage
# The 'dist' folder is the default output for Vite builds
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]