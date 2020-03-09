FROM node:12.16.1-alpine3.11
WORKDIR /app
COPY package.json ./
COPY . /app
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && apk add git \
    && npm install \
    && apk del build-dependencies
RUN apk add ffmpeg
CMD [ "node", "index.js"]
EXPOSE 15555