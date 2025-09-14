# ---------- Build stage ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

# Don't download Cypress binary during install
ENV CYPRESS_INSTALL_BINARY=0

RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest and build
COPY . .
RUN npm run build --if-present

# ---------- Runtime stage ----------
FROM nginx:alpine AS runner
# Copy the built static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
