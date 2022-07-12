const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js")
const Client = new Discord.Client({
  intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
});
const fs = require('fs').promises;

const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const port = 3000;



const flag = true

const Database = require("@replit/database");
const db = new Database();

async function setKey(key, value) {
  await db.set(key, value);
}

async function getKeyValue(key) {
  let value = await db.get(key);
  return value;
}

async function listKeys() {
  let keys = await db.list()
  return keys;
}


listKeys().then((keys) => console.log(keys))


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong");


const prefix = ".";
let messageRatio

let test = ""

const exp = 0
let slowMode = 0

let blacklist = []
let CLASSEMENT = []



const ratioRandoms = [
    "Arthur",
    "Victor",
    "Collin",
    "Guillaume",
    "Virgile",
    "Nathan",
    "Nicolas",
    "Kolya",
    "Louis",
    "Hisao",
    "Eliot"
];

const baseRandomTacosTier1 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYnbumCRMM1HlSPsQHoZ1WLYbORu2oPLKJtg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFhAaSPrBreEHPlQ8-SRjXPgEuYVtn9U70Q&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hL_QFmVmaV3UueYwnD7zG5nY3kTNIMCfOw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZW_mh_p8N3JNjyOhscOZXPM-NPPj8QG6vg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9aWb8SvazQmUPL6H15-OWYJIHw3IzoekOAA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOGd0aIwA3VVDKpB2T4CAM4WpCNccDOQ62KA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaSoICuVREtjoL-W2xsVZVSEJ-vKY5uoV_3Q&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7pVEqeDAQMeJ75ZpQzmzQWf0qBJfWHaXhQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGtP7OeEhFxAvv2hqWxdNz5H94lxYZcrPXw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL8JJvW79v4LqfnoL2DF4IYHhq2x3RXzK-Q&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzmvATuw1bj7Wswhn2zb2ZqkBpil0LtYvRg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPIdSHguenlffxsSMtzbkFGn0oaxASwn_pxA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3QMJGFXnqAE8sBGZHNnQu2A2ZWBw9as4iqg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRxOyOhtPd0VOQUiHfh8UtoX_Emo2zppJGFQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBsO1-9m3asC3axHrwNYWrq4F_tEf1PEoPIQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_dG1Pu62rwDom-AHP0SqpAIn21GH0C44JA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpUiKkJyWSEAKZ2pRmjIgQIYe2FyTA8y1BA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4to90rcgfpfmnykOqHsbSegE6n-m9UNtFA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQnwaqAHfFq8ESEGEMHWKsqJmZgPsVeisOiA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfyIa3R2XbAzVD9OSndxt_WJ8t86xtoIjLQ&usqp=CAU",
"https://cdn.discordapp.com/attachments/397839859605307392/995394265419108472/unknown.png",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFQocKagTirPf3rxF0xEWyQZ-IJFBhZnC-7g&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMGuhtIrbtl_7fU6yow71ZRUANQhqeRs45sQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2e1FMJAYVhn7MonuF26rh9F6sc26FkhVQpw&usqp=CAU",
]


const baseRandomTacosTier2 = [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9po_KVbxxqcLUXMjctGx9JcvQt5ezbEO-g&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_4gKLsPEPkITB_ojNjkOQlOTndr8tzU56g&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSctz8y1j8F8zy1YGQFXIQzoLJoTtIzmVGvBQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQQZyRj3-of6d873HVZ7N1kBQ_nnLhdSxR_A&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjttfMwwMxXxPIqitn1pg4o4bPY409pIdWmw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxH7y7-9TjeCkxS5OptP5usX8BZMKNw2Vuw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjel4QCx58LYsX7qwV_TODI-HcJAxFRuba8Q&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPm3lRPXwKQIEMcrjNjNl1hDgNyH1cwskUSw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxb6NI4tCLOEX-hdfdtzkir18HqQWSxiJ1A&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmADdldVRQ3B9TaM_qJ9hvrtQCRcoy3qdI7w&usqp=CAU",
]

const baseRandomTacosTier3 = [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOHk2eNT8izDFCj4aHKyGOR8v-j7057HIJg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L08yTBU5VuVXl8ULUBVvIPNgTTn93SwB6g&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk4P8MNXCZlzdXe_aCOog1R52_ARh2HE2BHQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5EES5kYkTL7ANrfNV3GgOO_pwqqJeBn9Rg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsW4WRD3wAgydljBBHMMVLIVdlzmy-3G3NJQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHU1nJy0kGD6OmgPZEq3zgP1Cyu1wSyGjOw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oLtsp-a-kZIdmEoTfszCTiBZOve-mUwZHg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFYSdxJ2TKFQvKkNCVXwmGuQ7HYOJeiT6PkA&usqp=CAU",
]

const baseRandomTacosTier4 = [
"https://media0.giphy.com/media/kG3qqJ5Pb9Rn4DogGg/giphy.gif",
"https://thumbs.gfycat.com/DaringWateryHuemul-size_restricted.gif",
"https://thumbs.gfycat.com/CarelessFixedAnchovy-size_restricted.gif",
"https://i.gifer.com/QabM.gif",
"https://media2.giphy.com/media/3o6ZtkmiFtpBvii6uQ/giphy.gif",
"https://49.media.tumblr.com/0cc472a72044a2a1653c52b09e771975/tumblr_o28qil6wns1v4hesqo1_1280.gif",
]


const baseRandomTacosTier5 = [
"https://cdn.discordapp.com/attachments/397839859605307392/995396844521799730/unknown.png",
"https://cdn.discordapp.com/attachments/397839859605307392/995400710021713990/unknown.png",
"https://cdn.discordapp.com/attachments/397839859605307392/995395000798027806/tacosMilan.JPG",
"https://i1.ytimg.com/vi/F7tBtUFGhx8/hqdefault.jpg",
]


const baseRandomTacosTierMaudit = [
"https://images-ext-2.discordapp.net/external/x1Hg9qjBoQPL0k7I2RUPqe1ahtoaUWakqP5ob0BBEtw/%3Fq%3Dtbn%3AANd9GcQzbNFRHsfkIpQaDygL1HBaRcgh1oIfKxY62Q%26usqp%3DCAU/https/encrypted-tbn0.gstatic.com/images",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPYqQrrxTwjOCknK3BH91mWeCz8Z4PaAg4A&usqp=CAU",
"https://pbs.twimg.com/media/FEX-YzAXMAUREQx.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37XyMu-A6tx7cOdv8XNdCxGs3JqAi6SSnxg&usqp=CAU",
]


db.set("randomTacosTier1", baseRandomTacosTier1);
db.set("randomTacosTier2", baseRandomTacosTier2);
db.set("randomTacosTier3", baseRandomTacosTier3);
db.set("randomTacosTier4", baseRandomTacosTier4);
db.set("randomTacosTier5", baseRandomTacosTier5);
db.set("randomTacosTierMaudit", baseRandomTacosTierMaudit);


starterXp = ["Admin", 0]
messageMax = ["Admin", 0]
let dbClassement = []
db.set("dbClassement", dbClassement);

  


function swap (array, index1, index2){
   temp = array[index1];
   array[index1] = array[index2];
   array[index2] = temp;
}

async function sortingAlgorithm(array){
  for(i = 1; i < array.length; i = (i + 2)){
    for (j = 1; j < (array.length - i - 3); j = (j + 2)){
      const a = array[j];
      const b = array[j+2];
      if(a < b){
        swap(array, j, j+2);
        swap(array, j-1, j+1);
      }
      
    }
  }
  return array
}

function checkForDuplicates(array, dup) {

  for (let i = 0; i < array.length; i++) {
    if (dup === array[i]){
      return false
    }
    
}
return true
}


function addMessageMax(name){
    db.get("messageMax").then(messageMax => {
      messageMax.push(name);
      messageMax.push(0);
      db.set("messageMax", messageMax)
      
    })
  
}

function addStarterXp(name){
    db.get("starterXp").then(starterXp => {
      starterXp.push(name);
      starterXp.push(0);
      db.set("starterXp", starterXp)
      
    })
  
}


function checkForIndex(array, name) {

  for (let i = 0; i < array.length; i++){
    if (name === array[i]){
      return i;
    }
  }
return false
}

function addXp(Xp, name){
  db.get("starterXp").then(starterXp =>{
    persIndex = checkForIndex(starterXp, name) + 1;
    starterXp[persIndex] = starterXp[persIndex] + Xp;
    db.set("starterXp", starterXp);
  })
}

function addMessage(name){
  db.get("messageMax").then(messageMax =>{
    persIndex = checkForIndex(messageMax, name) + 1;
    messageMax[persIndex] = messageMax[persIndex] + 1;
    db.set("messageMax", messageMax);
  })
}

function checkIfBlacklisted(name){
  db.get("messageMax").then(messageMax =>{
    persIndex = checkForIndex(messageMax, name) + 1;
    console.log(name);
    console.log(persIndex);
    console.log(messageMax[persIndex]);
    if (messageMax[persIndex] > 9){
      blacklist.push(name)
    }
  })
  if (checkForDuplicates(blacklist, name) == false){
    return true
  }
  else {
    return false
  }

}

function resetBlacklist(){
  blacklist = [];
  db.get("messageMax").then(messageMax =>{
    for (let i = 1; i < messageMax.length; i = i + 2){
    messageMax[i] = 0;
    }
    db.set("messageMax", messageMax);
  })
}

function resetXpSpookyDontDoIt(){
  db.get("starterXp").then(starterXp =>{
    for (let i = 1; i < starterXp.length; i = i + 2){
    starterXp[i] = 0;
    db.set("starterXp", starterXp);
    }
  })
}


async function xpClassement(){
  let classement = []
  getKeyValue("starterXp").then(starterXp => {
    for (let i = 2; i < starterXp.length; i++){
      classement.push(starterXp[i]);
    }
    console.log(classement);
    return classement
  })
  return classement
}



async function messageClassement(classement){
  messageClassement =  new Discord.MessageEmbed()
    .setTitle("Classement Des Meilleurs Tacos")
    .addField("1 : " + classement[0], " xp : " + classement[1])
    .addField("2 : " + classement[2], " xp : " + classement[3])
    .addField("3 : " + classement[4], " xp : " + classement[5])
    .addField("4 : " + classement[6], " xp : " + classement[7])
    .addField("5 : " + classement[8], " xp : " + classement[9])
    .addField("6 : " + classement[10], " xp : " + classement[11])
    .addField("7 : " + classement[12], " xp : " + classement[13])
    .addField("8 : " + classement[14], " xp : " + classement[15])
    .addField("9 : " + classement[16], " xp : " + classement[17])
    .addField("10 : " + classement[18], " xp : " + classement[19]);
  return messageClassement
}


function resetSlowMode(){
  slowMode = 0
}

function tick() {
  //get the mins of the current time
  var mins = new Date().getMinutes();
  if (mins == "00") {
    resetBlacklist();
    
  }
  console.log('Tick ' + mins);
}

setInterval(tick, 1000 * 60);

/*function tickTest() {
  //get the mins of the current time
  var mins = new Date().getMinutes();
  var hours = new Date().getHours();
  if (mins == "00" && (hours = "00" || hours = "08")) {
    resetBlacklist();
  }
  console.log('Tick ' + mins);
}*/


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return "Il est "+ nd.getHours() + "h" +  nd.getMinutes() + " chez Virgile";
}



team55 = [];

Client.on("ready", () => {

    //Client.application.commands.create(data);
    //Client.guilds.cache.get("396034894507016192").commands.create(data);
    //Client.guilds.cache.get("955267207896653854").commands.create(data);

    console.log("bot opérationnel");
});



Client.on("messageCreate", message => {
    if (message.author.bot) return;

	  const args = message.content.slice(prefix.length).trim().split(/ +/);
	  const command = args.shift().toLowerCase();
  
    if(message.content === prefix + "rule"){
        message.channel.send("pas de règles, ratio");
    }
      
    else if(message.content === prefix + "ratio"){
        message.reply("gros ratio à toi")
    }
    else if(message.content === prefix + "grosratio"){
        
        const ratioRandom = Math.floor(Math.random() * ratioRandoms.length);

        message.channel.send(ratioRandoms[ratioRandom] + " gros ratio à toi");
              

    }
    else if(message.content === prefix + "grosgrosratio") {


        let roleID = "398609010665717781";
        let membersWithRole = message.guild.roles.cache.get(roleID).members.map(m=>m.user.id);

        const ratioRandom = Math.floor(Math.random() * membersWithRole.length);
        message.channel.send("<@" + membersWithRole[ratioRandom] + ">" + " gros gros ratio à toi");

        console.log(`Got ${membersWithRole.length} members with that role.`);
        console.log(membersWithRole);

        


        //const ratioRandom = Math.floor(Math.random() * nameList.length);

        //message.channel.send(nameList[ratioRandom] + " gros ratio à toi");

    }
    else if(message.content === prefix + "role") {


        let roleID = "398609010665717781";
        let membersWithRole = message.guild.roles.cache.get(roleID).members.map(m=>m.user.id);
        console.log(`Got ${membersWithRole.length} members with that role.`);
        console.log(membersWithRole);
        message.channel.send(`Got ${membersWithRole.length} members with that role.`);

        



    }

        else if(message.content === prefix + "rolelist") {


        let roleID = "398609010665717781";
        let membersWithRole =          message.guild.roles.cache.get(roleID).members.map(m=>m.user.id);
        console.log(`Got ${membersWithRole.length} members with that role.`);
        console.log(membersWithRole);


        for (i = 0, len = membersWithRole.length ; i < len; i++) {
              message.channel.send(`<@${membersWithRole[i]}> a le role family`);


          
      }

    

    }


    else if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setColor("#E033D1")
            .setTitle("Liste des ratios")
            .setURL("https://www.reddit.com/r/copypasta/comments/rlkhl4/ratio/")
            .setAuthor("Ratio","https://i.imgur.com/XFOuy2m.png")
            .setThumbnail("https://i.imgur.com/XFOuy2m.png")
            .addField(".help","Affiche l'ensemble des ratios")
            .addField(".rule","Toutes les règles du serveur")
            .addField(".ratio","Gros ratio à toi")
            .addField(".grosratio", "Gros ratio à lui")
            .addField(".grosgrosratio", "Gros GROS ratio à lui")
            .addField(".VirgileReviens", "Pour savoir l'heure de chez Virgile");
        
        message.channel.send({ embeds: [embed]});
    }


    else if (message.content === prefix + "test" && message.author.username === "WoaaW"){
      db.get("messageMax").then(messageMax =>{        
        console.log(messageMax.length);
      })
    }
      
    else if (message.content === prefix + "test1" && message.author.username === "WoaaW"){
      xpClassement().then((classement) => {
        console.log(classement)
      })
    



    }
    else if (message.content === prefix + "test2" && message.author.username === "WoaaW"){
        console.log(classement);

    } 
      
    else if (message.content === prefix + "test3" && message.author.username === "WoaaW"){
        console.log(arrayTest);
        swap(arrayTest,0,1);
        console.log(arrayTest);

    }
      
    else if (message.content === prefix + "test5" && message.author.username === "WoaaW"){
        resetBlacklist();

    }
    else if (message.content === prefix + "test6" && message.author.username === "WoaaW"){
        console.log(blacklist);
        getKeyValue("messageMax").then((value) => console.log(value));

    }
      

    else if (message.content === prefix + "xp"){     
      getKeyValue("starterXp").then((value) => console.log(value));
      db.get("starterXp").then(starterXp =>{
        persIndex = checkForIndex(starterXp, message.author.username) + 1;
        const exp = starterXp[persIndex];
        message.channel.send("Tu as " + exp + " d'expériences");
      })
 
    }
    

    else if (message.content === prefix + "tacos"){


      db.get("messageMax").then(messageMax => {
        if (checkForDuplicates(messageMax, message.author.username) === true){
          addMessageMax(message.author.username)
          getKeyValue("messageMax").then((value) => console.log(value));
        }

        else {
          addMessage(message.author.username)
          checkIfBlacklisted(message.author.username)
          console.log("check1");
        }
      
      })
      
      if (slowMode === 0){
        slowMode = slowMode + 1
        setTimeout(resetSlowMode,500);
        console.log("check1");
        if (checkIfBlacklisted(message.author.username) === false){
        const randTier = Math.floor(Math.random() * 1000);
        if (randTier < 750){
          db.get("randomTacosTier1").then(randomTacosTier1 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier1.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#E5E0E5")
              .setTitle("Tacos Tier 1")
              .setImage(randomTacosTier1[connoisseur])
              .setDescription("+ 5 xp");
            message.channel.send({ embeds: [embed]});
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(5, message.author.username);  
            
          })}
        else if (randTier < 914){
          db.get("randomTacosTier2").then(randomTacosTier2 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier2.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#16DE34")
              .setTitle("Tacos Tier 2")
              .setImage(randomTacosTier2[connoisseur])
              .setDescription("+ 20 xp");
            message.channel.send({ embeds: [embed]});  
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(20, message.author.username);  
            
          })}
        else if (randTier < 964){
          db.get("randomTacosTier3").then(randomTacosTier3 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier3.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#377AE6")
              .setTitle("Tacos Tier 3")
              .setImage(randomTacosTier3[connoisseur])
              .setDescription("+ 100 xp");
            message.channel.send({ embeds: [embed]});  
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(100, message.author.username);  
            
          })}
        else if (randTier < 979){
          db.get("randomTacosTier4").then(randomTacosTier4 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier4.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#D40AF5")
              .setTitle("Tacos Tier 4 !")
              .setImage(randomTacosTier4[connoisseur])
              .setDescription("+ 250 xp");
            message.channel.send({ embeds: [embed]});  
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(250, message.author.username);  
            
          })} 
        else if (randTier < 980){
          db.get("randomTacosTier5").then(randomTacosTier5 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier5.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#F0A421")
              .setTitle("Tacos Tier 5 ! Légendaire !")
              .setImage(randomTacosTier5[connoisseur])
              .setDescription("+ 1500 xp");
            message.channel.send({ embeds: [embed]});  
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(1500, message.author.username);  
            
          })} 
        else if (randTier < 1000){
          db.get("randomTacosTierMaudit").then(randomTacosTierMaudit => {
             const connoisseur = Math.floor(Math.random() * randomTacosTierMaudit.length);
             const embed = new Discord.MessageEmbed()
              .setColor("#000000")
              .setTitle("Tacos Maudit, ratio")
              .setImage(randomTacosTierMaudit[connoisseur])
              .setDescription("-100 xp");
            message.channel.send({ embeds: [embed]});   
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(-100, message.author.username);  
            
          })} 
        

        
        console.log(randTier)
        }
      else if (checkIfBlacklisted(message.author.username) === true) {
        message.channel.send("Ratio, tu n'as plus de roll.")
      }
      }
      else {
        message.channel.send("Calme toi + gros ratio");
        console.log("check2");
      }
      
      
      
    }

    /*else if (message.content === prefix + "classement"){
      for (i = 0; i < 20; i = i +2){
        message.channel.send(classement[i]);
      }
      
    }*/
    else if (message.content === prefix + "classement"){
      let classement = []
      getKeyValue("starterXp").then((starterXp => {
        for (let i = 2; i < starterXp.length; i++){
          classement.push(starterXp[i]);
        }
      db.set("dbClassement", classement).then((classement => {
        getKeyValue("dbClassement").then((classement => {
          sortingAlgorithm(classement).then((classement => {
            console.log(classement);
            messageClassement =  new Discord.MessageEmbed()
              .setTitle("Classement Des Meilleurs Tacos")
              .addField("<:tacos:484507797652766746> : " + classement[0], " xp : " + classement[1])
              .addField("2 : " + classement[2], " xp : " + classement[3])
              .addField("3 : " + classement[4], " xp : " + classement[5])
              .addField("4 : " + classement[6], " xp : " + classement[7])
              .addField("5 : " + classement[8], " xp : " + classement[9])
              .addField("6 : " + classement[10], " xp : " + classement[11])
              .addField("7 : " + classement[12], " xp : " + classement[13])
              .addField("8 : " + classement[14], " xp : " + classement[15])
              .addField("9 : " + classement[16], " xp : " + classement[17])
              .addField("10 : " + classement[18], " xp : " + classement[19]);
            message.channel.send({ embeds: [messageClassement]});
          }));
        }))
      }));
      }))

    }

    else if (message.content === prefix + "taco" || message.content === prefix + "Tacos"){
        
      message.channel.send("<:tacos:484507797652766746>");

    }
      

    else if (message.content === prefix + "Virgile" || message.content === prefix + "virgile"){
        
      var currentdate = calcTime('Japan', '+9');
      
      message.channel.send(currentdate);

    }
    else if (message.content === prefix + "tadd"){
        
         if(team55.length <= 9 && checkForDuplicates(team55, message.author.username) == true){
            team55.push(message.author.username);
          
            console.log(team55);
            console.log(team55.length);

            message.channel.send(team55.length + " personne(s) dans le randomizer");
          }

          else if(team55.length <= 9 && checkForDuplicates(team55, message.author.username) == false){
           message.channel.send("Tu es déjà dans le randomizer " + message.author.username + ", ratio")
          }
          else {
            message.channel.send("Les équipes sont pleines");
            
        }
      }

    else if (message.content === prefix + "thelp"){
        const embed = new Discord.MessageEmbed()
            .setColor("#E033D1")
            .setTitle("Randomizer")
            .addField(".tadd","Pour s'ajouter au randomizer")
            .addField(".tremove", "Pour se retirer")
            .addField(".tclear","Clear le randomizer")
            .addField(".trand","Crée les équipes")
            .addField(".tlist", "Liste des personnes dans le randomizer");
        
        message.channel.send({ embeds: [embed]});
    }
      
    else if (message.content === prefix + "tclear"){
        team55 = [];
        message.channel.send("Le randomizer est clear");
    }
    else if (message.content === prefix + "tlist"){
      message.channel.send("Dans le randomizer :")
      for (let index = 0; index < team55.length; index++) {
        numero = index + 1
        message.channel.send(numero + ". " + team55[index]);
        
        
      }
    }
    else if (message.content == prefix + "trand"){
      shuffle(team55);
      const teamListEmbed = new Discord.MessageEmbed()
            .setColor("#E033D1")
            .setTitle("Les équipes :")
            .addField("__**Equipe 1 :**__", 
                              team55[0] 
                     + "\n" + team55[2]
                     + "\n" + team55[4]
                     + "\n" + team55[6]
                     + "\n" + team55[8]
                     )
            .addField("__**Equipe 2 :**__", 
                              team55[1] 
                     + "\n" + team55[3]
                     + "\n" + team55[5]
                     + "\n" + team55[7]
                     + "\n" + team55[9]
                      )

      
      message.channel.send({ embeds: [teamListEmbed]});
      
    }

    else if (message.content == prefix + "tremove"){
      console.log("check1")
      if (checkForDuplicates(team55, message.author.username) == false){
        for (let index = 0; index < team55.length; index++){
          if (message.author.username == team55[index]){
              var tremov = team55.splice(index, 1)
              message.channel.send(message.author.username + " retiré");
              return true
          }
        }
      }
      else {
         message.channel.send("Tu n'es pas dans le randomizer " + message.author.username + ", ratio");
      }

          
    }

    else if (command === "tremove"){
      console.log("check2")
      if(args.length === 1 || checkForDuplicates(team55, args[0]) == false){
        for (let index = 0; index < team55.length; index++){
          console.log(team55[index])
          if (args[0] == team55[index]){
            console.log('check3')
            var tremov = team55.splice(index, 1)
            message.channel.send(args[0] + " retiré");
            return true
          }
        }
      }
      else {
        message.channel.send(args[0] + " n'est pas dans le randomizer, ratio ");
      }
    }


    else if (message.content === prefix + "VirgileReviens" || message.content === prefix + "virgileReviens" || message.content === prefix + "virgilereviens" || message.content === prefix + "Virgilereviens"){
     /* var countDownDate = new Date("Aug 16, 2022 00:00:00").getTime();

      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));*/

      message.channel.send("Et ce ratio il revient quand ?");
    }
    
    else return false
  
});




Client.login(process.env.DC_TOKEN);