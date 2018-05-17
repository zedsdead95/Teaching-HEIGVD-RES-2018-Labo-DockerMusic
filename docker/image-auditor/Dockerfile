#Dockerfile for image-auditor

FROM node:10.0.0

COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install

EXPOSE 2205

ENTRYPOINT ["node", "/opt/app/auditor.js"]