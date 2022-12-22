# Stage 1
FROM node:18.10.0-bullseye-slim

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --omit=dev

# Bundle app source
COPY --chown=node:node . .

# Set the user
USER node

EXPOSE ${NODE_PORT}

# Start the web server.
CMD ["npm", "start"]
