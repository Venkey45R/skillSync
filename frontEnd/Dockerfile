# --- Stage 1: Build the React application ---
# Use a Node.js base image for building
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
# This leverages Docker cache if dependencies haven't changed
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of your frontend application code
COPY . .

# Build the React application for production
# Assumes your package.json has a "build" script (e.g., "vite build")
RUN npm run build

# --- Stage 2: Serve the static files with Nginx ---
# Use a lightweight Nginx image for serving
FROM nginx:alpine

# Copy the built React app from the builder stage
# The 'dist' folder is the default output for Vite builds
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]