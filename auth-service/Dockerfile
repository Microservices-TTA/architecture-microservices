# Use the official Node.js image as the base image
FROM node:23

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run prisma:generate

# Build the TypeScript code
RUN npm run build


# Expose the port the app runs on
EXPOSE 3003

# Command to run the application
CMD ["sh", "-c", "sleep 5 && npx prisma migrate deploy && npm run start"]