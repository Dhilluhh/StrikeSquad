# Stage 1: Build Request Client
FROM node:20-alpine as client-build
WORKDIR /app/client

# Install Client Dependencies
COPY client/package*.json ./
RUN npm install

# Copy Client Source and Build
# We set VITE_API_URL to empty string so it uses relative paths (same origin)
COPY client/ ./
RUN VITE_API_URL="" npm run build

# Stage 2: Setup Express Server
FROM node:20-alpine
WORKDIR /app

# Install Server Dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --production

# Copy Server Source
COPY server/ ./

# Copy Built Client from Stage 1 to 'public' folder in Server
COPY --from=client-build /app/client/dist ./public

# Environment Configuration
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start the Server
CMD ["node", "index.js"]
