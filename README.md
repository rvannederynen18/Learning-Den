# The Learning Den

Learning games for Cecilia and Harrison. Each player gets lessons picked for their age and interests, and points from every game go into their bank and turn into allowance.

**Play it here:** https://rvannederynen18.github.io/kids-learning-games/

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

`index.html` is the home page (players, lessons, bank, parent settings).
`hub-core.js` holds the shared players, curriculum and points. Every page needs it.

## Adding a new lesson later

1. Add the new game's `.html` file to the repo.
2. Add one entry for it to the `LESSONS` list near the top of `hub-core.js`, with the ages each level fits.

## How difficulty works

Each player gets an age level for every lesson. Inside each level there are 5 stages. Everyone starts at stage 1, moves up after two strong rounds in a row (8 or more of 10 right on the first try), and moves back down after one rough round (under 5 of 10). Times Tower also speeds up and adds tables as they play.

## Good to know

- Progress is saved in the browser on each device. Use **Parent settings → Backup** to copy it to another device.
- To update a file, upload a new version with the same name and it replaces the old one.
