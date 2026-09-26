import 'dotenv/config';
import mongoose from 'mongoose';
import Content from '../models/Content.js';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error('Set MONGODB_URI before running this script.');
}

const servicePages = [
  // Sales & Growth
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    type: 'page',
    status: 'draft',
    excerpt: 'Generate high-quality leads that convert into real revenue for your business.',
    body: '<h1>Lead Generation</h1><p>Generate high-quality leads that convert into real revenue for your business. Our proven lead generation strategies combine data-driven targeting with compelling creative to fill your pipeline.</p><h2>What We Offer</h2><ul><li>Multi-channel lead capture campaigns</li><li>Landing page optimisation</li><li>Lead nurturing sequences</li><li>CRM integration and reporting</li></ul><h2>Why It Works</h2><p>We focus on quality over quantity — every lead we deliver has been qualified and is ready to engage with your sales team.</p>',
    seoTitle: 'Lead Generation Services | COMET Marketing',
    seoDescription: 'Generate high-quality, revenue-ready leads with COMET\'s proven multi-channel lead generation strategies. Data-driven, results-focused.',
  },
  {
    slug: 'sales-enablement',
    title: 'Sales Enablement',
    type: 'page',
    status: 'draft',
    excerpt: 'Equip your sales team with the tools, content, and insights they need to close more deals.',
    body: '<h1>Sales Enablement</h1><p>Equip your sales team with everything they need to close more deals, faster. From training and content to CRM optimisation and automation, we help your team perform at their peak.</p><h2>Key Services</h2><ul><li>Sales process design and documentation</li><li>Sales collateral and pitch deck creation</li><li>CRM setup and workflow automation</li><li>Sales team training and coaching</li></ul>',
    seoTitle: 'Sales Enablement Services | COMET Marketing',
    seoDescription: 'Empower your sales team to close more deals with COMET\'s sales enablement services — tools, training, content, and CRM automation.',
  },
  {
    slug: 'conversion-rate-optimisation',
    title: 'Conversion Rate Optimisation',
    type: 'page',
    status: 'draft',
    excerpt: 'Turn more of your existing visitors into customers with data-backed CRO strategies.',
    body: '<h1>Conversion Rate Optimisation</h1><p>Stop leaving money on the table. Our CRO team analyses your website, identifies friction points, and implements proven changes that turn more visitors into paying customers.</p><h2>Our CRO Process</h2><ol><li>In-depth website audit and heatmap analysis</li><li>User journey mapping and friction identification</li><li>A/B and multivariate testing</li><li>Continuous iteration and reporting</li></ol>',
    seoTitle: 'Conversion Rate Optimisation | COMET Marketing',
    seoDescription: 'Increase your website\'s conversion rate with COMET\'s data-driven CRO services. More conversions from your existing traffic — guaranteed.',
  },
  // Search & AI
  {
    slug: 'seo',
    title: 'SEO',
    type: 'page',
    status: 'draft',
    excerpt: 'Rank higher on Google and drive consistent, compounding organic traffic to your website.',
    body: '<h1>Search Engine Optimisation (SEO)</h1><p>Sustainable growth starts with organic search. Our SEO team builds a bulletproof strategy covering technical SEO, on-page content, and authoritative link building to get you ranking where it matters.</p><h2>Our SEO Services</h2><ul><li>Technical SEO audit and remediation</li><li>Keyword research and content strategy</li><li>On-page optimisation (H1, H2, meta tags, schema)</li><li>Link building and digital PR</li><li>Monthly ranking and traffic reports</li></ul>',
    seoTitle: 'SEO Services | COMET Marketing',
    seoDescription: 'Rank higher on Google with COMET\'s proven SEO strategies. Technical SEO, content, and link building that drives compounding organic traffic.',
  },
  {
    slug: 'ai-voice-agent',
    title: 'AI Sales Voice Agent',
    type: 'page',
    status: 'draft',
    excerpt: 'Deploy an always-on AI voice agent that qualifies leads and books meetings around the clock.',
    body: '<h1>AI Sales Voice Agent</h1><p>Never miss a lead again. Our AI Voice Agents handle inbound calls, qualify prospects, answer FAQs, and book meetings directly into your sales team\'s calendar — 24/7, at scale.</p><h2>Features</h2><ul><li>Natural-language AI voice conversations</li><li>Real-time lead qualification and scoring</li><li>CRM and calendar integration</li><li>Full call transcription and analytics</li></ul>',
    seoTitle: 'AI Sales Voice Agent | COMET Marketing',
    seoDescription: 'Deploy an AI voice agent that qualifies leads and books meetings 24/7. COMET\'s AI Sales Voice Agent never misses a sales opportunity.',
  },
  {
    slug: 'aeo-ai-search',
    title: 'AEO / AI Search',
    type: 'page',
    status: 'draft',
    excerpt: 'Get your brand recommended by ChatGPT, Google AI, and other AI search engines.',
    body: '<h1>Answer Engine Optimisation (AEO) / AI Search</h1><p>The search landscape is changing fast. AEO is the new SEO. We optimise your brand and content to appear as the recommended answer in ChatGPT, Google AI Overviews, Perplexity, and more.</p><h2>Why AEO Matters</h2><p>Over 30% of searches now result in an AI-generated answer. Brands that are not optimised for AI search are invisible to this growing audience.</p><h2>What We Do</h2><ul><li>AI search visibility audit</li><li>Entity and structured data optimisation</li><li>Content re-purposing for AI answer engines</li><li>Monthly AI search position tracking</li></ul>',
    seoTitle: 'AEO & AI Search Optimisation | COMET Marketing',
    seoDescription: 'Get recommended by ChatGPT, Google AI, and Perplexity. COMET\'s AEO specialists optimise your brand for the AI search era.',
  },
  {
    slug: 'aeo-rank-tracker',
    title: 'AEO Rank Tracker',
    type: 'page',
    status: 'draft',
    excerpt: 'Track your brand\'s visibility and position across all major AI search engines in one dashboard.',
    body: '<h1>AEO Rank Tracker</h1><p>Know exactly where your brand stands in the AI search ecosystem. Our AEO Rank Tracker monitors your visibility across ChatGPT, Google AI Overviews, Perplexity, and more — giving you actionable data to stay ahead.</p><h2>What You Get</h2><ul><li>Daily AI search position monitoring</li><li>Competitor comparison and benchmarking</li><li>Trend analysis and alerts</li><li>Export-ready reports for stakeholders</li></ul>',
    seoTitle: 'AEO Rank Tracker | COMET Marketing',
    seoDescription: 'Track your AI search rankings across ChatGPT, Google AI, and Perplexity with COMET\'s AEO Rank Tracker — real-time, actionable data.',
  },
  // Paid Media
  {
    slug: 'google-ads',
    title: 'Google Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Get in front of customers actively searching for your product or service on Google.',
    body: '<h1>Google Ads Management</h1><p>Reach customers at the exact moment they are searching for what you offer. Our Google Ads specialists build and optimise campaigns across Search, Display, Shopping, and YouTube to maximise your return on ad spend.</p><h2>Our Google Ads Services</h2><ul><li>Search, Display, and Shopping campaigns</li><li>Conversion tracking and Google Analytics setup</li><li>Audience segmentation and remarketing</li><li>Weekly optimisation and monthly reporting</li></ul>',
    seoTitle: 'Google Ads Management | COMET Marketing',
    seoDescription: 'Maximise your Google Ads ROI with COMET\'s expert PPC management. Search, Display, Shopping, and YouTube campaigns that convert.',
  },
  {
    slug: 'linkedin-ads',
    title: 'LinkedIn Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Reach decision-makers and B2B audiences with precision LinkedIn advertising campaigns.',
    body: '<h1>LinkedIn Ads Management</h1><p>LinkedIn is the most powerful platform for B2B marketing. Our LinkedIn Ads team targets decision-makers by job title, industry, company size, and seniority to generate high-quality B2B leads.</p><h2>Ad Formats We Manage</h2><ul><li>Sponsored Content and Message Ads</li><li>Lead Gen Forms</li><li>Dynamic Ads and Text Ads</li><li>LinkedIn Retargeting and Matched Audiences</li></ul>',
    seoTitle: 'LinkedIn Ads Management | COMET Marketing',
    seoDescription: 'Target B2B decision-makers with precision LinkedIn Ads. COMET\'s LinkedIn specialists generate quality B2B leads that convert.',
  },
  {
    slug: 'facebook-ads',
    title: 'Facebook Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Reach and convert your ideal customers across Facebook and Instagram with expert ad management.',
    body: '<h1>Facebook Ads Management</h1><p>With billions of active users, Facebook and Instagram offer unparalleled reach. Our team builds creative, data-driven campaigns that drive awareness, leads, and sales across the Meta ecosystem.</p><h2>What We Do</h2><ul><li>Facebook and Instagram campaign strategy and setup</li><li>Custom and Lookalike Audience targeting</li><li>Creative testing and optimisation</li><li>Pixel tracking, retargeting, and full-funnel campaigns</li></ul>',
    seoTitle: 'Facebook & Instagram Ads Management | COMET Marketing',
    seoDescription: 'Drive leads and sales across Facebook and Instagram with COMET\'s expert Meta Ads management. Creative, data-driven campaigns that convert.',
  },
  {
    slug: 'youtube-ads',
    title: 'YouTube Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Engage your audience with compelling video ads on the world\'s largest video platform.',
    body: '<h1>YouTube Ads Management</h1><p>Video is the most engaging format online, and YouTube is where your audience watches. We create and manage YouTube ad campaigns that build brand awareness, generate leads, and drive conversions.</p><h2>YouTube Ad Formats</h2><ul><li>In-stream skippable and non-skippable ads</li><li>Bumper ads (6-second high-impact)</li><li>Discovery and masthead ads</li><li>YouTube remarketing campaigns</li></ul>',
    seoTitle: 'YouTube Ads Management | COMET Marketing',
    seoDescription: 'Reach your audience with powerful YouTube video ads. COMET manages YouTube advertising campaigns that build brand and drive real results.',
  },
  // Social & Marketplace
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    type: 'page',
    status: 'draft',
    excerpt: 'Build your brand, grow your audience, and drive engagement across all major social platforms.',
    body: '<h1>Social Media Marketing</h1><p>A strong social media presence builds trust, drives traffic, and keeps your brand top of mind. Our team handles your social strategy, content creation, scheduling, and community management across all major platforms.</p><h2>Platforms We Manage</h2><ul><li>Facebook and Instagram</li><li>LinkedIn (B2B)</li><li>TikTok and YouTube Shorts</li><li>X (Twitter) and Pinterest</li></ul>',
    seoTitle: 'Social Media Marketing Services | COMET Marketing',
    seoDescription: 'Build your brand and grow your audience with COMET\'s social media marketing. Strategy, content, and community management across all platforms.',
  },
  {
    slug: 'takealot-ads',
    title: 'Takealot Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Dominate South Africa\'s largest eCommerce marketplace with expert Takealot advertising.',
    body: '<h1>Takealot Ads Management</h1><p>Takealot is South Africa\'s biggest online retail platform. Our Takealot Ads specialists help you get your products in front of high-intent shoppers at the moment they are ready to buy.</p><h2>Our Takealot Services</h2><ul><li>Sponsored Product ad setup and management</li><li>Product listing optimisation and SEO</li><li>Budget and bid strategy management</li><li>Sales and ROAS reporting</li></ul>',
    seoTitle: 'Takealot Ads Management | COMET Marketing',
    seoDescription: 'Grow your Takealot sales with expert ad management from COMET. Sponsored Products, listing optimisation, and ROI-focused strategies.',
  },
  {
    slug: 'makro-ads',
    title: 'Makro Ads',
    type: 'page',
    status: 'draft',
    excerpt: 'Reach bulk buyers and retail shoppers on Makro\'s online marketplace.',
    body: '<h1>Makro Ads Management</h1><p>Makro\'s online marketplace connects you with bulk buyers and high-value retail shoppers. Our team manages your Makro advertising to maximise visibility, clicks, and sales on the platform.</p><h2>Services Included</h2><ul><li>Makro Sponsored Product campaigns</li><li>Product listing setup and content optimisation</li><li>Pricing and promotional strategy</li><li>Performance tracking and reporting</li></ul>',
    seoTitle: 'Makro Ads Management | COMET Marketing',
    seoDescription: 'Maximise your Makro marketplace sales with COMET\'s expert ad management. Get your products seen by high-intent bulk buyers.',
  },
  {
    slug: 'ai-marketing',
    title: 'AI Marketing',
    type: 'page',
    status: 'draft',
    excerpt: 'Leverage AI-powered tools and automation to scale your marketing output and improve results.',
    body: '<h1>AI Marketing</h1><p>Artificial intelligence is transforming marketing — and the brands that embrace it early will have an unbeatable advantage. COMET\'s AI Marketing services help you use AI tools, automation, and data intelligence to do more with less and outperform your competitors.</p><h2>What We Offer</h2><ul><li>AI-powered content creation and personalisation</li><li>Predictive audience targeting and segmentation</li><li>Marketing automation and workflow design</li><li>AI reporting, insights, and decision support</li></ul>',
    seoTitle: 'AI Marketing Services | COMET Marketing',
    seoDescription: 'Future-proof your marketing with COMET\'s AI Marketing services. AI content, automation, predictive targeting, and intelligent reporting.',
  },
];

await mongoose.connect(MONGODB_URI);
console.log('Connected to MongoDB. Seeding service pages...\n');

let created = 0;
let skipped = 0;

for (const page of servicePages) {
  const existing = await Content.findOne({ slug: page.slug });
  if (existing) {
    console.log(`  ⟳ SKIPPED  — "${page.title}" (slug: ${page.slug}) already exists.`);
    skipped++;
  } else {
    await Content.create(page);
    console.log(`  ✓ CREATED  — "${page.title}" (slug: ${page.slug})`);
    created++;
  }
}

console.log(`\nDone! Created: ${created}  |  Skipped (already existed): ${skipped}`);
await mongoose.disconnect();
