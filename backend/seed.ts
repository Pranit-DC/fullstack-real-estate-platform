import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db';
import Content from './models/Content';

interface SeedSection {
  section: string;
  data: Record<string, unknown>;
}

const sections: SeedSection[] = [
  {
    section: 'hero',
    data: {
      tagline: 'Thinking of a Fantastic Vicinity?',
      highlights: ['20+ Podium Luxurious Amenities', 'Spacious Balcony Homes'],
      projectName: 'Vighnaharta Infinity',
      units: [
        {
          type: 'Smart 1 BHK',
          originalPrice: '74.99 Lacs',
          currentPrice: '69.99 Lacs*',
          label: 'onwards',
        },
        {
          type: 'Premium 2 BHK',
          originalPrice: '1.05 Cr',
          currentPrice: '96.99 Lacs*',
          label: 'onwards',
        },
      ],
      address: 'Bldg. No. 223/224, Circle · Kannamwar Nagar I, Vikhroli (East)',
    },
  },
  {
    section: 'overview',
    data: {
      title: 'About Project',
      body: 'At Vighnaharta Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space. Built on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging.',
      quote:
        '"The moment I entered the house, it felt welcomed" — this feeling defines the privilege Vighnaharta Enclave offers. Thoughtfully designed with crafted amenities and timeless choices, the space resonates with the warmth and authenticity that you and your family truly deserve.',
      ctaLabel: 'Download Brochure',
    },
  },
  {
    section: 'connectivity',
    data: {
      title: 'Nearby Connectivity',
      subtitle: 'Everything you need is within reach.',
      items: [
        { category: 'Metro', name: 'Vikhroli Metro Station', distance: '0.5 km' },
        { category: 'Highway', name: 'Eastern Express Highway', distance: '1.2 km' },
        { category: 'School', name: 'Euro School', distance: '0.8 km' },
        { category: 'Hospital', name: 'Godrej Memorial Hospital', distance: '1.0 km' },
        { category: 'Mall', name: 'R-City Mall', distance: '3.5 km' },
        { category: 'Airport', name: 'Chhatrapati Shivaji Maharaj International Airport', distance: '12 km' },
      ],
    },
  },
  {
    section: 'amenities',
    data: {
      title: 'Amenities',
      subtitle:
        'Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach.',
      items: [
        { name: 'Gymnasium', icon: 'dumbbell' },
        { name: 'Kids Play Area', icon: 'playground' },
        { name: 'Swimming Pool', icon: 'pool' },
        { name: 'Jogging Track', icon: 'run' },
        { name: 'Yoga Deck', icon: 'yoga' },
        { name: 'Clubhouse', icon: 'club' },
        { name: 'Indoor Games', icon: 'games' },
        { name: 'Landscaped Garden', icon: 'garden' },
        { name: 'Senior Citizen Corner', icon: 'senior' },
      ],
    },
  },
  {
    section: 'about',
    data: {
      title: 'About Developer',
      body: "Vighnaharta Developers is more than just a real-estate company — we are dream-weavers, committed to building not just homes, but better lives. With a legacy of expert craftsmanship and a forward-thinking approach, we're transforming skylines and setting new standards in urban living.",
      stats: [
        { label: 'Projects', value: '6' },
        { label: 'Sq. ft. area developed', value: '1.32 LAC' },
        { label: 'Happy Families', value: '449+' },
        { label: 'Sq. ft. ongoing', value: '3.77 LAC' },
        { label: 'Sq. ft. Area Upcoming', value: '2.7 LAC' },
      ],
    },
  },
  {
    section: 'construction',
    data: {
      title: 'Construction Updates',
      updates: [
        { tower: 'Tower A', status: 'Under Construction', label: 'Know More' },
        { tower: 'Tower B', status: 'Completed', label: 'Know More' },
        { tower: 'Tower C', status: 'Completed', label: 'Know More' },
      ],
    },
  },
  {
    section: 'faq',
    data: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What makes Vighnaharta Group a trusted name in real estate in Vikhroli?',
          answer:
            'Vighnaharta Group has over a decade of experience delivering quality residential projects in Vikhroli with a strong track record of on-time possession and transparent dealings.',
        },
        {
          question: 'What types of residential projects does Vighnaharta Group offer?',
          answer:
            'We offer Smart 1 BHK and Premium 2 BHK configurations designed for modern urban families, with a focus on space efficiency and thoughtful amenities.',
        },
        {
          question: "Why should I invest in Vighnaharta Group's new projects in Vikhroli?",
          answer:
            "Vikhroli is one of Mumbai's fastest growing micro-markets with excellent metro connectivity, proximity to IT hubs, and strong appreciation potential.",
        },
        {
          question: 'How does Vighnaharta Group ensure quality and sustainability?',
          answer:
            'Every project is built with RERA compliance, quality-tested materials, and sustainable construction practices including rainwater harvesting and energy-efficient lighting.',
        },
        {
          question: 'How can I learn more about upcoming projects?',
          answer:
            'Use the Enquiry Now button on this page, download our brochure, or visit our site office at Bldg. No. 223/224, Kannamwar Nagar I, Vikhroli (East).',
        },
      ],
    },
  },
];

const seed = async (): Promise<void> => {
  await connectDB();

  for (const item of sections) {
    await Content.findOneAndUpdate(
      { section: item.section },
      { section: item.section, data: item.data },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Seeded: ${item.section}`);
  }

  console.log('Seeding complete.');
  await mongoose.connection.close();
};

seed().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
