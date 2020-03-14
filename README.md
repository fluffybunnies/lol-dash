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


## Keep Up To Date
- Grab the latest DataDragon version number (for use below) after each patch here: https://ddragon.leagueoflegends.com/api/versions.json
- Champ file: http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/champion.json
- Runes file: http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/runesReforged.json
- All assets: https://ddragon.leagueoflegends.com/cdn/dragontail-10.5.1.tgz


## To Do
- Only refresh dashboard if there are changes
	- The issue is that it is closing any open modal
	- Other solution is to propogate modal all the way up to Home
- Improve modal styling
	- The fixed size and inner scrolling are bad UI
- Create CI flow
	- Can use sire for one-click deployment to new instances and git hooks
- Automatically refresh dev token every day while awaiting app approval
