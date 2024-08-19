FROM node:18.15

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .
CMD npm run dev
