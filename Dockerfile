# Use the official Node.js image as the base image
FROM node:14

# Use Enviroment Variables
ENV REACT_APP_BACKEND_URL=https://spontivly-be.devcrew.io \
    MONGO_DOCKER_PATH=mongodb://admin:password@mongodb

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install project dependencies with the legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the React application (if necessary)
# RUN npm run build

# Expose the port on which the application will run
# Replace 3000 with your app's port if necessary
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
