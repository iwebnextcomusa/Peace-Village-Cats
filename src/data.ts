import { Animal, SuccessStory, VolunteerOpportunity, BlogPost, AdoptionStatus } from "./types";
import daisyImage from "./assets/images/daisy_mini_pig_1780948210356.png";

export const ANIMALS_DATA: Animal[] = [
  {
    id: "barnaby",
    name: "Barnaby",
    species: "Dog",
    breed: "Golden Retriever & Labrador Mix",
    age: "3 Years",
    gender: "Male",
    status: AdoptionStatus.AVAILABLE,
    traits: ["Active", "Water Lover", "Kid-Friendly", "Intelligent"],
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600",
    story: "Barnaby was found wandering near the Homosassa River, happy but hungry. He is an energy-filled companion who dreams of dock-jumping, swimming, and chasing tennis balls in a large fenced yard.",
    size: "Large (65 lbs)",
    vaccinated: true,
    friendlyWith: ["Dogs", "Children", "Needs social testing with cats"]
  },
  {
    id: "luna",
    name: "Luna",
    species: "Cat",
    breed: "Calico Domestic Mediumhair",
    age: "1 Year",
    gender: "Female",
    status: AdoptionStatus.AVAILABLE,
    traits: ["Gentle", "Lap Hugger", "Quiet", "Social"],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    story: "Luna was rescued from a tree line adjacent to the Homosassa Springs State Wildlife Park. She is an absolute cuddle bug who purrs the moment you lock eyes with her. Perfect for peaceful standard households.",
    size: "Small (8 lbs)",
    vaccinated: true,
    friendlyWith: ["Cats", "Children", "Quiet Dogs"]
  },
  {
    id: "copper",
    name: "Copper",
    species: "Reptile",
    breed: "Gopher Tortoise (Ambassador)",
    age: "8 Years",
    gender: "Male",
    status: AdoptionStatus.SPONSORED,
    traits: ["Steady", "Inquisitive", "Calm", "Fruit Enthusiast"],
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
    story: "Copper survived a severe vehicle collision in Citrus County which cracked his shell. After 6 months of delicate reconstruction care, he resides permanently with us as our senior educational ambassador. Sponsorship covers his nutritious custom diet.",
    size: "Medium (14 lbs)",
    vaccinated: false,
    friendlyWith: ["Respectful Humans", "Earthworms"]
  },
  {
    id: "pip-squeak",
    name: "Pip & Squeak",
    species: "Cat",
    breed: "Kitten Duo (Domestic Shorthair)",
    age: "4 Months",
    gender: "Male & Female",
    status: AdoptionStatus.AVAILABLE,
    traits: ["Playful", "Inseparable", "Hilarious", "Affectionate"],
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600",
    story: "This adorable bonded brother-sister pair were found huddled in an old barn in Homosassa. They spend their days racing up scratch poles, wrestling, and sleeping in an intertwined heart shape. Must be adopted together.",
    size: "Tiny (3 lbs each)",
    vaccinated: true,
    friendlyWith: ["Dogs", "Cats", "Children"]
  },
  {
    id: "cleo",
    name: "Cleo",
    species: "Wildlife",
    breed: "Common Raccoon (Rehab)",
    age: "6 Months",
    gender: "Female",
    status: AdoptionStatus.REHABILITATION,
    traits: ["Mischievous", "Dexterous", "Clever", "Nocturnal"],
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=600",
    story: "Orphaned raccoon kit rescued after severe Florida storms. Cleo is in intensive rehabilitation, learning foraging skills, climbing behaviors, and positive wildlife peer boundaries so she can be safely released this autumn.",
    size: "Small (5 lbs)",
    vaccinated: true,
    friendlyWith: ["Wildlife Conspecifics"]
  },
  {
    id: "apollo",
    name: "Apollo",
    species: "Wildlife",
    breed: "Eastern Screech Owl",
    age: "2 Years",
    gender: "Male",
    status: AdoptionStatus.SPONSORED,
    traits: ["Alert", "Regal", "Fierce", "Camera-Shy"],
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600",
    story: "Apollo was brought in with a permanent wing impairment that prevents sustained flight, meaning he cannot survive in the wild. He is sponsored to assist in public community school presentations promoting habitat conservation.",
    size: "Small (7 ounces)",
    vaccinated: false,
    friendlyWith: ["Trained Educators"]
  },
  {
    id: "daisy",
    name: "Daisy",
    species: "Farm Sanctuary",
    breed: "Juliana Mini Pig",
    age: "3 Years",
    gender: "Female",
    status: AdoptionStatus.SPONSORED,
    traits: ["Sassy", "Brilliant", "Belly-Rub Addict", "Social"],
    image: daisyImage,
    story: "Daisy was surrendered when her previous owners realized 'mini pigs' grow to be active and curious 80-pound foragers. She loves organic apples, rolling in sunscreen-infused mud, and bossing the sanctuary sheep around.",
    size: "Medium (75 lbs)",
    vaccinated: true,
    friendlyWith: ["Farms Animals", "Patient Humans"]
  },
  {
    id: "willow",
    name: "Willow",
    species: "Wildlife",
    breed: "White-tailed Deer",
    age: "18 Months",
    gender: "Female",
    status: AdoptionStatus.REHABILITATION,
    traits: ["Graceful", "Skittish", "Rehabilitating", "Elegant"],
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&q=80&w=600",
    story: "Willow was found tangled in razor wire as a young fawn. After multiple successful skin graft procedures conducted by our volunteer veterinary team, she is entering her final herd integration stage prior to remote state wilderness release.",
    size: "Large (90 lbs)",
    vaccinated: true,
    friendlyWith: ["Wild Deer her family"]
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "maverick",
    title: "From Wilderness Stray to Certified Therapy Companion",
    animalName: "Maverick",
    species: "Dog",
    beforeImg: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600",
    description: "Maverick was found deep in the Homosassa marshland – hypothermic, severely malnourished, and terrified of human presence. Over three months of tender physical rehabilitation and trust conditioning at Pace Village Cats Sanctuary, Maverick blossomed. He became incredibly responsive, showing high empathetic skill.",
    adopterName: "Dr. Evelyn Cartwright",
    testimonial: "Maverick is now a certified visiting therapy dog at the local Homosassa senior community home! He brings smiles to dozens of residents every week. I cannot thank the Pace Village Cats team enough for recognizing his special soul and saving his life.",
    date: "March 2026"
  },
  {
    id: "oliver",
    title: "Rescued from Road Hazard to Loving Family Mascot",
    animalName: "Oliver",
    species: "Cat",
    beforeImg: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600",
    description: "Found clinging to a truck axle at a highway gas station in Florida, small Oliver was covered in engine grease, oil, and had a severe leg injury. Our clinical team performed emergency orthopedic pin setting, and a foster family gave him round-the-clock feeding.",
    adopterName: "The Miller Family",
    testimonial: "Oliver doesn’t limp at all now! He zooms around our home, sleeps at the foot of our kids' bed, and oversees all kitchen activities. He is the joyful heart of our household. He of course loves showing off in front of guests!",
    date: "January 2026"
  }
];

export const VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: "habitat",
    title: "Sanctuary Maintenance & Trail Building",
    description: "Help construct robust, safe animal enclosures, plant native Florida flora, and maintain our visiting woodland trails in Homosassa. Physical labor involved.",
    commitment: "Flexible (Weekends preferred, 3-4 hours/week)",
    requirements: [
      "Must be 16 years or older with signed waiver",
      "Comfortable working outdoors in warm Florida weather",
      "Ability to lift 25 lbs"
    ]
  },
  {
    id: "companion",
    title: "Animal Socialization & Rescue Companion",
    description: "Spend valuable time grooming, brushing, playing with, and walking our domestic safe adoptables. This builds trust and dramatically increases their adoptability rates.",
    commitment: "Consistent (At least one 2-hour shift per week)",
    requirements: [
      "Completed Rescue Companion Orientation training (2 hours)",
      "Infinite patience and warm, reassuring vocal cues",
      "Basic understanding of dog/cat body language cues"
    ]
  },
  {
    id: "wildlife",
    title: "Wildlife Rehabilitation Assistant",
    description: "Directly assist state-licensed sub-permittee rehabbers with food preparation (chopping fruit, thawing specialized diets), cage cleaning, and record-keeping for orphaned wildlife.",
    commitment: "Commitment-heavy (Minimum 10 hours/week, 3 month trial)",
    requirements: [
      "Must be 18 years or older",
      "Up-to-date Tetanus vaccination",
      "Strict compliance with non-interaction policies to prevent wildlife habituation"
    ]
  },
  {
    id: "outreach",
    title: "Community Outreach & Education Leader",
    description: "Represent Pace Village Cats Sanctuary at local Citrus County elementary schools, farmer's markets, and events to conduct interactive ecological and welfare discussions.",
    commitment: "Event-based (1-2 weekend events per month)",
    requirements: [
      "Strong verbal communication and public speaking confidence",
      "Passionate about Florida native ecosystems and animal welfare laws",
      "Comfortable handling educational animal ambassadors (like Copper)"
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Living in Harmony with Sandhill Cranes in Citrus County",
    excerpt: "Florida's spectacular Sandhill Cranes are majestic neighbors. Learn the essential dos and don'ts of protecting their nesting zones.",
    content: "Sandhill Cranes are famous for their elegant mating dances, trumpet-like calls, and lifelong faithful pair bonds. As Citrus County development expands, our paths cross more frequently. Feeding cranes remains strictly illegal under Florida law, as it habituates them to highway zones where they face severe injury risk. Learn how keeping a respectful distance of 30 feet, slowing down in residential zones, and planting safe garden cover protects their offspring.",
    date: "May 24, 2026",
    category: "Education",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "post-2",
    title: "Spring Baby Wildlife Rush: What to do if you find a fledgling",
    excerpt: "Before picking up that cute little bird or squirrel on the ground, follow our quick expert assessment guide to prevent accidental kidnapping.",
    content: "Our Homosassa wildlife clinic receives dozens of 'kidnapped' babies every spring! In most cases, parent birds are hiding nearby, encouraging their fledglings to fly. Follow this chain of assessment: Is the bird feathered? (If yes, it is a fledgling; leave it be, keep dogs away). Is it unfeathered or injured? (If yes, place it in a dark, warm ventilated box and contact our clinic immediately). Do not offer food or water directly as it can cause fatal aspiration.",
    date: "April 12, 2026",
    category: "Rescue Update",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "post-3",
    title: "Announcing the Pace Village Cats Retro-Future Benefit Gala",
    excerpt: "Join us this September under the laser lights for an immersive evening supporting rehabilitative medicine.",
    content: "We are thrilled to announce our major fundraising event of the year! Combining futuristic aesthetic installations, a local organic vegan menu, and inspiring success histories, our gala seeks to raise $45,000 to construct our new sea-turtle and shorebird aquatic rehab tank. Tickets go on sale next Monday starting at $75, featuring silent art auctions from Homosassa and Ocala painters.",
    date: "June 2, 2026",
    category: "Event",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600"
  }
];
