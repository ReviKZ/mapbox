#Base Image
FROM node:18.17.1-alpine3.18

#Create & Use /app
WORKDIR /app

#Copy packages & install if changed or first
COPY package*.json .
RUN npm install

#Copy all files
COPY . .

#Set API URL
ENV REACT_APP_MAPBOX_ACCESS_TOKEN=your-access-token

#Expose port 3000 on host machine
EXPOSE 3000

#Start App
ENTRYPOINT ["npm", "start"]