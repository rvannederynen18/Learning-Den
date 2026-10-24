/* The Learning Den — shared core used by every page.
   Holds players, the curriculum (which lessons each player gets, by age), points and allowance.
   To add a new lesson: add an entry to LESSONS below and drop its .html file next to this one. */
(function(){
"use strict";
const KEY = "family-learning-hub-v1";
const COLORS = ["#ff8fc7","#c084fc","#60a5fa","#22d3ee","#34d399","#a3e635","#ffb21e","#ff6b6f"];

/* ---------------- CURRICULUM ----------------
   Each lesson lists its difficulty levels with the ages they fit.
   Ages outside every range mean the lesson isn't assigned automatically. */
const LESSONS = [
  { id:"times-tower", file:"times-tower.html", title:"Times Tower", subject:"Math", icon:"🧱",
    levels:[
      { id:"starter", name:"Starter", minAge:5, maxAge:7, blurb:"Times tables 1 to 5, slow blocks, chart stays up longer" },
      { id:"full",    name:"Full",    minAge:8, maxAge:99, blurb:"Times tables up to 12, then division, faster blocks" }
    ] },
  { id:"wild-states", file:"wild-states.html", title:"Wild States", subject:"Geography", icon:"🗺️",
    levels:[
      { id:"explorer", name:"Explorer", minAge:4, maxAge:7, blurb:"State animals and state names, read out loud" },
      { id:"ranger",   name:"Ranger",   minAge:8, maxAge:99, blurb:"Animals plus capitals, nicknames and more facts" }
    ] },
  { id:"catch-count", file:"catch-and-count.html", title:"Catch & Count", subject:"Math", icon:"🎣",
    titles:{ girl:"Kitty Catch & Count", boy:"Catch & Count" }, icons:{ girl:"🐟", boy:"🎣" },
    levels:[
      { id:"minnow", name:"Minnow", minAge:4, maxAge:6, blurb:"Adding up to 10, with pictures to count" },
      { id:"bass",   name:"Bass",   minAge:7, maxAge:7, blurb:"Adding and taking away up to 20" },
      { id:"shark",  name:"Shark",  minAge:8, maxAge:12, blurb:"Two-digit adding and taking away" }
    ] },
  { id:"spelling", file:"spelling.html", title:"Spelling Bee", subject:"Spelling", icon:"🐝",
    titles:{ girl:"Kitty Spelling", boy:"Bug Spelling Bee" }, icons:{ girl:"🐱", boy:"🐝" },
    levels:[
      { id:"starter",  name:"Starter",  minAge:5, maxAge:7, blurb:"Short picture words, letters to tap" },
      { id:"super",    name:"Super",    minAge:8, maxAge:9, blurb:"2nd and 3rd grade words with tricky extra letters" },
      { id:"champion", name:"Champion", minAge:10, maxAge:14, blurb:"Big challenge words" }
    ] },
  { id:"planet-hop", file:"planet-hop.html", title:"Planet Hop", subject:"Science", icon:"🚀",
    levels:[
      { id:"cadet",     name:"Cadet",     minAge:4, maxAge:7,  blurb:"Fly to each planet: names, order and a fun fact" },
      { id:"commander", name:"Commander", minAge:8, maxAge:12, blurb:"Moons, sizes, years and tougher space quizzes" }
    ] },
  { id:"hockey-rink", file:"hockey-rink.html", title:"Hockey Rink", subject:"Math", icon:"🏒",
    levels:[
      { id:"rookie", name:"Rookie", minAge:5, maxAge:7,  blurb:"Power Play adding, picture graphs, and telling time" },
      { id:"pro",    name:"Pro",    minAge:8, maxAge:12, blurb:"Power Play times tables, team stats graphs, and elapsed time" }
    ] },
  /* autoFor: assigned automatically only for these styles (parents can still turn it on for anyone) */
  { id:"cheer-squad", file:"cheer-squad.html", title:"Cheer Squad", subject:"Math & Spelling", icon:"📣", autoFor:["girl"],
    levels:[
      { id:"rookie",  name:"Rookie",  minAge:5, maxAge:7,  blurb:"Count by 2s, 5s and 10s, spell short words, halves and quarters" },
      { id:"captain", name:"Captain", minAge:8, maxAge:12, blurb:"Skip-count for times tables, cheer-spell big words, 8-count fractions" }
    ] },
  { id:"chess-club", file:"chess-club.html", title:"Chess Club", subject:"Logic & Math", icon:"♟️",
    levels:[
      { id:"pawn",   name:"Pawn",   minAge:5, maxAge:7,  blurb:"How each piece moves, board squares, and knight-hop adding" },
      { id:"knight", name:"Knight", minAge:8, maxAge:12, blurb:"Fewest-move puzzles, square names, and knight-hop times tables" }
    ] },
  { id:"green-lab", file:"green-lab.html", title:"Green Lab", subject:"Science", icon:"🌱",
    titles:{ girl:"Flower Power Lab", boy:"Forest Lab" }, icons:{ girl:"🌸", boy:"🌳" },
    levels:[
      { id:"sprout", name:"Sprout", minAge:4, maxAge:7,  blurb:"How plants make food from sunlight, plant parts, and nature facts" },
      { id:"botanist", name:"Botanist", minAge:8, maxAge:12, blurb:"Photosynthesis words, flower and tree parts, fungi and ecosystems" }
    ] },
  { id:"litter-bug", file:"litter-bug.html", title:"Litter Bug", subject:"Environment", icon:"🗑️",
    levels:[
      { id:"helper", name:"Helper", minAge:4, maxAge:7,  blurb:"Clean up the park: trash or recycling?" },
      { id:"ranger", name:"Eco Ranger", minAge:8, maxAge:12, blurb:"Sort trash, recycling and compost, plus Earth facts" }
    ] },
  { id:"share-divide", file:"share-divide.html", title:"Share & Divide", subject:"Math", icon:"🍪",
    titles:{ girl:"Kitty Share & Divide" }, icons:{ girl:"🐟" },
    levels:[
      { id:"sharer",  name:"Sharer",  minAge:6, maxAge:7,  blurb:"Share treats fairly and count how many each one gets" },
      { id:"divider", name:"Divider", minAge:8, maxAge:12, blurb:"Division by sharing, groups and fact families, plus story problems" }
    ] },
  { id:"shape-lab", file:"shape-lab.html", title:"Shape Lab", subject:"Math", icon:"🔷",
    levels:[
      { id:"builder",   name:"Builder",   minAge:4, maxAge:7,  blurb:"Name shapes, count sides and corners, find shapes all around you" },
      { id:"architect", name:"Architect", minAge:8, maxAge:12, blurb:"Polygons, 3D shapes, symmetry, area and perimeter" }
    ] },
  { id:"clock-shop", file:"clock-shop.html", title:"Clock Shop", subject:"Math", icon:"🕐",
    levels:[
      { id:"tick", name:"Tick", minAge:4, maxAge:7,  blurb:"Read and set clocks to the hour and half hour" },
      { id:"tock", name:"Tock", minAge:8, maxAge:12, blurb:"Read clocks to the minute, set them, and figure out how much time passed" }
    ] },
  { id:"story-time", file:"story-time.html", title:"Story Time", subject:"Reading", icon:"📖",
    levels:[
      { id:"reader",   name:"Reader",   minAge:4, maxAge:7,  blurb:"Short stories read out loud, with easy questions" },
      { id:"bookworm", name:"Bookworm", minAge:8, maxAge:12, blurb:"Longer stories with why, how and word-meaning questions" }
    ] },
  { id:"snack-shack", file:"snack-shack.html", title:"Snack Shack", subject:"Health & Math", icon:"🍦",
    levels:[
      { id:"helper", name:"Helper", minAge:4, maxAge:7,  blurb:"Build a healthy lunch box, scoop ice cream, find dairy-free foods" },
      { id:"chef",   name:"Chef",   minAge:8, maxAge:12, blurb:"Balanced lunches, ice cream shop prices and change, reading for dairy" }
    ] },
  { id:"body-lab", file:"body-lab.html", title:"Body & Health Lab", subject:"Science & Health", icon:"💪",
    levels:[
      { id:"junior",    name:"Junior Doc",     minAge:4, maxAge:7,  blurb:"Body parts, healthy habits, skin care and move breaks" },
      { id:"scientist", name:"Body Scientist", minAge:8, maxAge:12, blurb:"How organs work, fitness, sleep, sun safety and skin care" }
    ] },
  { id:"pet-care", file:"pet-care.html", title:"Pet Care", subject:"Life Skills", icon:"🐾",
    levels:[
      { id:"pal", name:"Pet Pal", minAge:4, maxAge:7,  blurb:"What pets need every day and what they like to eat" },
      { id:"pro", name:"Pet Pro", minAge:8, maxAge:12, blurb:"Pet care, safe and unsafe foods, and reading body language" }
    ] },
  { id:"storm-chaser", file:"storm-chaser.html", title:"Storm Chaser", subject:"Science", icon:"⛈️",
    levels:[
      { id:"spotter",  name:"Storm Spotter",  minAge:4, maxAge:7,  blurb:"Make clouds, rain and rainbows, fly a hot air balloon, count to the thunder" },
      { id:"forecaster", name:"Forecaster", minAge:8, maxAge:12, blurb:"Storms, snow, fog and hurricanes, sea breezes, and how far away lightning is" }
    ] },
  { id:"gator-chomp", file:"gator-chomp.html", title:"Gator Chomp", subject:"Math & More", icon:"🐊",
    levels:[
      { id:"hatchling", name:"Hatchling", minAge:4, maxAge:7,  blurb:"Steer the gator to gobble the right answers. Slow and friendly" },
      { id:"chomper",   name:"Chomper",   minAge:8, maxAge:12, blurb:"Faster gator, times tables, shapes and healthy-food rounds" }
    ] }
];

const STYLES = {
  girl:{ label:"Girl", theme:"Pink, kitties, cheetahs & beach", avatar:"🐱" },
  boy: { label:"Boy",  theme:"Hedgehogs, sharks, bugs, space & chess", avatar:"🦔" }
};
/* Fun facts the mascot shares between levels, matched to each style. */
const FUN = {
  girl:["Cats sleep about 12 to 16 hours a day!","A group of kittens is called a kindle.","Cats have 32 muscles in each ear.","Every cat's nose print is different, like a fingerprint.",
        "Cats can't taste sweet things.","Kittens are born with blue eyes.","Cats walk on their tiptoes.","A house cat can run about 30 miles per hour!","A cat's whiskers help it tell if it fits through a gap.",
        "A cat's tongue is covered in tiny hooks that comb its fur.","Cats use their tails to keep their balance.","Lions and tigers are big cousins of house cats.","Cats can jump about six times their own length!","Cats spend a big part of every day cleaning their fur.",
        "The first organized cheerleader was a boy named Johnny Campbell, back in 1898.","The first pom-poms were made out of paper.",
        "In a stunt, the cheerleader lifted into the air is called the flyer.","The cheerleaders who hold up the flyer are called bases.",
        "A back spot stands behind a stunt to keep the flyer safe.","Competition cheer routines last about two and a half minutes.",
        "Megaphones help cheerleaders' voices carry across a big stadium."],
  boy: ["Butterflies taste with their feet!","All insects have six legs. Spiders have eight, so they aren't insects.","Ants can carry many times their own weight.","Honeybees dance to tell each other where flowers are.",
        "Ladybugs eat tiny bugs called aphids that hurt plants.","Fireflies make their own light.","Fish breathe with gills.","Catfish have taste buds all over their bodies!","You can tell a fish's age by counting rings on its scales.","Dragonflies can fly backward.",
        "A group of fish is called a school.","Sharks have been around longer than trees!","Octopuses have three hearts.","Grasshoppers hear with ears on their bellies.",
        "Monarch butterflies fly thousands of miles to Mexico for the winter.","There are more kinds of beetles than any other animal.","Salmon swim up rivers to lay their eggs.","A crocodile can't stick its tongue out.",
        "Jupiter is so big that all the other planets could fit inside it!","A day on Venus is longer than its whole year.","Saturn is so light it could float in a giant bathtub of water.",
        "The Sun is a star, the closest one to Earth.","Sunlight takes about 8 minutes to reach Earth.","Mars looks red because its dust is rusty.",
        "Astronauts' footprints on the Moon can last a very long time because there's no wind there.","Neptune has the fastest winds in the solar system.",
        "Olympus Mons on Mars is the tallest volcano in the solar system.","Astronauts float on the space station because they're always falling around Earth.",
        "The queen is the most powerful piece in chess.","Knights are the only chess pieces that can jump over other pieces.",
        "A pawn that reaches the other side of the board can turn into a queen!","Castling is the only chess move where two pieces move at once.",
        "Chess started in India about 1,500 years ago.","There are more possible chess games than atoms in the whole universe.",
        "Bishops always stay on the same color squares.","Each chess player starts with 16 pieces."]
};

const HOCKEY = ["A hockey puck is frozen before games so it bounces less.","A hockey puck is made of hard rubber and is one inch thick.",
  "Scoring three goals in one game is called a hat trick!","The Stanley Cup is more than 130 years old.","Each hockey team has six players on the ice: five skaters and a goalie.",
  "A Zamboni smooths the ice between periods.","A hockey game has three periods.","Hockey players can skate faster than 20 miles per hour!",
  "Every player on the team that wins the Stanley Cup gets their name engraved on it."];
FUN.girl.push(...HOCKEY); FUN.boy.push(...HOCKEY);
const OCEAN = ["The ocean covers about 70 percent of Earth.","Sea turtles have been around since the time of the dinosaurs.","Most crabs walk sideways.",
  "A sea star can grow back a lost arm.","Sea stars don't have brains.","Dolphins sleep with one half of their brain at a time.","Horseshoe crabs have blue blood!",
  "Pelicans scoop up fish in the stretchy pouch under their beaks.","An octopus can change color to hide.","Seahorse dads carry the babies.",
  "Sand dollars are animals, related to sea stars.","Ghost crabs dig burrows in the sand.","Sea turtle moms lay their eggs on the beach, usually at night.",
  "Most ocean waves are made by wind blowing across the water."];
FUN.girl.push(...OCEAN, "Cheetahs are the fastest land animals, running up to about 70 miles per hour!","Cheetahs have black tear marks that help block the sun's glare.",
  "Cheetahs can't roar, but they can purr!","A cheetah's long tail helps it steer when it runs fast.","Fennec foxes are the smallest foxes in the world.",
  "Fennec foxes' giant ears help them stay cool in the desert.","Fennec foxes can hear bugs moving underground.","Fennec foxes have furry feet for walking on hot sand.");
FUN.boy.push(...OCEAN, "Sharks don't have bones. Their skeletons are made of cartilage, like your nose!","Some sharks grow and lose thousands of teeth in their lifetime.",
  "The whale shark is the biggest fish in the world.","Snakes smell with their tongues.","Snakes don't have eyelids.","Some lizards can drop their tails to escape, then grow new ones.",
  "Chameleons can move each eye in a different direction at the same time.","Komodo dragons are the biggest lizards in the world.",
  "Sloths move so slowly that tiny plants called algae grow on their fur.","Sloths climb down from their trees only about once a week to go potty.",
  "Sloths can hold their breath underwater for a long time, up to about 40 minutes.",
  "A hedgehog has thousands of spines, about 5,000 to 7,000!","Hedgehogs roll into a spiky ball to stay safe.","Baby hedgehogs are called hoglets.",
  "Hedgehogs snuffle and grunt like tiny pigs while they hunt for bugs.","Hedgehogs love to eat beetles, caterpillars and worms.");
/* Family pets, sprinkled in quietly: two tabby cats, a little golden retriever, a hedgehog, and Donnie the tortoise who visits the yard. */
const PETS = ["Tabby isn't a breed of cat. It's a coat pattern of stripes, swirls or spots.","Most tabby cats have a marking shaped like the letter M on their forehead.",
  "Boy cats are often a little bigger than girl cats.","Cats knead with their paws, like kneading dough, when they feel happy and safe.","Cats love high perches where they can nap and watch the world.",
  "Golden retrievers were first raised in Scotland to fetch birds for hunters.","Golden retrievers have a waterproof double coat, and most of them love to swim.",
  "Girl golden retrievers are usually smaller than boys.","Golden retrievers have such gentle mouths they can carry an egg without cracking it.",
  "A dog's nose can smell thousands of times better than yours.","Golden retrievers are one of the most popular family dogs in America.",
  "Tortoises live on land, while most turtles live in water.","A tortoise's shell is part of its skeleton, so it can never climb out of it.",
  "Gopher tortoises dig long burrows, some more than 40 feet long!","More than 350 kinds of animals use gopher tortoise burrows as a home or hiding spot.",
  "Gopher tortoises are protected in Florida, so they stay wild and free.","Gopher tortoises can live 40 to 60 years in the wild.",
  "Tortoises love to munch on grasses, leaves and flowers.","Slow and steady: a tortoise walks less than half a mile an hour."];
FUN.girl.push(...PETS); FUN.boy.push(...PETS);
/* Interest tips: skin care and health for the girl style, nature and reptiles for the boy style, alligators for both. */
const GATORS = ["Florida has about 1.3 million wild alligators!","A baby alligator is called a hatchling.","Alligators can live 35 to 50 years in the wild.",
  "An alligator can grow thousands of new teeth in its lifetime.","Alligators have a rounded, U-shaped snout. Crocodiles have a pointier, V-shaped snout.",
  "The warmth of an alligator nest decides if the babies will be boys or girls.","Alligators can hold their breath underwater for a long time when resting.",
  "Never feed an alligator. It teaches them to come close to people.","Alligator moms guard their nests and carry the hatchlings to the water in their mouths."];
FUN.girl.push(...GATORS, "Tip: wear sunscreen even on cloudy days. The sun's rays go right through clouds.","Tip: wash your face gently with lukewarm water, not hot water.",
  "Tip: drinking water helps your skin stay soft and glowy.","Tip: kids' skin only needs a gentle wash, moisturizer and sunscreen.","Tip: lip balm with SPF protects your lips from sunburn.",
  "Tip: sleep is when your skin and body do their repairs. Aim for 9 to 12 hours.","Tip: wash your pillowcase every week to keep your skin happy.",
  "Tip: fruits and veggies with lots of colors give your skin vitamins.","Tip: never share makeup or lip balm. Germs spread easily.","Tip: stretch before cheer practice to warm up your muscles.",
  "Tip: eat a snack with protein after exercise to help your muscles recover.","Tip: give your eyes a break from screens: every 20 minutes, look at something far away for 20 seconds.");
FUN.boy.push(...GATORS, "Snakes shed their whole skin, usually in one piece!","Lizards are cold-blooded, so they bask in the sun to warm up.",
  "Anoles can change from green to brown.","Turtles and tortoises have been around for more than 200 million years.","A tortoise can't swim, but most turtles can.",
  "Most snakes in Florida are harmless and eat pests like rats and mice.","Tip: if you see a snake, back away slowly and give it space.","Tip: never pick up a wild turtle or tortoise. Watch it and let it go its own way.",
  "Mushrooms are related more closely to animals than to plants!","Oak trees can make tens of thousands of acorns in a single year.","Moss can grow without soil, on rocks and tree bark.",
  "A tree's roots can spread out wider than its branches.","Fireflies light up to talk to each other.","Tip: leave logs and rocks where you find them. They're homes for bugs, frogs and salamanders.",
  "Box turtles can close their shells up tight like a box.");
function newId(){ return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function newProfile(name, age, gender){
  return { id:newId(), name, age, gender:gender || "girl", color:COLORS[Math.floor(Math.random()*COLORS.length)],
    points:0, lifetime:0, paidPoints:0, history:[], lessons:{}, tt:{ best:0, bestLevel:0, custom:null }, ws:{ found:[], best:0 }, ph:{ visited:[], best:0 } };
}
function seed(){
  const d = newProfile("Player 1", 8, "girl"); d.color = "#ff8fc7";
  const s = newProfile("Player 2", 6, "boy"); s.color = "#22d3ee";
  return { v:1, profiles:[d, s], settings:{ pointsPerDollar:1000, pin:"", sound:true, voice:true }, payouts:[], active:null,
           guest:{ age:8, gender:"girl" } };
}
let mem = null;
function load(){
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch(e){}
  try { const s = sessionStorage.getItem(KEY); if (s) return JSON.parse(s); } catch(e){}
  return mem;
}
let db = load() || seed();
db.settings = Object.assign({ pointsPerDollar:1000, pin:"", sound:true, voice:true }, db.settings || {});
db.payouts = db.payouts || [];
db.guest = db.guest || { age:8, gender:"girl" };
db.profiles.forEach(p => { p.lessons = p.lessons || {}; p.tt = p.tt || { best:0, bestLevel:0, custom:null }; p.ws = p.ws || { found:[], best:0 }; p.ph = p.ph || { visited:[], best:0 }; p.history = p.history || []; });

function save(){
  mem = db;
  const s = JSON.stringify(db);
  try { localStorage.setItem(KEY, s); } catch(e){}
  try { sessionStorage.setItem(KEY, s); } catch(e){}
}

/* SAVED COPIES — so a parent can restore points and money if something gets deleted.
   One copy is saved automatically each day (the first time the Den opens that day), plus a copy
   right before anything risky (removing a player, paying out, adjusting a balance, restoring).
   Copies live in this browser next to the main save. Keeps the last 14 daily copies and 15 event copies. */
const SNAP_KEY = "family-learning-hub-snapshots";
function readSnaps(){ try { return JSON.parse(localStorage.getItem(SNAP_KEY) || "[]") || []; } catch(e){ return []; } }
function writeSnaps(list){
  for (let tries = 0; tries < 4; tries++){
    try { localStorage.setItem(SNAP_KEY, JSON.stringify(list)); return true; } catch(e){ list.splice(0, Math.max(1, Math.ceil(list.length / 3))); }
  }
  return false;
}
function snapshot(reason){
  if (!db || !Array.isArray(db.profiles)) return;
  const list = readSnaps(), now = new Date(), day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (!reason && list.some(s => s.day === day && !s.reason)) return;
  list.push({ t:Date.now(), day, reason:reason || "", data:JSON.stringify(db) });
  const daily = list.filter(s => !s.reason).slice(-14), events = list.filter(s => s.reason).slice(-15);
  writeSnaps(daily.concat(events).sort((x, y) => x.t - y.t));
}
snapshot();

/* Guest player lives only in memory on each page; nothing it does is saved. */
let guestObj = null;
function guest(){
  if (!guestObj) guestObj = { id:"guest", guest:true, name:"Guest", age:db.guest.age, gender:db.guest.gender, color:"#a8b3c7",
    points:0, lifetime:0, paidPoints:0, history:[], lessons:{}, tt:{ best:0, bestLevel:0, custom:null }, ws:{ found:[], best:0 }, ph:{ visited:[], best:0 } };
  return guestObj;
}

function autoLevel(lesson, age, p){ if (lesson.autoFor && p && !lesson.autoFor.includes((p.gender === "boy") ? "boy" : "girl")) return null; const l = lesson.levels.find(l => age >= l.minAge && age <= l.maxAge); return l ? l.id : null; }
function levelFor(p, lessonId){
  const lesson = LESSONS.find(l => l.id === lessonId); if (!lesson) return null;
  const choice = (p.lessons && p.lessons[lessonId]) || "auto";
  if (choice === "off") return null;
  if (choice === "auto") return autoLevel(lesson, Number(p.age) || 0, p);
  return lesson.levels.some(l => l.id === choice) ? choice : autoLevel(lesson, Number(p.age) || 0, p);
}
function curriculum(p){
  return LESSONS.map(lesson => {
    const lvl = levelFor(p, lesson.id);
    return lvl ? { lesson, level:lesson.levels.find(l => l.id === lvl) } : null;
  }).filter(Boolean);
}

const Hub = {
  KEY, COLORS, LESSONS, STYLES,
  get db(){ return db; },
  set db(v){ db = v; },
  save, newProfile, guest, levelFor, curriculum, autoLevel,
  snapshot, snapshots(){ return readSnaps().slice().reverse(); },
  restoreSnapshot(t){
    const s = readSnaps().find(x => x.t === t); if (!s) return false;
    let d; try { d = JSON.parse(s.data); } catch(e){ return false; }
    if (!d || !Array.isArray(d.profiles)) return false;
    snapshot("before restoring a saved copy");
    db = d; save(); return true;
  },
  profile(id){ return id === "guest" ? guest() : db.profiles.find(p => p.id === id); },
  active(){ return db.active ? Hub.profile(db.active) : null; },
  setActive(id){ db.active = id; save(); },
  titleOf(lesson, p){ return (lesson.titles && lesson.titles[Hub.style(p)]) || lesson.title; },
  iconOf(lesson, p){ return (lesson.icons && lesson.icons[Hub.style(p)]) || lesson.icon; },
  /* Read words out loud (respects the parent's voice setting). */
  say(text, opts){
    if (db.settings.voice === false) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = (opts && opts.rate) || .9; u.pitch = 1.05; u.lang = "en-US";
      const v = speechSynthesis.getVoices().find(v => /en[-_]US/i.test(v.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch(e){}
  },
  hush(){ try { speechSynthesis.cancel(); } catch(e){} },
  goHome(){ try { sessionStorage.setItem("hub-return", "1"); } catch(e){} location.href = Hub.homeUrl; },
  first(p){ return String((p && p.name) || "Player").trim().split(/\s+/)[0]; },
  style(p){ return (p && p.gender) === "boy" ? "boy" : "girl"; },
  dollars(pts){ return pts / Math.max(1, db.settings.pointsPerDollar); },
  money(pts){ return "$" + (Math.floor(Hub.dollars(pts) * 100) / 100).toFixed(2); },
  /* POINTS — every lesson pays out through this one function, so new lessons plug in the same way.
     Points land in the bank right away (nothing is lost if the page closes).
     Points from one play session are grouped into one line of history. */
  session:"s" + Date.now().toString(36),
  earn(p, points, lessonId, note){
    if (!p || !points) return;
    Hub.sessionPts = (Hub.sessionPts || 0) + points;
    if (p.guest){ p.points += points; Hub.refreshWallet(); return; }
    const real = Hub.profile(p.id); if (!real) return;
    real.points += points; real.lifetime += points;
    real.earnedBy = real.earnedBy || {};
    real.earnedBy[lessonId] = (real.earnedBy[lessonId] || 0) + points;
    const top = real.history[0];
    if (top && top.session === Hub.session && top.lesson === lessonId){ top.pts += points; top.d = Date.now(); if (note) top.note = note; }
    else real.history.unshift({ d:Date.now(), lesson:lessonId, pts:points, session:Hub.session, note:note || "" });
    real.history = real.history.slice(0, 80);
    if (real !== p){ p.points = real.points; p.lifetime = real.lifetime; }
    save(); Hub.refreshWallet();
  },
  /* A live wallet any page can show: bank total in $ and points, this session's earnings, and the exchange rate. */
  wallets:[],
  mountWallet(el, p){
    if (!document.getElementById("hub-wallet-css")){
      const st = document.createElement("style"); st.id = "hub-wallet-css";
      st.textContent = `.hub-wallet{background:#141a35;color:#fff;border:2px solid #ffcf3f;border-radius:14px;padding:8px 12px;display:flex;flex-direction:column;gap:2px;font-variant-numeric:tabular-nums;min-width:0}
.hub-wallet .hw-top{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.hub-wallet .hw-money{font-size:24px;font-weight:800;color:#ffcf3f;line-height:1.1}
.hub-wallet .hw-pts{font-size:14px;opacity:.85}
.hub-wallet .hw-sess{font-size:13px;color:#7ef0b0;font-weight:700}
.hub-wallet .hw-rate{font-size:12px;opacity:.7}
.hub-wallet.bump{animation:hwbump .45s ease-out}
@keyframes hwbump{40%{transform:scale(1.07);box-shadow:0 0 18px rgba(255,207,63,.7)}}
@media (prefers-reduced-motion:reduce){.hub-wallet.bump{animation:none}}`;
      document.head.append(st);
    }
    el.classList.add("hub-wallet");
    Hub.wallets.push({ el, p });
    Hub.refreshWallet(true);
  },
  refreshWallet(silent){
    const rate = db.settings.pointsPerDollar;
    Hub.wallets.forEach(({ el, p }) => {
      const s = Hub.sessionPts || 0;
      el.innerHTML = `<div class="hw-top"><span class="hw-money">${Hub.money(p.points)}</span><span class="hw-pts">${Math.round(p.points).toLocaleString()} pts ${p.guest ? "(guest, not saved)" : "in the bank"}</span></div>
        <div class="hw-sess">+${s.toLocaleString()} pts this time = ${Hub.money(s)}</div>
        <div class="hw-rate">${rate.toLocaleString()} points = $1.00</div>`;
      if (!silent){ el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    });
  },
  FUN,
  /* DIFFICULTY RAMP — inside each age level, every lesson has stages 1 (easiest) to 5.
     Everyone starts at stage 1. Two strong rounds in a row (8+ of 10 on the first try) step up one stage;
     one rough round (under 5 of 10) steps back down. Ramps up slowly, eases off quickly. */
  stage(p, lessonId){ const s = p && p.skill && p.skill[lessonId]; return s ? s.stage : 1; },
  recordRound(p, lessonId, first, total){
    if (!p) return 0;
    p.skill = p.skill || {};
    const s = p.skill[lessonId] = p.skill[lessonId] || { stage:1, good:0 };
    const ratio = first / Math.max(1, total);
    let change = 0;
    if (ratio >= .8){ s.good++; if (s.good >= 2 && s.stage < 5){ s.stage++; s.good = 0; change = 1; } }
    else { s.good = 0; if (ratio < .5 && s.stage > 1){ s.stage--; change = -1; } }
    if (!p.guest){ const real = Hub.profile(p.id); if (real && real !== p){ real.skill = p.skill; } save(); }
    return change;
  },
  stageNote(change, stage){
    return change > 0 ? `⬆️ Great job! Next round steps up to stage ${stage} of 5.` : change < 0 ? `Next round will be a little easier (stage ${stage} of 5).` : `Stage ${stage} of 5. ${stage < 5 ? "Two great rounds in a row moves you up!" : "Top stage!"}`;
  },
  funFact(p){ const list = FUN[Hub.style(p)]; return list[Math.floor(Math.random() * list.length)]; },
  /* MASCOT — Den the wolf pops up to cheer. The girl style brings a kitty friend along. */
  cheer(text, p, ms){
    p = p || Hub.active();
    const girl = Hub.style(p) === "girl";
    /* a long message (like a fun fact) isn't cut off by quick cheers */
    if ((ms || 0) >= 2500) Hub._hold = Date.now() + ms; else if (Date.now() < (Hub._hold || 0)) return;
    if (!document.getElementById("den-mascot-css")){
      const st = document.createElement("style"); st.id = "den-mascot-css";
      st.textContent = `.den-mascot{position:fixed;left:calc(10px + env(safe-area-inset-left, 0px));bottom:calc(10px + env(safe-area-inset-bottom, 0px));z-index:40;display:flex;align-items:flex-end;gap:4px;pointer-events:none;
  transform:translateY(160%);transition:transform .4s cubic-bezier(.3,1.5,.5,1)}
.den-mascot.show{transform:none}
.den-mascot svg{width:64px;height:64px;filter:drop-shadow(0 3px 0 rgba(0,0,0,.25))}
.den-mascot .cat{width:50px;height:50px}
.den-mascot.show svg{animation:denhop .5s ease-out 2}
.den-mascot .bubble{background:#fff;color:#1c2340;border:3px solid #1d74e8;border-radius:16px 16px 16px 4px;padding:8px 12px;font:700 15px/1.3 "Fredoka","Nunito","Trebuchet MS",system-ui,sans-serif;max-width:min(240px,60vw);margin-bottom:40px;box-shadow:0 4px 0 rgba(0,0,0,.15)}
.den-mascot.girl .bubble{border-color:#e0479e}
@keyframes denhop{40%{transform:translateY(-12px) rotate(-6deg)}}
@media (prefers-reduced-motion:reduce){.den-mascot{transition:none}.den-mascot.show svg{animation:none}}`;
      document.head.append(st);
    }
    let m = document.getElementById("den-mascot");
    if (!m){ m = document.createElement("div"); m.id = "den-mascot"; m.className = "den-mascot"; m.setAttribute("aria-live", "polite"); document.body.append(m); }
    m.classList.toggle("girl", girl);
    const nm = Hub.first(p);
    const lines = girl ? ["Awoo! Purr-fect!","Great job!","Meow-velous!",`Go, ${nm}, go!`,`Two, four, six, eight, who do we appreciate? ${nm}!`,"Gimme a YAY!","She shoots, she scores!","Hat trick!","The tabby kitties are purring for you!","Your pup is wagging her tail!","Slow and steady, like Donnie the tortoise!"]
                       : ["Awoo! Nice one!","Great catch!","Bug-tastic!","Out of this world!","Checkmate!","Great move!","Blast off!","He shoots, he scores!","Hat trick!","Your hedgehog is doing a happy snuffle!","Donnie the tortoise says great job!","Your pup is wagging her tail!"];
    m.innerHTML = Hub.WOLF + (girl ? Hub.CAT : "") + `<div class="bubble">${Hub.esc(text || lines[Math.floor(Math.random() * lines.length)])}</div>`;
    void m.offsetWidth; m.classList.add("show");
    clearTimeout(Hub._cheerT); Hub._cheerT = setTimeout(() => m.classList.remove("show"), ms || 1800);
  },
  WOLF:`<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="9,3 25,21 7,27" fill="#3e4f6b"/><polygon points="55,3 39,21 57,27" fill="#3e4f6b"/><polygon points="12,9 21,20 11,23" fill="#f3b7a6"/><polygon points="52,9 43,20 53,23" fill="#f3b7a6"/><polygon points="7,23 32,14 57,23 53,41 32,61 11,41" fill="#566b8c"/><polygon points="20,31 32,24 44,31 40,47 32,57 24,47" fill="#e3e9f2"/><polygon points="17,29 27,32 20,35" fill="#ffcf3f"/><polygon points="47,29 37,32 44,35" fill="#ffcf3f"/><polygon points="27,47 37,47 32,53" fill="#1c2340"/></svg>`,
  CAT:`<svg class="cat" viewBox="0 0 64 64" aria-hidden="true"><polygon points="8,6 26,18 10,30" fill="#f4a259"/><polygon points="56,6 38,18 54,30" fill="#f4a259"/><polygon points="12,12 22,19 13,25" fill="#ffc2d6"/><polygon points="52,12 42,19 51,25" fill="#ffc2d6"/><ellipse cx="32" cy="38" rx="24" ry="21" fill="#f4a259"/><path d="M20 22 l4 8 M32 18 v9 M44 22 l-4 8" stroke="#d9773a" stroke-width="3" stroke-linecap="round"/><ellipse cx="23" cy="38" rx="4" ry="5" fill="#3fbf6f"/><ellipse cx="41" cy="38" rx="4" ry="5" fill="#3fbf6f"/><ellipse cx="23" cy="38" rx="1.5" ry="4" fill="#14213d"/><ellipse cx="41" cy="38" rx="1.5" ry="4" fill="#14213d"/><polygon points="29,45 35,45 32,48" fill="#ff7aa8"/><path d="M8 44 h14 M8 49 l14 -2 M56 44 h-14 M56 49 l-14 -2" stroke="#7a4a2a" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  /* Times Tower settings for a player: the level's defaults, or the parent's custom values. */
  ttAuto(p){
    return levelFor(p, "times-tower") === "starter"
      ? { mode:"mult", startMax:3, topMax:5, divLevel:99, speed:"slow", levelSize:8, fadeBy:10 }
      : { mode:"auto", startMax:Number(p.age) <= 8 ? 5 : 6, topMax:12, divLevel:4, speed:"normal", levelSize:10, fadeBy:6 };
  },
  ttConfig(p){ return Object.assign(Hub.ttAuto(p), (p.tt && p.tt.custom) || {}); },
  esc(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); },
  homeUrl:"./index.html"
};
window.Hub = Hub;

/* AUTO FULL SCREEN — every game goes full screen by itself.
   Browsers only allow full screen right after a tap, so the first tap on a game page
   (usually the Start button) switches it on. If it drops out (a swipe or Esc), the next tap turns it back on.
   The home page (lesson list, bank, parent settings) stays normal. iPhones don't allow this for web pages;
   use Add to Home Screen there instead. */
(function autoFullScreen(){
  const root = document.documentElement;
  const req = root.requestFullscreen || root.webkitRequestFullscreen;
  if (!req) return;
  if (document.getElementById("parentBtn")) return;   /* the home page has the Parent settings button; games don't */
  const isFS = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  const enter = () => { if (isFS()) return; try { const r = req.call(root); if (r && r.catch) r.catch(() => {}); } catch(e){} };
  document.addEventListener("pointerdown", enter, true);
  document.addEventListener("keydown", e => { if (e.key !== "Escape") enter(); }, true);
})();
})();
