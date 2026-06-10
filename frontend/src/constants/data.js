// ─── Navigation ────────────────────────────────────────────────────────────
export const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Events', 'Contact']

// ─── Skills ─────────────────────────────────────────────────────────────────
export const SKILLS = {
  Development: [
    'Python', 'C++', 'C', 'C#', 'Java', 'JavaScript',
    'HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Vue.js',
    'Bootstrap', 'ASP.NET', 'PHP', 'MySQL', 'PostgreSQL',
    'FastAPI', 'SQLite', 'Firebase',
  ],
  Cybersecurity: [
    'Nmap', 'Burp Suite', 'Wireshark', 'Hydra',
    'Gobuster', 'ffuf', 'John the Ripper', 'Metasploit',
  ],
}

// ─── Projects ───────────────────────────────────────────────────────────────
// Place actual screenshots in src/assets/images/projects/
// e.g. securevault.jpg, netsweep.jpg, portfolioos.jpg, ctf-toolkit.jpg, threatmap.jpg
export const PROJECTS = [
  {
    id: 'securevault',
    title: 'SecureVault',
    subtitle: 'Password Manager',
    desc: 'End-to-end encrypted password manager built with React and FastAPI. AES-256 storage with a zero-knowledge architecture — the server never sees plaintext.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'AES-256'],
    image: '/src/assets/images/projects/securevault.jpg',
    color: '#7A33FF',
  },
  {
    id: 'netsweep',
    title: 'NetSweep',
    subtitle: 'Network Reconnaissance',
    desc: 'Automated recon tool wrapping Nmap and the Shodan API. Generates structured JSON threat reports with risk scoring for identified hosts.',
    tags: ['Python', 'Nmap', 'Shodan API', 'CLI'],
    image: '/src/assets/images/projects/netsweep.jpg',
    color: '#9b33ff',
  },
  {
    id: 'portfolioos',
    title: 'PortfolioOS',
    subtitle: 'This Portfolio',
    desc: 'A single-page portfolio with floating AI assistant, dark glassmorphism design, and smooth section transitions.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    image: '/src/assets/images/projects/portfolioos.jpg',
    color: '#6633ff',
  },
  {
    id: 'ctf-toolkit',
    title: 'CTF Toolkit',
    subtitle: 'Capture the Flag',
    desc: 'Personal CTF helper: hash cracking automator, steganography extractor, base-encoding one-liners, and wordlist manager bundled in a single CLI.',
    tags: ['Python', 'Bash', 'CLI', 'Crypto'],
    image: '/src/assets/images/projects/ctf-toolkit.jpg',
    color: '#8833ff',
  },
  {
    id: 'threatmap',
    title: 'ThreatMap',
    subtitle: 'Threat Intelligence',
    desc: 'Real-time global threat visualizer pulling live feeds from open-source intelligence databases, rendered on an interactive D3 world map.',
    tags: ['Vue.js', 'D3.js', 'OSINT', 'WebSockets'],
    image: '/src/assets/images/projects/threatmap.jpg',
    color: '#7733ee',
  },
]

// ─── Events ──────────────────────────────────────────────────────────────────
// Place actual event photos in src/assets/images/events/
// e.g. dict-summit.jpg, pycon-ph.jpg, devfest-cebu.jpg, hackforgov.jpg, it-congress.jpg, csmonth.jpg
export const EVENTS = [
  {
    id: 'dict-summit',
    name: 'DICT Cybersecurity Summit',
    location: 'Manila, Philippines',
    date: 'November 2024',
    image: '/src/assets/images/events/dict-summit.jpg',
    role: 'Delegate',
  },
  {
    id: 'pycon-ph',
    name: 'PyCon Philippines',
    location: 'Cebu City, Philippines',
    date: 'August 2024',
    image: '/src/assets/images/events/pycon-ph.jpg',
    role: 'Attendee',
  },
  {
    id: 'devfest-cebu',
    name: 'DevFest Cebu',
    location: 'Cebu City, Philippines',
    date: 'October 2024',
    image: '/src/assets/images/events/devfest-cebu.jpg',
    role: 'Attendee',
  },
  {
    id: 'hackforgov',
    name: 'HackForGov CTF',
    location: 'Online',
    date: 'June 2024',
    image: '/src/assets/images/events/hackforgov.jpg',
    role: 'Competitor',
  },
  {
    id: 'it-congress',
    name: 'IT Congress BSIT',
    location: 'University Campus',
    date: 'March 2024',
    image: '/src/assets/images/events/it-congress.jpg',
    role: 'Presenter',
  },
  {
    id: 'csmonth',
    name: 'National Cybersecurity Month',
    location: 'Cebu City, Philippines',
    date: 'October 2023',
    image: '/src/assets/images/events/csmonth.jpg',
    role: 'Volunteer',
  },
]

// ─── Chatbot seeded responses ────────────────────────────────────────────────
export const CHATBOT_RESPONSES = [
  "Drake is a BSIT student specializing in full-stack development and cybersecurity. He bridges clean frontend experiences with hardened backend systems.",
  "On the development side, Drake works with React, Vue, FastAPI, PHP, and multiple databases — MySQL, PostgreSQL, and Firebase.",
  "For cybersecurity, Drake uses Burp Suite, Nmap, Wireshark, and Metasploit. He participates in CTF competitions regularly.",
  "Drake's hobbies include boxing, sandbox gaming, reading, and building side projects. Discipline across the board.",
  "Drake is open to internships, freelance projects, and CTF team invitations. Use the Contact section to reach out.",
  "Currently studying in Cebu, Philippines. Subjects include Web Systems, Network Security, Database Design, and Software Engineering.",
]
