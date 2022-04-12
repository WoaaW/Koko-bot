const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = new Discord.Client({

    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong");


const prefix = ".";

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



function checkForDuplicates(array, dup) {

  for (let i = 0; i < array.length; i++) {
    if (dup === array[i]){
      return false
    }
    
}
return true
}
  



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
        let membersWithRole =         message.guild.roles.cache.get(roleID).members.map(m=>m.user.id);
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

    else if (message.content === prefix + "Virgile" || message.content === prefix + "virgile"){
        
      var currentdate = calcTime('Japan', '+9');
      
      message.channel.send(currentdate);

    }
    else if (message.content === prefix + "tadd"){
        
         if(team55.length <= 9, checkForDuplicates(team55, message.author.username) == true){
            team55.push(message.author.username);
          
            console.log(team55);
            console.log(team55.length);

            message.channel.send(team55.length + " personne(s) dans le randomizer");
        }

          else if(team55.length <= 9, checkForDuplicates(team55, message.author.username) == false){
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
        message.channel.send(index + ". " + team55[index]);
        
        
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

    else if (message.content == prefix + "tremov"){
      for (let index = 0; index < team55.length; index++){
        if (message.author.username == team55[index]){
            var tremov = team55.splice(index)
            message.channel.send(message.author.username + " retiré");
            return true
          }
        
        }

          
    }



    else if (message.content === prefix + "VirgileReviens" || message.content === prefix + "virgileReviens" || message.content === prefix + "virgilereviens" || message.content === prefix + "Virgilereviens"){
     /* var countDownDate = new Date("Aug 16, 2022 00:00:00").getTime();

      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));*/

      message.channel.send("Et ce ratio il revient quand ?");
    }
      else if (message.content === prefix + "join"){
        let channel = client.channels.get('396034895027372035');
        channel.join()
      }
    
    else return false
  
});


Client.login(process.env.DC_TOKEN);