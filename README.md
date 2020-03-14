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
- Grab the latest champ file here: http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/champion.json


## To Do
- Build out the spectate-match module
- Refresh periodically
	- Can simply re-fetch summoner at top level
- Create CI flow
	- Can use sire for one-click deployment to new instances and git hooks
- Automatically refresh dev token every day while awaiting app approval
