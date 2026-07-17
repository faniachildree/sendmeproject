// content.jsx — single source of editable site content + CMS store.
// All page copy the CMS can edit lives here. Overrides are saved to
// localStorage and deep-merged over these defaults, so edits persist in the
// browser and can be exported/imported as JSON.

const DEFAULT_CONTENT = {
  site: {
    tagline: 'Mobilizing humanitarian assistance, leadership development, service initiatives, and collaborative outreach.',
    motto: 'Send Me, I\u2019ll Go.',
    email: 'jennifer@sendmeproject.org',
    web: 'www.sendmeproject.org',
    location: 'Based in Arkansas, USA \u00b7 Global Reach',
    legal: 'Send Me Project is a recognized 501(c)(3) nonprofit organization. EIN 41-4494029.',
    facebook: 'https://www.facebook.com/profile.php?id=61567987611017',
    instagram: '#',
  },

  home: {
    heroEyebrow: 'Humanitarian Aid \u00b7 Leadership \u00b7 Outreach',
    heroSub: 'Mobilizing humanitarian assistance, leadership development, service initiatives, and collaborative outreach.',
    pillarsBanner: 'Local Heart. Arkansas Roots. Global Impact.',
    missionHeading: 'More than an organization. A people choosing to respond.',
    missionBody1: 'Send Me Project exists to bring hope, practical support, leadership development, and compassion to communities locally and around the world \u2014 from feeding programs and children\u2019s outreach to supporting families and underserved communities internationally.',
    missionBody2: 'Every step is about saying yes to the call to go.',
    quote: 'Hope is more than encouragement. It is a commitment to act. Every project we undertake is driven by the belief that sustainable change begins with people willing to serve.',
    quoteCite: 'The Send Me Project',
    wwTitle: 'Nationally Rooted. Globally Engaged.',
    wwSub: 'Mobilizing aid where it\u2019s needed most \u2014 meeting tangible needs while building relationships that foster dignity, stability, and resilience.',
    impactEyebrow: 'Building Something Eternal',
    impactTitle: 'Growing with integrity, in the open',
    impactSub: 'With integrity. With excellence. With purpose. Here\u2019s exactly where we are today.',
  },

  cta: {
    eyebrow: 'Compassion. Action. Impact.',
    heading: 'Some opportunities are bigger than one person.',
    body: 'Whether you help send or choose to be sent \u2014 every gift, every connection, every action counts.',
  },

  about: {
    storyHeading: 'From a livestream message to a movement.',
    storyLede: 'What began as a desperate message during a Friday night livestream became an opportunity to respond with compassion in real time.',
    storyBody1: 'A family in Uganda reached out in despair \u2014 facing severe hardship, no food, and the pain of feeling hopeless. Our team verified their situation, connected with trusted contacts on the ground, and confirmed the need. The board approved humanitarian aid assistance for the household, providing food support, housing assistance, and immediate stabilization for the children and family.',
    storyBody2: 'That moment is a reminder that technology, compassion, and responsible action can work together to reach people across the world who would otherwise remain unseen. It marked one of the first humanitarian outreach seeds planted by Send Me Project into the nations.',
    storyImage: 'assets/story-hands.png',
    storyQuote: 'You are the light in our darkness.',
    storyQuoteCite: 'A Uganda Family',
    mission: 'The Send Me Project exists to transform compassion into measurable impact by equipping leaders, mobilizing volunteers, and delivering sustainable humanitarian solutions that strengthen communities across the globe.',
    vision: 'To become a trusted catalyst for lasting change by uniting people, organizations, and communities around shared purpose, measurable impact, and sustainable transformation.',
    partnership: 'We cultivate strategic relationships that connect people, organizations, and resources to accomplish what none could achieve alone.',
    faithHeading: 'Mission minded and faith rooted.',
    faithQuote: 'Real impact begins where convenience ends. It belongs to those who choose responsibility over comfort, action over intention, and lasting solutions over temporary relief.',
    faithCite: 'The Send Me Project',
  },

  outcomes: [
    ['eye', 'See the Need'],
    ['hands', 'Answer the Call'],
    ['users', 'Strengthen Communities'],
    ['globe', 'Impact That Lasts'],
  ],

  board: [
    {
      id: 'jennifer', name: 'Jennifer Bauman', role: 'Founder & President',
      photo: 'assets/board/jennifer.jpeg', initials: 'JB',
      quote: 'Nationally rooted. Globally engaged.',
      bio: 'With more than 20 years of experience in outreach, organizational leadership, and community engagement, Jennifer has collaborated with organizations and leaders across the United States, Brazil, Cuba, Panama, Peru, and other underserved regions. She founded Send Me Project to connect resources, partnerships, and opportunities that empower communities and create lasting local and global impact.',
      tags: ['Outreach', 'Leadership', '20+ years'],
    },
    {
      id: 'katie', name: 'Katie Ramsey', role: 'Director of Missions',
      photo: 'assets/board/katie.png', initials: 'KR',
      quote: 'Creating pathways for young leaders to serve with purpose.',
      bio: 'Katie brings experience in service coordination, leadership development, and nonprofit operations, supporting youth and young adults participating in humanitarian and international service. She helps oversee volunteer engagement, partnership support, fundraising, and field logistics \u2014 building sustainable pathways for young leaders to serve with professionalism and purpose.',
      tags: ['Volunteer Coordination', 'Field Logistics', 'Fundraising'],
    },
    {
      id: 'melissa', name: 'Melissa Strother', role: 'Board Member',
      photo: 'assets/board/melissa.png', initials: 'MS',
      quote: 'Building lasting value for individuals, organizations, and communities.',
      bio: 'An entrepreneur, creative strategist, and education advocate, Melissa is a graduate of Auburn University with a career spanning design, product development, and global manufacturing partnerships. She currently serves on her local county school board and is passionate about building a legacy of integrity, creativity, leadership, and service.',
      tags: ['Creative Strategy', 'Product Development', 'Education Advocate'],
    },
    {
      id: 'amanda', name: 'Amanda Holmes', role: 'Board Member',
      photo: 'assets/board/amanda.png', initials: 'AH',
      quote: 'A heart to encourage others through faith, compassion, and servant leadership.',
      bio: 'A devoted wife, mother, and homeschool educator, Amanda has served in ministry leadership since 2011, providing organizational support and vision for community initiatives. Her passion for missions has taken her to Africa, Cuba, and Brazil \u2014 supporting orphan care, sustainable development, discipleship, and community outreach.',
      tags: ['Education', 'Missions', 'Community'],
    },
  ],

  regions: [
    {
      id: 'arkansas', name: 'Arkansas, USA', flag: 'US', kind: 'Home Base', status: 'Active',
      lon: -92.3, lat: 34.7,
      headline: 'Nationally rooted',
      body: 'Our home base, where supplies are gathered, partnerships are built, and teams are mobilized. Outreach teams prepare humanitarian aid shipments and assemble clothing and essentials for vulnerable communities abroad.',
      facts: [['Local', 'Resource mobilization &amp; team prep'], ['Role', 'Sending hub for global outreach']],
    },
    {
      id: 'brazil', name: 'Brazil', flag: 'BR', kind: 'Active Initiative', status: 'Funding',
      lon: -49, lat: -13,
      headline: 'Community feeding & child outreach',
      body: 'We are pursuing funding for a long-standing community feeding initiative providing approximately 3,000+ meals every month, and preparing humanitarian aid shipments providing clothing support for underprivileged children and infants \u2014 in partnership with Rick Bonfim Ministries.',
      facts: [['Goal', '3,000+ meals every month'], ['Focus', 'Clothing for children &amp; infants'], ['Partner', 'Rick Bonfim Ministries']],
    },
    {
      id: 'uganda', name: 'Uganda', flag: 'UG', kind: 'Relief Delivered', status: 'Active',
      lon: 32.5, lat: 1.3,
      headline: 'Humanitarian relief initiative',
      body: 'One of our first humanitarian outreach seeds planted into Africa. After verifying a family\u2019s crisis through trusted contacts on the ground, the board approved emergency assistance \u2014 providing food support, housing assistance, and immediate stabilization for the children and family.',
      facts: [['Provided', 'Food, housing &amp; stabilization'], ['Verified', 'Trusted contacts on the ground'], ['Milestone', 'First outreach into Africa']],
    },
    {
      id: 'panama', name: 'Panama', flag: 'PA', kind: 'Partner Region', status: 'Planning',
      lon: -80.0, lat: 8.8,
      headline: 'Outreach & leadership partnerships',
      body: 'Building on long-standing relationships across Central America, we are developing partnerships that connect people, resources, and leadership development to underserved communities in Panama.',
      facts: [['Focus', 'Partnerships &amp; leadership'], ['Region', 'Central America'], ['Stage', 'Relationship building']],
    },
    {
      id: 'cameroon', name: 'Cameroon', flag: 'CM', kind: 'Emerging Outreach', status: 'Planning',
      lon: 12.4, lat: 5.7,
      headline: 'Humanitarian outreach in Central Africa',
      body: 'An emerging outreach region where we are cultivating trusted contacts and assessing needs, so that future humanitarian assistance can be delivered responsibly and with dignity.',
      facts: [['Focus', 'Needs assessment &amp; aid'], ['Region', 'Central Africa'], ['Stage', 'Early outreach']],
    },
  ],

  transparency: {
    banner: 'Send Me Project is now a recognized 501(c)(3) public charity (effective February 25, 2026). We remain committed to transparent reporting as we grow \u2014 here\u2019s exactly where we are today.',
    stats: [
      ['15+', 'Financial gifts received &amp; growing'],
      ['4', 'Nations reached \u2014 Brazil, Uganda, Panama &amp; Cameroon'],
      ['Approved', '501(c)(3) public charity \u00b7 EIN 41-4494029'],
      ['100%', 'Commitment to open reporting'],
    ],
    ein: '41-4494029',
    effective: 'February 25, 2026',
    charityStatus: '170(b)(1)(A)(vi)',
    docStatus: 'Approved',
  },

  contact: {
    title: 'Purpose Starts with Connection.',
    sub: 'From humanitarian response to strategic partnerships, we connect people, resources, and opportunities that create lasting impact.',
    connectHeading: 'Reach Out. We\u2019ll Reach Back.',
    globalHeading: 'Every Message Matters.',
    globalBody: 'Messages reach us in any language. Choose your region in the form and we\u2019ll route your message to the right part of the team.',
  },

  shop: {
    heroTitle: 'Shop with Purpose',
    heroSub: 'Every purchase helps mobilize humanitarian assistance, leadership, and outreach. Wear the mission \u2014 and help send hope.',
    note: 'Our shop is launching soon. Products below are a preview \u2014 checkout will be connected before launch. To pre-order or partner, reach out any time.',
    products: [
      { id: 'p1', name: '\u201cSend Me\u201d Tee', price: '$28', desc: 'Soft cotton tee with the Send Me Project wordmark. Wear the calling.', tag: 'Apparel', img: '' },
      { id: 'p2', name: 'From Arkansas to the Nations Hoodie', price: '$52', desc: 'Cozy fleece hoodie featuring the globe emblem and motto.', tag: 'Apparel', img: '' },
      { id: 'p3', name: 'Globe Emblem Cap', price: '$24', desc: 'Embroidered gold emblem on a structured navy cap.', tag: 'Accessories', img: '' },
      { id: 'p4', name: 'Insulated Tumbler', price: '$32', desc: 'Keep hope warm. 20oz stainless tumbler with brand mark.', tag: 'Drinkware', img: '' },
      { id: 'p5', name: 'Canvas Tote', price: '$18', desc: 'Heavyweight tote for carrying essentials \u2014 and the message.', tag: 'Accessories', img: '' },
      { id: 'p6', name: 'Sponsor a Meal Box', price: '$40', desc: 'Not merch \u2014 impact. Funds a box of meals toward our Brazil initiative.', tag: 'Give', img: '' },
    ],
  },

  pictures: {
    heroTitle: 'Moments from the Field',
    heroSub: 'Faces, hands, and places behind the mission. Real stories of compassion, action, and impact from Arkansas to the nations.',
    videoUrl: '',
    videoCaption: 'Add a story video \u2014 paste a YouTube or Vimeo link in the CMS.',
    images: [
      { id: 'g1', caption: 'Aid delivered \u2014 Brazil' },
      { id: 'g2', caption: 'Community feeding initiative' },
      { id: 'g3', caption: 'Relief for a family \u2014 Uganda' },
      { id: 'g4', caption: 'Preparing shipments \u2014 Arkansas' },
      { id: 'g5', caption: 'Leadership & outreach team' },
      { id: 'g6', caption: 'Hope for the next generation' },
    ],
  },
};

// ---------------- store ----------------
(function () {
  const KEY = 'smp_content_v1';
  const subs = new Set();
  function loadOv() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  let overrides = loadOv();

  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  function merge(base, ov) {
    if (!isObj(base)) return ov === undefined ? base : ov;
    const out = { ...base };
    if (!isObj(ov)) return out;
    for (const k in ov) out[k] = isObj(base[k]) && isObj(ov[k]) ? merge(base[k], ov[k]) : ov[k];
    return out;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(overrides)); } catch (e) {} subs.forEach((fn) => fn()); }

  function getContent() { return merge(DEFAULT_CONTENT, overrides); }
  function setPath(path, value) {
    const keys = Array.isArray(path) ? path : String(path).split('.');
    let node = overrides;
    for (let i = 0; i < keys.length - 1; i++) { const k = keys[i]; if (!isObj(node[k])) node[k] = {}; node = node[k]; }
    node[keys[keys.length - 1]] = value;
    save();
  }
  function resetContent() { overrides = {}; try { localStorage.removeItem(KEY); } catch (e) {} subs.forEach((fn) => fn()); }
  function importContent(obj) { overrides = obj && typeof obj === 'object' ? obj : {}; save(); }
  function exportContent() { return JSON.stringify(getContent(), null, 2); }
  function hasOverrides() { return Object.keys(overrides).length > 0; }
  function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }

  function useContent() {
    const [, force] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => subscribe(force), []);
    return getContent();
  }

  Object.assign(window, {
    DEFAULT_CONTENT, getContent, setContentPath: setPath, resetContent,
    importContent, exportContent, hasContentOverrides: hasOverrides,
    subscribeContent: subscribe, useContent,
  });
})();
