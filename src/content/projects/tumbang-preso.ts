import type { Project } from "../types";

/* ===========================================================================
 * 01 · TUMBANG PRESO
 *
 * The flagship. Everything factual here comes from the game's own repository
 * and its measurements: the 36-contact probe, the ±10 to 14% spread, the 32%
 * collider difference, the 100.64.x.x traceroute hop. None of it is estimated.
 * ======================================================================== */

export const tumbangPreso: Project = {
  n: "01",
  slug: "tumbang-preso",
  title: "Tumbang Preso",
  category: "Game / Multiplayer",
  year: "2026",
  world: "tumbang",
  display: "daruma",
  oneLiner:
    "A four-player networked take on the Filipino street game, built alone in five days.",
  did: "I built the whole game.",
  outcome: "1st Place · Gear Up NCR 2026",
  media: {
    src: "/images/project-tumbang-preso.jpg",
    alt: "The Tumbang Preso title screen: a rusted tin can and a slipper on asphalt, with the game's hand-lettered menu.",
  },
  clip: {
    src: "/work/tumbang/match.mp4",
    poster: "/work/tumbang/match-poster.webp",
  },
  award: "1st Place · Gear Up NCR Esports Game Dev Challenge 2026",
  built: [
    "Godot 4.7",
    "GDScript",
    "Blender",
    "ENet",
    "UDP discovery",
    "Linux VPS",
  ],
  related: ["gear-up-ncr"],
  links: {
    download:
      "https://drive.google.com/drive/folders/1vbfB_JqTbfrG5mT_SyqvXXy4LsM6LHTy?usp=sharing",
    trailer:
      "https://drive.google.com/file/d/15yPUlkaltsnbQn5zuD2bBwSrXgxYpo9n/view?usp=drive_link",
    gameplay:
      "https://drive.google.com/file/d/1zadxFIYe46-x3y5XQiFOI0cB80uuZlGs/view?usp=drive_link",
  },
  facts: [
    { label: "Role", value: "Lead developer, built it solo" },
    { label: "Team", value: "BH Studios" },
    { label: "Event", value: "Gear Up NCR, 6 to 8 August 2026" },
    { label: "Result", value: "1st Place, representing NCR at Nationals" },
    { label: "Nationals", value: "General Santos City, Mindanao" },
    { label: "Built in", value: "Five days, empty project to shipped build" },
  ],

  home: {
    headline: "Five days. Four players. One tin can.",
    body: "BH Studios entered as a team. I developed the gameplay, level assembly, interface, sound integration, bots, physics and multiplayer networking.",
    coda: "It won 1st Place at Gear Up NCR.",
    figure: "tp-throw",
    figureCaption:
      "Drag back and let go. Every contact is judged twice at once, and the two answers do not always agree.",
  },

  lede: "Tumbang Preso is the street game every Filipino kid knows: one person guards a tin can inside a chalk box, everybody else throws a slipper at it from outside. I rebuilt it as a four-player networked game in Godot 4. I developed the gameplay, networking, bots and interface, assembled the environments from custom work and licensed assets, integrated the sound, and delivered the pitch. The competition build came together in five days.",

  sections: [
    {
      n: "01",
      heading: "What a match actually is",
      standfirst:
        "Nobody outside the Philippines has played this, so it starts here.",
      blocks: [
        {
          kind: "p",
          text: "One player is the **taya**, stuck inside a chalk box guarding the **lata**. The other three are attackers throwing **tsinelas** at it from outside. Four rounds of 90 seconds, one per player, so everyone is taya exactly once.",
        },
        {
          kind: "p",
          text: "The round count is not a setting I chose. It falls out of having four seats and rotating the role. Scoring is cumulative and personal, so the highest total after the fourth round wins and there is no per-round winner.",
        },
        {
          kind: "figures",
          items: [
            { value: "4", label: "Rounds, one taya each" },
            { value: "90", unit: "s", label: "Round length" },
            { value: "1", label: "Taya against three attackers" },
            { value: "+100", label: "Knockdown, to the thrower" },
          ],
        },
        {
          kind: "p",
          text: "The interesting part is not the throw. Throwing is free. Your slipper lands *inside* the taya's box, and walking in to pick it up is exactly what puts you in range of being tagged. Knock the lata over and the taya has to stop and stand it back up, which is the one window they cannot defend.",
        },
        {
          kind: "aside",
          label: "Passive defence",
          text: "The taya earns +10 per second while the lata stands. That pays 900 a round uncontested against 100 for a single knockdown, and it is written into the balance board as a known risk rather than left to be discovered.",
        },
      ],
    },
    {
      n: "02",
      heading: "The team built the entry. I built the game.",
      blocks: [
        {
          kind: "p",
          text: "Gameplay, level assembly, UI, sound integration, bots, physics and networking. I built the game, prepared the presentation and answered the judges’ questions. The original project combines custom work with licensed asset kits.",
        },
        {
          kind: "p",
          text: "The five-day deadline made verification essential. I prioritized reliable contact detection, readable feedback and multiplayer behavior I could measure and test.",
        },
      ],
    },
    {
      n: "03",
      heading: "I stopped trusting the engine's collision callbacks",
      standfirst: "This is the measurement the whole build turns on.",
      blocks: [
        {
          kind: "p",
          text: "Tags, slipper contact and the reset ring are all decided by measuring distance on the host. Not by Godot's area-overlap callbacks, which is what I built first and what any tutorial would tell you to use.",
        },
        {
          kind: "p",
          text: "I only caught it because I wrote a probe that ran every contact case and counted what actually fired.",
        },
        {
          kind: "figures",
          caption:
            "The probe, run over every contact case the game can produce.",
          items: [
            { value: "36", label: "Contacts the probe staged" },
            { value: "20", label: "Area overlaps that fired", tone: "bad" },
            { value: "16", label: "That never fired at all", tone: "bad" },
            {
              value: "36",
              label: "Resolved by host distance",
              tone: "good",
            },
          ],
        },

        {
          kind: "p",
          text: "They were not random misses either. They clustered by target. That is the part that would have hurt: if I had shipped it, the bug would have reached me as *“this character feels unfair”*, and with the time I had I would have gone and rebalanced a number instead of fixing the physics underneath it.",
        },
        {
          kind: "p",
          text: "Deciding on the host also means every peer agrees. A tag that lands on my screen cannot be a miss on yours. That is the whole reason authority sits with the host and not with whoever threw.",
        },
      ],
    },
    {
      n: "04",
      heading: "The picks change how you play, but only a little",
      blocks: [
        {
          kind: "p",
          text: "You pick three things: your person, your lata and your tsinelas. All three reach gameplay. Each carries three meters, and I named the meters per tab after what they actually do, because a can does not walk and a slipper does not get stunned.",
        },
        {
          kind: "p",
          text: "The lata's three are three answers to the same question. The taya wants the can upright, so STANCE refuses the knockdown, RESET shortens the recovery, and REBOUND punishes you for trying.",
        },
        {
          kind: "figures",
          items: [
            {
              value: "±10–14",
              unit: "%",
              label: "Spread across the full range of picks",
            },
            {
              value: "32",
              unit: "%",
              label: "Collider radius difference between the four cans",
              tone: "bad",
            },
          ],
        },
        {
          kind: "p",
          text: "I kept the spread deliberately narrow. This is a party game about hitting a can with a slipper. A pick that is 40% better than the others is not a personality, it is just the right answer, and then nobody picks anything else.",
        },
        {
          kind: "p",
          text: "Two rules kept me honest. The number has to be readable off the description, because a stat you cannot predict from the lore is a random modifier wearing a costume. And any competitive difference between cosmetic picks has to be declared: my four cans differ in collider radius by 32%, so I derived the scoring window from the STANCE meter instead of from that geometry. Otherwise the best-looking can is quietly the hardest to hit and nothing on screen tells you.",
        },
      ],
    },
    {
      n: "05",
      heading: "A host cannot reliably know its own address",
      blocks: [
        {
          kind: "p",
          text: "Hosts broadcast a UDP packet and the browse screen lists whatever it hears. I learned the trap on my own machine: ask it for its address and it offers a LAN card, a Hamachi 25.x, a Radmin 26.x and a few link-local 169.254s, in no promised order. Pick wrong and you send everyone to an address that only exists on the host.",
        },
        { kind: "figure", id: "tp-network" },
        {
          kind: "p",
          text: "The receiver has no such problem, so the beacon payload carries only the port and the listener takes the host half from the datagram's own source. If anyone later helpfully puts an address back in the payload, the bug is back.",
        },
        {
          kind: "p",
          text: "Clicking a discovered game selects it, it does not join. It fills the address field and leaves the press to JOIN. I wanted the typed field to be the only source of truth, so there is never a second hidden way to open a connection.",
        },
        {
          kind: "p",
          text: "LAN was never going to be enough for a game whose entire pitch is the friends who moved away. Online runs on dedicated lobbies on a VPS in Singapore, found with join codes over a small UDP status protocol that sits separately from the game ports.",
        },
        {
          kind: "aside",
          label: "Why a server at all",
          text: "Like a lot of people on Philippine ISPs, I am behind carrier-grade NAT, where no port-forwarding rule on your own router is reachable from outside. The tell is a traceroute landing on a 100.64.x.x address at the second hop. Once you see that, your options are an overlay network, a tunnel, or a machine with a public address. I went and got the machine.",
        },
      ],
    },
    {
      n: "06",
      heading: "We got to the venue through the flood",
      breath: true,
      blocks: [
        {
          kind: "p",
          text: "The competition ran 6 to 8 August, in the middle of a typhoon.",
        },
        {
          kind: "p",
          text: "We waded in through knee-deep floodwater every morning, shoes soaked, laptops held up over the water. Nobody on the team ever raised missing a day as an option, which is not nothing when the water is at your knees at 7am.",
        },
        {
          kind: "p",
          text: "I built the game alone. I did not get through those three days alone. BH Studios is Paul Andrei Recio, Clarence Pagaduan, Harry Gomez and Hans Xavier Lao, and they carried everything that was not the codebase.",
        },
      ],
    },
    {
      n: "07",
      heading: "The pitch counted as much as the build",
      blocks: [
        {
          kind: "p",
          text: "I built the deck out of the game's own nine-patch UI art and the game's own font, so the slides and the product read as one thing instead of a product sitting next to a template. Slides carry keywords only, because I wanted the judges listening rather than reading, and every clip runs muted and looping under narration instead of being given its own airtime.",
        },
        {
          kind: "p",
          text: "The spine is a childhood memory and I ran it through the technical half instead of just topping and tailing with it. The contextual controls hang on nobody ever handing you a rulebook. The fairness work hangs on the kid who was always taya and swore it was rigged. The dedicated servers hang on everybody moving away. My first draft kept the memory at the front and the numbers at the back, and it went cold in the middle.",
        },
        {
          kind: "p",
          text: "The deeper technical material, the probe tables, the network measurements, the server specs and the AI disclosure, sits in an appendix behind the closing slide. I never present it. It is there so that when a judge asks, the receipts are already in the room.",
        },
      ],
    },
    {
      n: "08",
      heading: "What happens next",
      blocks: [
        {
          kind: "p",
          text: "The competition is not over. As NCR's representative the game goes to the national finals in General Santos City. DOST and several partner companies are backing the entry from here and are connecting us with industry professionals to take it further.",
        },
        {
          kind: "p",
          text: "The build I show there will not be the build that won the region.",
        },
      ],
    },
  ],
};
