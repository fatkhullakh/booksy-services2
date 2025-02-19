# Step 1: Build Angular app using Node.js
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Step 2: Serve Angular app with NGINX
FROM nginx:latest
COPY --from=builder /app/dist/store-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
