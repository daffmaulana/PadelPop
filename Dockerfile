# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose both HTTP and HTTPS ports
EXPOSE 3000
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]