# lol-dash
League of Legends Dashboard


## Build
```bash
npm install
```


## Run
```bash
npm start
```


## Manual Deployment
Ex: http://ec2-52-12-154-128.us-west-2.compute.amazonaws.com
```
sudo -i

# copy deploy rsa keys to ~/.ssh/
chmod 0600 ~/.ssh/id_rsa*

# install node
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

# install forever
npm install -g forever

# clone repo
mkdir -p /var/www && cd /var/www
git clone git@github.com:fluffybunnies/lol-dash.git

# start server
/var/www/lol-dash/restart.sh
```


## Push up server secrets
```
scp ./config.server.local.json ubuntu@ec2-52-12-154-128.us-west-2.compute.amazonaws.com:/tmp/
ssh ubuntu@ec2-52-12-154-128.us-west-2.compute.amazonaws.com 'sudo -i mv /tmp/config.server.local.json /var/www/lol-dash/ && sudo -i /var/www/lol-dash/restart.sh'
```


## Keep Up To Date
- Grab the latest DataDragon version number (for use below) after each patch here: https://ddragon.leagueoflegends.com/api/versions.json
- Champ file: http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json
- Runes file: http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/runesReforged.json
- All assets: https://ddragon.leagueoflegends.com/cdn/dragontail-11.24.1.tgz


## SSL Cert
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/wraithzero.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/wraithzero.com/privkey.pem
This certificate expires on 2022-03-23.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Instructions: https://letsencrypt.org/getting-started
Should renew automatically


## Riot Developer App
https://developer.riotgames.com/app/544144/info


## To Do
- Style buttons
- Only refresh dashboard if there are changes
- Improve modal styling
	- The fixed size and inner scrolling are bad UI
