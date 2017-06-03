
const log = require("../log");
const messages = require("./messages");

let usersKeys = {};
let userList = [];

decodeBase64 = function(s) {

                var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
                var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for(i=0;i<64;i++){e[A.charAt(i)]=i;}
                for(x=0;x<L;x++){
                            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
                            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
                }

                return r;
};

function getUsers () {

        return userList;

}

function getKeys () {

        return usersKeys;

}

function auth (req, res, hash) {

                let userInfo = JSON.parse(
                	decodeBase64(hash)
                );

               if (userList.indexOf(userInfo.user) === -1) {

                              usersKeys[userInfo.user] = userInfo.aes;
                              userList.push(userInfo.user);

                              res.writeHead(200, {"Content-Type": "text/plain"});
                              res.write(JSON.stringify({

                                            response: "authSuccess",
                                            aesKeys: usersKeys

                              }));
                              res.end();

                              console.log(userList)

                              messages.userConnected(userInfo.user);

               } else {

                            res.writeHead(200, {"Content-Type": "text/plain"});
                            res.write(JSON.stringify({

                                        response: "authFailed",
                                        error: "your username not unique"

                            }));
                            res.end();

               }

}

module.exports = {

            auth: auth,
            getUsers: getUsers,
            getKeys: getKeys

};
