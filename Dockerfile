# Use the official Node.js image as base
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .
COPY .env .env

# Ensure the database client for Sequelize is installed
RUN npm install pg pg-hstore

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=2000

# Expose the port
EXPOSE 2000

# Run migrations before starting the app
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node dist/server.js"]