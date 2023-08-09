FROM node:18

# Create the bot's directory

RUN mkdir -p /usr/src/ragemusic-bot

WORKDIR /usr/src/ragemusic-bot



COPY package.json /usr/src/ragemusic-bot

RUN npm install



COPY . /usr/src/ragemusic-bot



# Start the bot.

CMD ["node", "index.js"]