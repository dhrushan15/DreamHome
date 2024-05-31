# Use the official Node.js 14 image as base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 3000

# Default command to start nginx
CMD ["npm","start"] 
 