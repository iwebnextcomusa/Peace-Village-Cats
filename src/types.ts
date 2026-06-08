export enum AdoptionStatus {
  AVAILABLE = "Available",
  REHABILITATION = "In Rehabilitation",
  ADOPTED = "Adopted",
  SPONSORED = "Sponsored"
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  status: AdoptionStatus;
  traits: string[];
  image: string;
  story: string;
  size: string;
  vaccinated: boolean;
  friendlyWith: string[];
}

export interface SuccessStory {
  id: string;
  title: string;
  animalName: string;
  species: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  adopterName: string;
  testimonial: string;
  date: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  commitment: string;
  requirements: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "Event" | "Education" | "Rescue Update";
  readTime: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  warning?: boolean;
}
