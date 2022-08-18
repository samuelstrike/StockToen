#Start from the pre-existing official Node image
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
#"/usr/local/bin/" is what Heroku takes as the "root" folder. Files MUST be added here or they cannot be found!
WORKDIR /usr/local/bin/web
#Copies the app's source code into the image's filesystem
COPY . /usr/local/bin/web/
# RUN npm config rm proxy
# RUN npm config rm https-proxy
#Installs packages for Express framework. Runs in container root directory.
RUN npm install
#Installs packages for React app
# RUN npm install --prefix client
#Builds React app
# RUN npm run --prefix client build
RUN npm run build
#Runs the app when container launches. Same as running in console
CMD ["npm", "start"]