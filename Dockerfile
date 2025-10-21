FROM node:16-alpine

RUN npm install -g @angular/cli@14

WORKDIR /app

COPY . .

EXPOSE 4200

CMD npm install && ng serve --host 0.0.0.0 --port 4200