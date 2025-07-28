# Use a Node.js base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]