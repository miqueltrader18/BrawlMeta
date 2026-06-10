// Brawl Meta data file.
// Static fallback roster: 104 brawlers. The website also tries to fetch live BrawlAPI data in the browser.
const STATIC_BRAWLERS = [
  {
    "name": "Shelly",
    "rarity": "Starting Brawler",
    "slug": "shelly"
  },
  {
    "name": "Colt",
    "rarity": "Rare",
    "slug": "colt"
  },
  {
    "name": "Bull",
    "rarity": "Rare",
    "slug": "bull"
  },
  {
    "name": "Brock",
    "rarity": "Rare",
    "slug": "brock"
  },
  {
    "name": "Barley",
    "rarity": "Rare",
    "slug": "barley"
  },
  {
    "name": "Nita",
    "rarity": "Rare",
    "slug": "nita"
  },
  {
    "name": "El Primo",
    "rarity": "Rare",
    "slug": "el-primo"
  },
  {
    "name": "Poco",
    "rarity": "Rare",
    "slug": "poco"
  },
  {
    "name": "Rosa",
    "rarity": "Rare",
    "slug": "rosa"
  },
  {
    "name": "Rico",
    "rarity": "Super Rare",
    "slug": "rico"
  },
  {
    "name": "Jessie",
    "rarity": "Super Rare",
    "slug": "jessie"
  },
  {
    "name": "Dynamike",
    "rarity": "Super Rare",
    "slug": "dynamike"
  },
  {
    "name": "Darryl",
    "rarity": "Super Rare",
    "slug": "darryl"
  },
  {
    "name": "Penny",
    "rarity": "Super Rare",
    "slug": "penny"
  },
  {
    "name": "Tick",
    "rarity": "Super Rare",
    "slug": "tick"
  },
  {
    "name": "Carl",
    "rarity": "Super Rare",
    "slug": "carl"
  },
  {
    "name": "8-Bit",
    "rarity": "Super Rare",
    "slug": "8-bit"
  },
  {
    "name": "Jacky",
    "rarity": "Super Rare",
    "slug": "jacky"
  },
  {
    "name": "Gus",
    "rarity": "Super Rare",
    "slug": "gus"
  },
  {
    "name": "Bo",
    "rarity": "Epic",
    "slug": "bo"
  },
  {
    "name": "Piper",
    "rarity": "Epic",
    "slug": "piper"
  },
  {
    "name": "Pam",
    "rarity": "Epic",
    "slug": "pam"
  },
  {
    "name": "Frank",
    "rarity": "Epic",
    "slug": "frank"
  },
  {
    "name": "Bibi",
    "rarity": "Epic",
    "slug": "bibi"
  },
  {
    "name": "Bea",
    "rarity": "Epic",
    "slug": "bea"
  },
  {
    "name": "Emz",
    "rarity": "Epic",
    "slug": "emz"
  },
  {
    "name": "Gale",
    "rarity": "Epic",
    "slug": "gale"
  },
  {
    "name": "Nani",
    "rarity": "Epic",
    "slug": "nani"
  },
  {
    "name": "Colette",
    "rarity": "Epic",
    "slug": "colette"
  },
  {
    "name": "Edgar",
    "rarity": "Epic",
    "slug": "edgar"
  },
  {
    "name": "Stu",
    "rarity": "Epic",
    "slug": "stu"
  },
  {
    "name": "Belle",
    "rarity": "Epic",
    "slug": "belle"
  },
  {
    "name": "Grom",
    "rarity": "Epic",
    "slug": "grom"
  },
  {
    "name": "Griff",
    "rarity": "Epic",
    "slug": "griff"
  },
  {
    "name": "Ash",
    "rarity": "Epic",
    "slug": "ash"
  },
  {
    "name": "Lola",
    "rarity": "Epic",
    "slug": "lola"
  },
  {
    "name": "Bonnie",
    "rarity": "Epic",
    "slug": "bonnie"
  },
  {
    "name": "Sam",
    "rarity": "Epic",
    "slug": "sam"
  },
  {
    "name": "Mandy",
    "rarity": "Epic",
    "slug": "mandy"
  },
  {
    "name": "Maisie",
    "rarity": "Epic",
    "slug": "maisie"
  },
  {
    "name": "Hank",
    "rarity": "Epic",
    "slug": "hank"
  },
  {
    "name": "Pearl",
    "rarity": "Epic",
    "slug": "pearl"
  },
  {
    "name": "Larry & Lawrie",
    "rarity": "Epic",
    "slug": "larry-lawrie"
  },
  {
    "name": "Angelo",
    "rarity": "Epic",
    "slug": "angelo"
  },
  {
    "name": "Berry",
    "rarity": "Epic",
    "slug": "berry"
  },
  {
    "name": "Shade",
    "rarity": "Epic",
    "slug": "shade"
  },
  {
    "name": "Meeple",
    "rarity": "Epic",
    "slug": "meeple"
  },
  {
    "name": "Trunk",
    "rarity": "Epic",
    "slug": "trunk"
  },
  {
    "name": "Bolt",
    "rarity": "Epic",
    "slug": "bolt"
  },
  {
    "name": "Mortis",
    "rarity": "Mythic",
    "slug": "mortis"
  },
  {
    "name": "Tara",
    "rarity": "Mythic",
    "slug": "tara"
  },
  {
    "name": "Gene",
    "rarity": "Mythic",
    "slug": "gene"
  },
  {
    "name": "Mr. P",
    "rarity": "Mythic",
    "slug": "mr-p"
  },
  {
    "name": "Max",
    "rarity": "Mythic",
    "slug": "max"
  },
  {
    "name": "Sprout",
    "rarity": "Mythic",
    "slug": "sprout"
  },
  {
    "name": "Lou",
    "rarity": "Mythic",
    "slug": "lou"
  },
  {
    "name": "Byron",
    "rarity": "Mythic",
    "slug": "byron"
  },
  {
    "name": "Ruffs",
    "rarity": "Mythic",
    "slug": "ruffs"
  },
  {
    "name": "Squeak",
    "rarity": "Mythic",
    "slug": "squeak"
  },
  {
    "name": "Buzz",
    "rarity": "Mythic",
    "slug": "buzz"
  },
  {
    "name": "Fang",
    "rarity": "Mythic",
    "slug": "fang"
  },
  {
    "name": "Eve",
    "rarity": "Mythic",
    "slug": "eve"
  },
  {
    "name": "Janet",
    "rarity": "Mythic",
    "slug": "janet"
  },
  {
    "name": "Otis",
    "rarity": "Mythic",
    "slug": "otis"
  },
  {
    "name": "Buster",
    "rarity": "Mythic",
    "slug": "buster"
  },
  {
    "name": "Gray",
    "rarity": "Mythic",
    "slug": "gray"
  },
  {
    "name": "R-T",
    "rarity": "Mythic",
    "slug": "r-t"
  },
  {
    "name": "Willow",
    "rarity": "Mythic",
    "slug": "willow"
  },
  {
    "name": "Doug",
    "rarity": "Mythic",
    "slug": "doug"
  },
  {
    "name": "Chuck",
    "rarity": "Mythic",
    "slug": "chuck"
  },
  {
    "name": "Charlie",
    "rarity": "Mythic",
    "slug": "charlie"
  },
  {
    "name": "Mico",
    "rarity": "Mythic",
    "slug": "mico"
  },
  {
    "name": "Melodie",
    "rarity": "Mythic",
    "slug": "melodie"
  },
  {
    "name": "Lily",
    "rarity": "Mythic",
    "slug": "lily"
  },
  {
    "name": "Clancy",
    "rarity": "Mythic",
    "slug": "clancy"
  },
  {
    "name": "Moe",
    "rarity": "Mythic",
    "slug": "moe"
  },
  {
    "name": "Juju",
    "rarity": "Mythic",
    "slug": "juju"
  },
  {
    "name": "Ollie",
    "rarity": "Mythic",
    "slug": "ollie"
  },
  {
    "name": "Lumi",
    "rarity": "Mythic",
    "slug": "lumi"
  },
  {
    "name": "Finx",
    "rarity": "Mythic",
    "slug": "finx"
  },
  {
    "name": "Jae-Yong",
    "rarity": "Mythic",
    "slug": "jae-yong"
  },
  {
    "name": "Alli",
    "rarity": "Mythic",
    "slug": "alli"
  },
  {
    "name": "Mina",
    "rarity": "Mythic",
    "slug": "mina"
  },
  {
    "name": "Ziggy",
    "rarity": "Mythic",
    "slug": "ziggy"
  },
  {
    "name": "Gigi",
    "rarity": "Mythic",
    "slug": "gigi"
  },
  {
    "name": "Glowy",
    "rarity": "Mythic",
    "slug": "glowy"
  },
  {
    "name": "Najia",
    "rarity": "Mythic",
    "slug": "najia"
  },
  {
    "name": "Damian",
    "rarity": "Mythic",
    "slug": "damian"
  },
  {
    "name": "Starr Nova",
    "rarity": "Mythic",
    "slug": "starr-nova"
  },
  {
    "name": "Spike",
    "rarity": "Legendary",
    "slug": "spike"
  },
  {
    "name": "Crow",
    "rarity": "Legendary",
    "slug": "crow"
  },
  {
    "name": "Leon",
    "rarity": "Legendary",
    "slug": "leon"
  },
  {
    "name": "Sandy",
    "rarity": "Legendary",
    "slug": "sandy"
  },
  {
    "name": "Surge",
    "rarity": "Legendary",
    "slug": "surge"
  },
  {
    "name": "Amber",
    "rarity": "Legendary",
    "slug": "amber"
  },
  {
    "name": "Meg",
    "rarity": "Legendary",
    "slug": "meg"
  },
  {
    "name": "Chester",
    "rarity": "Legendary",
    "slug": "chester"
  },
  {
    "name": "Cordelius",
    "rarity": "Legendary",
    "slug": "cordelius"
  },
  {
    "name": "Kit",
    "rarity": "Legendary",
    "slug": "kit"
  },
  {
    "name": "Draco",
    "rarity": "Legendary",
    "slug": "draco"
  },
  {
    "name": "Kenji",
    "rarity": "Legendary",
    "slug": "kenji"
  },
  {
    "name": "Pierce",
    "rarity": "Legendary",
    "slug": "pierce"
  },
  {
    "name": "Kaze",
    "rarity": "Ultra Legendary",
    "slug": "kaze"
  },
  {
    "name": "Sirius",
    "rarity": "Ultra Legendary",
    "slug": "sirius"
  }
];

const TIER_GROUPS = {
  "s": [
    "Damian",
    "Starr Nova",
    "Trunk",
    "Bolt",
    "Sirius",
    "Bull",
    "Clancy",
    "Bibi",
    "Najia",
    "Crow",
    "Mortis",
    "Leon",
    "Colt"
  ],
  "a": [
    "Gigi",
    "Ziggy",
    "Glowy",
    "Ollie",
    "Jae-Yong",
    "Finx",
    "Rosa",
    "Spike",
    "Sandy",
    "Amber",
    "Kit",
    "Cordelius",
    "Meg",
    "Buster",
    "Pierce",
    "Kaze",
    "Surge",
    "Kenji",
    "Draco",
    "Chester"
  ],
  "b": [
    "Bo",
    "Piper",
    "Pam",
    "Frank",
    "Bea",
    "Emz",
    "Gale",
    "Nani",
    "Colette",
    "Edgar",
    "Stu",
    "Belle",
    "Grom",
    "Griff",
    "Lola",
    "Bonnie",
    "Sam",
    "Mandy",
    "Maisie",
    "Pearl",
    "Larry & Lawrie",
    "Angelo",
    "Berry",
    "Shade",
    "Meeple",
    "Tara",
    "Gene",
    "Mr. P",
    "Max",
    "Sprout",
    "Lou",
    "Byron",
    "Ruffs",
    "Squeak",
    "Buzz",
    "Fang",
    "Eve",
    "Janet",
    "Otis",
    "Gray",
    "R-T",
    "Willow",
    "Chuck",
    "Charlie",
    "Mico",
    "Melodie",
    "Lily",
    "Juju",
    "Mina"
  ],
  "c": [
    "Shelly",
    "Brock",
    "Barley",
    "Nita",
    "Jessie",
    "Rico",
    "Dynamike",
    "Penny",
    "El Primo",
    "Poco",
    "Carl",
    "8-Bit",
    "Alli",
    "Lumi",
    "Moe"
  ],
  "d": [
    "Tick",
    "Darryl",
    "Jacky",
    "Hank",
    "Doug",
    "Ash",
    "Gus"
  ]
};

const TOP10_STATS = {
  "Damian": {
    "wr": "73.7%",
    "pick": "23.58%"
  },
  "Starr Nova": {
    "wr": "73.5%",
    "pick": "71.44%"
  },
  "Trunk": {
    "wr": "71.8%",
    "pick": "4.99%"
  },
  "Bolt": {
    "wr": "70.9%",
    "pick": "New"
  },
  "Najia": {
    "wr": "70.6%",
    "pick": "1.91%"
  },
  "Gigi": {
    "wr": "70.1%",
    "pick": "0.42%"
  },
  "Sirius": {
    "wr": "69.7%",
    "pick": "2.92%"
  },
  "Ziggy": {
    "wr": "69.3%",
    "pick": "0.71%"
  },
  "Glowy": {
    "wr": "68.9%",
    "pick": "1.09%"
  },
  "Ollie": {
    "wr": "68.5%",
    "pick": "0.23%"
  }
};

const IMAGE_OVERRIDES = {
  "bolt": "https://cdn.brawlify.com/brawlers/borderless/16000106.png",
  "damian": "https://cdn.brawlify.com/brawlers/borderless/16000104.png",
  "starrnova": "https://cdn.brawlify.com/brawlers/borderless/16000105.png",
  "glowy": "https://cdn.brawlify.com/brawlers/borderless/16000101.png",
  "sirius": "https://cdn.brawlify.com/brawlers/borderless/16000102.png",
  "najia": "https://cdn.brawlify.com/brawlers/borderless/16000103.png",
  "trunk": "https://cdn.brawlify.com/brawlers/borderless/16000096.png",
  "gigi": "https://cdn.brawlify.com/brawlers/borderless/16000100.png",
  "ziggy": "https://cdn.brawlify.com/brawlers/borderless/16000098.png",
  "ollie": "https://cdn.brawlify.com/brawlers/borderless/16000090.png",
  "jaeyong": "https://cdn.brawlify.com/brawlers/borderless/16000093.png",
  "finx": "https://cdn.brawlify.com/brawlers/borderless/16000092.png"
};

const SITE_INFO = {
  domain: "https://brawlmeta.net",
  lastManualUpdate: "2026-06-10",
  staticRosterCount: 104
};
