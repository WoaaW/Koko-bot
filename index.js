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

const exp = 0

let blacklist = []

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
  "https://i.pinimg.com/236x/21/f7/0e/21f70e85ff57d7f06134fdff4e6fbc35.jpg",
  "https://i.pinimg.com/236x/12/1a/71/121a71a6bc75d29c18b427eb3461f19d.jpg",
  "https://i.pinimg.com/236x/da/2e/22/da2e22c7e30b32b4077bef730279cad7.jpg",
  "https://i.pinimg.com/236x/82/de/f7/82def7aa40042ad7166eb6389f9f5d1e.jpg",
  "https://i.pinimg.com/236x/02/3c/8e/023c8ee9d02c66dd8923947caf43cae7.jpg",
  "https://i.pinimg.com/236x/4b/0c/70/4b0c706c5cfac1ed993cec6e91785a74.jpg",
  "https://i.pinimg.com/236x/64/53/e1/6453e1631540c6d8d405de57c3b970a1.jpg",
  "https://i.pinimg.com/236x/f5/20/10/f52010f1acafbe3969cc567c41d44865.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/French_tacos_from_French_Tacos_on_London_Road.jpg",
  "https://static.takeaway.com/images/restaurants/be/N1R1OOR/products/tacos_double_classique.png?timestamp=1656251304",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSuBdlj_rkQA0TKpHP6twfhecksBXSInwEA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBj0rIkcJDunpgedOipblQ0NdgF4wnmzFqg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4CyaS4TiLaJiCntjievFxar-mH9l2E2dcag&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGkxFokTp9zPw0hup6xTiRTXyCZpyDOVArw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5EES5kYkTL7ANrfNV3GgOO_pwqqJeBn9Rg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU8da4n4F3CiwHm_25BgUTmV88pVhGVYkjBA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWabzmsgwpyTkZy1ek6QX_oEJqrIIgA2atNA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9mX16EUxafupxat2QbG-Rg9iwCsSqlb-5A&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxk-2mLd34YF_83BhhkHSjyUG8VwHFYhRhw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSThR9m06j4IJUEsfVn73VzJ_fHXxvuRvdAQg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5w1aZ8jDA1SAqY6YSA2EEvS0lI6BwB8VMA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYFr0w38C8rFhi-JdQGKnHlQdPWqFE9ndoA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HnSgcDxsdtPN6rdyiVTaK3UuGrw3_ANYbQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxIyp7qJ3QSGcXwwr1wWLxpxmAIXfbArtZA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCdwMa_Tg2MkqPWZq0FJjIL_Q_IF9ZvYWcSw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXE2zZM6LWymaEHteApsoHx4iKlwpBLU7NAA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugA8ahubsTTzjQGd065xYfvOQ2heHf_NJ4Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF6KMChENT0XgD-qsLuAL9WFr4jmJEXlw79Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38E71AWQQWlzXM0cuvCwVWrRngJnZs9TPUg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU8fgM5MPjL6iC7AoeLk77KWF8XWFtMaNgaQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdH3P8hOsQ2ic1RiMiNpHM_hCVEhnnq1OeWQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjLR6twp4kT2dPzbu0AtfH8uvURgnH5yktYA&usqp=CAU",
  "https://cdn.discordapp.com/attachments/397839859605307392/994706204502806630/unknown.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbNFRHsfkIpQaDygL1HBaRcgh1oIfKxY62Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPYqQrrxTwjOCknK3BH91mWeCz8Z4PaAg4A&usqp=CAU",
]


const baseRandomTacosTier2 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPYqQrrxTwjOCknK3BH91mWeCz8Z4PaAg4A&usqp=CAU",
]

const baseRandomTacosTier3 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbNFRHsfkIpQaDygL1HBaRcgh1oIfKxY62Q&usqp=CAU"
]

const baseRandomTacosTier4 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbNFRHsfkIpQaDygL1HBaRcgh1oIfKxY62Q&usqp=CAU"
]

const baseRandomTacosTier5 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbNFRHsfkIpQaDygL1HBaRcgh1oIfKxY62Q&usqp=CAU"
]


db.set("randomTacosTier1", baseRandomTacosTier1);
db.set("randomTacosTier2", baseRandomTacosTier2);
db.set("randomTacosTier3", baseRandomTacosTier3);
db.set("randomTacosTier4", baseRandomTacosTier4);
db.set("randomTacosTier5", baseRandomTacosTier5);


starterXp = ["Admin", 0]
messageMax = ["Admin", 0]





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
    db.set("messageMax", messageMax);
    }
  })
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

    /*else if (message.content === prefix + "test"){
        db.get("starterXp").then(starterXp => {
          starterXp.push("WoaaW");
          db.set("starterXp", starterXp)
          getKeyValue("starterXp").then((value) => console.log(value));
        })
    }

    else if (message.content === prefix + "test2"){
        db.get("starterXp").then(starterXp => {
          starterXp.splice(0,1);
          db.set("starterXp", starterXp)
          getKeyValue("starterXp").then((value) => console.log(value));
        })
    }

    else if (message.content === prefix + "test3"){
        db.get("starterXp").then(starterXp => {
          starterXp.push(5);
          db.set("starterXp", starterXp)
          getKeyValue("starterXp").then((value) => console.log(value));
          console.log(checkForDuplicates(starterXp, message.author.username));
        })
     }
      
    else if (message.content === prefix + "test4"){
        db.get("starterXp").then(starterXp => {
          getKeyValue("starterXp").then((value) => console.log(value));
          console.log(checkForIndex(starterXp, message.author.username));
          persIndex = checkForIndex(starterXp, message.author.username) + 1;
          console.log(persIndex);
          console.log(starterXp[persIndex]);
          starterXp[persIndex] = starterXp[persIndex] + 5;
          db.set("starterXp", starterXp);
          
        })
     }    

    else if (message.content === prefix + "test5"){
        getKeyValue("messageMax").then((value) => console.log(value));   
    }*/

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

      if (checkIfBlacklisted(message.author.username) === false){
        const randTier = Math.floor(Math.random() * 1000);
        if (randTier < 1000){
          db.get("randomTacosTier1").then(randomTacosTier1 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier1.length);
             message.channel.send(randomTacosTier1[connoisseur]);  
            })
          db.get("starterXp").then(starterXp => {
            if (checkForDuplicates(starterXp, message.author.username) === true){     
                addStarterXp(message.author.username);  
                console.log("addStarterXp")
            }
          
  
            addXp(5, message.author.username);  
            
          })}
        else if (randTier < 900){
          db.get("randomTacosTier2").then(randomTacosTier2 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier2.length);
  
             message.channel.send(randomTacosTier2[connoisseur]);
             console.log("check1");
          })}      
        else if (randTier < 950){
          db.get("randomTacosTier3").then(randomTacosTier3 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier3.length);
  
             message.channel.send(randomTacosTier3[connoisseur]);
             console.log("check2");
          })} 
        else if (randTier < 990){
          db.get("randomTacosTier4").then(randomTacosTier4 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier4.length);
  
             message.channel.send(randomTacosTier4[connoisseur]);
             console.log("check3");
          })} 
        else if (randTier < 1000){
          db.get("randomTacosTier5").then(randomTacosTier5 => {
             const connoisseur = Math.floor(Math.random() * randomTacosTier5.length);
  
             message.channel.send(randomTacosTier5[connoisseur]);
             console.log("check4");
          })} 
        
        console.log(randTier)
        }
      else if (checkIfBlacklisted(message.author.username) === true) {
        message.channel.send("Ratio, tu n'as plus de roll.")
      }
      
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