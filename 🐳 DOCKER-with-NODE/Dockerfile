# BASE image
FROM node:22

# App directory create karo
WORKDIR /myapp

# Pehle sirf dependencies-related files copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki sab source code ab copy karo
COPY . .

# ye sab se ek image banega 👆🏻--------------------------->

# port for listen (optional)*
EXPOSE 8000

# jab image ko run krengetab ye command use kro
CMD [ "npm", "start" ]