# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache python3 make g++

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application code and build the Angular app
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the Angular app using a lightweight server
FROM nginx:alpine

# Enable gzip for faster asset delivery
RUN echo "gzip on;" >> /etc/nginx/nginx.conf

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
