#!/usr/bin/env bash
# for ubuntu 18.04 LTS

# 安裝 make
sudo apt-get install build-essential

# 安裝 nodejs
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# iptable map port 4000 to https(443)
sudo iptables -t nat -I PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 4000

# 安裝 echo mori server
git clone https://github.com/wangchou/echo-mori.git
cd echo-mori

# production HTTPS
# 1) Set up https by Let's encrypt
# https://certbot.eff.org/lets-encrypt/ubuntubionic-other
# 2) 參考以下網址修改 src/server/index.mjs
# https://qops.blogspot.com/2019/02/certbot-letsencrypt-nodeexpress-https.html

npm install
npm run build
sudo npm install forever -g
forever start -a -o acc.log -e err.log -c "node --experimental-modules" src/server/index.mjs