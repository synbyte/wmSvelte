FROM node:16
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5713
CMD [ "npm", "run","dev"]
