"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var config = require("../config.json");
var client = new Discord.Client();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('message', function (msg) {
    if (msg.content === '안냥') {
        msg.reply("\uC548\uB155\uD558\uC138\uC5EC " + msg.author.username + " \uB2D8!!");
    }
});
client.login(config.token);
