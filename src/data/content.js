// ============================================================
//  ALL THE WORDS LIVE HERE.
//  Change any string below and the whole site updates.
//  Nothing else in the project hard-codes copy.
// ============================================================

export const person = {
  her: "Mrunaa",
  him: "Harsh",
  herHandle: "@mrunaa",
  himHandle: "@harsh",
};

// ---------- 1. LOCK SCREEN ----------
export const lockScreen = {
  dateLabel: "Tuesday, 20 October",
  notifications: [
    {
      app: "Instagram",
      icon: "camera",
      title: `${person.him} added you back`,
      body: "You're on his page again. Tap to open.",
      ago: "now",
    },
  ],
  hint: "tap the notification",
};

// ---------- 2. PROFILE HEADER ----------
export const profile = {
  name: `${person.her} 🤍`,
  handle: person.herHandle,
  avatar: "photos/avatar.jpg",
  bioLines: [
    "the best thing that ever happened to my feed",
    "and the one person who should never have had to wonder",
    "whether she was still on it",
  ],
  linkLabel: "why this page exists",
  stats: [
    { value: "4", label: "posts" },
    { value: "1", label: "follower" },
    { value: "1", label: "following" },
  ],
};

// ---------- 3. THE FOUR POSTS ----------
// These are the real photographs, and the captions are love notes.
export const posts = [
  {
    id: "p1",
    src: "photos/photo1.jpg",
    alt: "Mrunaa looking up at Harsh with a wide smile, outdoors at night",
    short: "you, looking up at me",
    caption:
      "You looked up at me like I'd done something right. I don't know what I did to earn that face, but I'd like to keep earning it — for a long time, and out loud, where people can see.",
    when: "the night I should have posted this",
    likes: 1,
  },
  {
    id: "p2",
    src: "photos/photo2.jpg",
    alt: "Mrunaa leaning on Harsh's shoulder while he points at something out of frame",
    short: "you, leaning on me",
    caption:
      "Me pointing at something that isn't even in the photo, and you still standing there smiling at me like it was the best part of the night. That's the whole thing, honestly. That's us.",
    when: "same night, better mood",
    likes: 1,
  },
  {
    id: "p3",
    src: "photos/photo3.jpg",
    alt: "Mrunaa holding the shawl over Harsh's head, both laughing on a street at night",
    short: "you, being ridiculous with me",
    caption:
      "You put your dupatta on my head and laughed so hard you couldn't hold it straight. I'd wear it a hundred times. I'd stand on that street for an hour. I'd do the embarrassing thing, on purpose, in front of everyone.",
    when: "the one I'd have made my pinned post",
    likes: 1,
  },
  {
    id: "p4",
    src: "photos/photo4.jpg",
    alt: "Mrunaa and Harsh holding up a maroon embroidered shawl together, both smiling",
    short: "you, winning something with me",
    caption:
      "Holding it up between us like we'd won a trophy. We had, a little. I want more of these — the ordinary nights that turn into the ones I keep.",
    when: "one to keep",
    likes: 1,
  },
];

// ---------- 4. THE DELETED POST (the confession) ----------
export const deletedPost = {
  badge: "This post is no longer available",
  eyebrow: "the one I took down",
  title: "I removed you from my Instagram.",
  paragraphs: [
    "Not a photo. You. I took you off my page, and when you noticed — because of course you noticed, you're not stupid — it didn't read as a settings change. It read as a sentence about how much you're worth to me.",
    "I'm not going to call it a mistake, because that word does a lot of work for me and none for you. I did it deliberately. What I didn't do was think about what it would say to you once you found out — and that's the part I'm actually ashamed of.",
    "Here's what I think it said. If I'm wrong, tell me:",
  ],
  readAs: [
    "that you were something to keep off the page",
    "that there were people I wanted to look unattached in front of",
    "that you were fine in private and inconvenient in public",
    "that being with me came with a door you weren't allowed to stand in",
  ],
  after: [
    "None of those are true. But I built something that looked exactly like all four of them, and then acted surprised when you read it correctly.",
    "You were never something to hide, Mrunaa. You're the opposite of that. You're the person I'd put on a billboard and point at. And I am sorry — properly, not tidily — that I made you feel like the thing I put away instead.",
    "So I put you back. Not because you asked. Because you were never supposed to be off it.",
  ],
};

// ---------- 5. THE DIRECT MESSAGES ----------
export const dm = {
  headerName: person.him.toLowerCase(),
  headerNote: "seen just now",
  messages: [
    { from: "him", text: "hey. you don't have to reply to this." },
    { from: "him", text: "i'm not going to explain it away. i took you off my page. that was me, and i knew what i was doing." },
    { from: "him", text: "what gets me is that you had to find it yourself. you went looking for yourself in my life and you weren't there." },
    { from: "him", text: "and you'd have been allowed to be furious about it. instead you probably sat with it for days deciding whether you were even allowed to be upset." },
    { from: "him", text: "you were. you are." },
    { from: "him", text: "i've put you back. and i've sat with why i did it in the first place — properly, not just long enough to write an apology." },
    { from: "him", text: "it was never about you. it was me being a coward about being seen. i'm not going to make you pay for that again." },
    { from: "him", text: "that's all. take your time. i'm not going anywhere, and neither is your name on my page. 🤍" },
  ],
  replies: [
    {
      id: "read",
      label: "I read it 🤍",
      reply: "Thank you for reading it. That's more than I asked for.",
      followUp: "That's all I wanted. You can put your phone down now — I'll still be here tomorrow.",
    },
    {
      id: "time",
      label: "I need some time 🥺",
      reply: "Take all of it.",
      followUp: "No countdown, no follow-up message asking whether you're over it yet. I'll wait until you bring it up.",
    },
    {
      id: "show",
      label: "Show me what actually changed",
      reply: "Good. I'd rather show you than tell you.",
      followUp: null,
      scrollTo: "highlights",
    },
  ],
};

// ---------- 6. STORY HIGHLIGHTS = the promises ----------
export const highlights = [
  {
    id: "h1",
    label: "you stay",
    title: "You stay on my page.",
    body:
      "Not for a week. Not until it feels awkward again. Not until the next time I get nervous about being seen. You're on it, and it isn't a favour I'm doing you — it's just where you belong.",
  },
  {
    id: "h2",
    label: "no hiding",
    title: "I won't hide you.",
    body:
      "Not from my page, not from the people on it, not from anyone who asks. And if somebody has a problem with you being there, that's their problem — and it's mine to deal with, not yours to absorb.",
  },
  {
    id: "h3",
    label: "I talk first",
    title: "You hear it from me.",
    body:
      "If something's bothering me, it comes out of my mouth before it changes anything. Before you have to notice it on your own and lie awake working out what you did.",
  },
  {
    id: "h4",
    label: "nothing quietly",
    title: "Nothing happens quietly.",
    body:
      "No more things moving in the background that you find out about later. If it touches you, you're in the room while it's decided — not told about it afterwards.",
  },
  {
    id: "h5",
    label: "never a secret",
    title: "You will never be a secret.",
    body:
      "That's the promise under all the other ones. You will never have to go looking for yourself in my life and not find yourself there.",
  },
];

// ---------- 7. CLOSE FRIENDS ----------
export const closeFriends = {
  label: "Close friends",
  count: "1",
  eyebrow: "close friends · 1",
  title: "There's one person on this list.",
  body:
    "There's only ever going to be one person on this list. And it's the one who should never have had to check.",
  note: "Added back. Staying added. 🤍",
};

// ---------- 8. FINALE ----------
export const finale = {
  eyebrow: "so that's my page",
  heading: "Every bit of it has you on it now.",
  lines: [
    "I can't undo the days you spent wondering whether you were allowed to be upset with me. I'd take them back if wanting to were enough.",
    "What I can do is tell you that you were allowed. That I understood why it stung before I wrote any of this — not while writing it.",
    "You don't owe me an answer today. Or tomorrow. Or in a way that's tidy and convenient for me.",
  ],
  question: "One More Chance, My Baby? 🥺❤️",
  buttons: {
    yes: "Yes 🤍",
    time: "I need a little time 🥺",
  },
  answers: {
    yes: {
      title: "You just fixed a very bad week. 🤍",
      body: "I love you, Mrunaa. Loudly. On the page. Where anyone can see.",
    },
    time: {
      title: "That's okay. Genuinely.",
      body: "I'll wait, and I won't ask again until you bring it up. The page stays the same either way.",
    },
  },
  signOff: `${person.him}`,
};

// ---------- 9. MUSIC ----------
export const music = {
  labelOn: "music on",
  labelOff: "music off",
  hint: "a little something for the mood",
  // The real recording that plays behind the story. Never autoplays — it
  // starts only when she taps the button.
  title: "Can't Help Falling in Love",
  artist: "Elvis Presley",
};
