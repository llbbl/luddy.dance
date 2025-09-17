# Use the official Node.js 22 image with Debian Slim as the base
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy pnpm-lock.yaml and package.json to the working directory
COPY pnpm-lock.yaml package.json ./

# Install the application dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire application code to the working directory
COPY . .

# Build the Next.js application using pnpm
RUN pnpm run build

# Expose the port on which the application will run (default for Next.js is 3000)
EXPOSE 3000

# Define the command to start the application using pnpm
CMD ["pnpm", "start"]
