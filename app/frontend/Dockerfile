# FROM node:16.14-alpine
# WORKDIR /app-frontend
#  ...
FROM node:16.14-alpine
# COPY package* ./
WORKDIR /app-frontend
RUN npm install
COPY . .

#EXPOSE 3000
CMD ["npm", "start"]
