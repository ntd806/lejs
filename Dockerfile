FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY app/package.json app/package-lock.json . 

# Install dependencies using npm ci for a clean and optimized install
RUN npm ci 

# Copy the rest of the application
COPY app .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]