# The Learning Den

Learning games for kids. Each player gets lessons picked for their age and interests, and points from every game go into their bank and turn into allowance.

**Play it here:** https://rvannederynen18.github.io/Learning-Den/

## Lessons

| File | Lesson | What it teaches |
|---|---|---|
| `times-tower.html` | Times Tower | Times tables and division (falling blocks) |
| `wild-states.html` | Wild States | State animals, state names, capitals and facts |
| `catch-and-count.html` | Catch & Count | Adding and taking away (fishing) |
| `spelling.html` | Kitty Spelling / Bug Spelling Bee | Spelling, read out loud |
| `planet-hop.html` | Planet Hop | The planets and the solar system |
| `hockey-rink.html` | Hockey Rink | Math facts, reading graphs, telling time |
| `cheer-squad.html` | Cheer Squad | Skip counting, spelling, fractions |
| `chess-club.html` | Chess Club | Chess moves, board squares, knight-hop math |
| `green-lab.html` | Flower Power Lab / Forest Lab | Photosynthesis, plant and tree parts, nature facts |
| `litter-bug.html` | Litter Bug | Sorting trash, recycling and compost; Earth facts |
| `share-divide.html` | Share & Divide | Division by sharing, groups, fact families and story problems |
| `shape-lab.html` | Shape Lab | Shapes, sides and corners, symmetry, area and perimeter |
| `clock-shop.html` | Clock Shop | Reading and setting clocks, AM/PM, elapsed time |
| `story-time.html` | Story Time | Reading comprehension with stories read out loud |
| `snack-shack.html` | Snack Shack | Healthy lunches, ice cream shop money math, dairy-free swaps |
| `body-lab.html` | Body & Health Lab | How the body works, healthy habits, skin care, move breaks |
| `pet-care.html` | Pet Care | Caring for cats, dogs, hedgehogs and tortoises |
| `storm-chaser.html` | Storm Chaser | Weather: clouds, rain, storms, hot air, lightning distance |
| `gator-chomp.html` | Gator Chomp | Snake-style game: steer the gator to the right answers |

`index.html` is the home page (players, lessons, bank, parent settings).
`hub-core.js` holds the shared players, curriculum and points. Every page needs it.

## Kids' hubs (CV-1 and HV-1)

Personal home pages for each kid, kept separate from the Den's lessons and bank.

**CV-1** (`cv-1.html`): pink hub with chores, fun facts, Watch & Play, My Links, and links for cats, cheetahs, cheer, flowers and more.

- **Open CV-1:** https://rvannederynen18.github.io/Learning-Den/cv-1.html

**HV-1** (`hv-1.html`): mission-control hub with picture chores, a fact that's read out loud with the words lit up, Watch & Play, My Links, and links for space, sharks, reptiles, bugs, fishing and chess.

- **Open HV-1:** https://rvannederynen18.github.io/Learning-Den/hv-1.html

- No real names are in these files. Tap **Change my name** at the bottom of the page to type a name on each computer.
- Chores, stars, added links and the name are saved in that browser only. They never touch the Den's points or money.
- The big **Learning Den** button at the top of each hub opens the Den. On the Den's home page, **◀ Back to CV-1 / HV-1** goes back to the hub the kid came from.
- **Today's Weather** shows the weather for St. Augustine (from Open-Meteo, free, no account) with picture picks for what to wear. HV-1 can read it out loud.
- **Full screen** at the top of each hub turns full screen on or off. Browsers drop full screen when the page changes, so if it was on, the first tap on the next hub or Den page turns it back on.

## Adding a new lesson later

1. Add the new game's `.html` file to the repo.
2. Add one entry for it to the `LESSONS` list near the top of `hub-core.js`, with the ages each level fits.

## How difficulty works

Each player gets an age level for every lesson. Inside each level there are 5 stages. Everyone starts at stage 1, moves up after two strong rounds in a row (8 or more of 10 right on the first try), and moves back down after one rough round (under 5 of 10). Times Tower also speeds up and adds tables as they play.

## Learning from mistakes

One wrong answer gets a nudge to try again. After two wrong tries the game shows the right answer and explains why, gives no points for it, and brings the question back a couple of questions later. Wild States also has a 💡 Hint button (three hints, each worth a few points less).

## Restoring points and money

- **Saved copies:** the Den saves a copy every day and right before payouts, balance changes and removing a player. Parent settings → Backup → Saved copies on this device → **Restore**.
- **Removed a player by mistake?** Parent settings → Players → Recently removed → **Bring back** (their points and payouts come back too).
- **Lost everything on a device?** Parent settings → Allowance & PIN → **Adjust** next to a player to add, take away or set their balance from your own records.

## Good to know

- Progress is saved in the browser on each device. Use **Parent settings → Backup** to copy it to another device.
- **Paying allowance:** Parent settings → Allowance & PIN → **Pay out** next to a player (or the player's bank page). Pick an amount; it comes off their balance and shows in their payout history. **Undo last** fixes a mistake.
- Games switch to full screen by themselves at the first tap. iPhones don't allow that for web pages, so use **Add to Home Screen** there.
- To update a file, upload a new version with the same name and it replaces the old one.
