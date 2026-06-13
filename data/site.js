import {
  BadgeCheck,
  CalendarClock,
  Clock,
  Droplets,
  Dumbbell,
  LifeBuoy,
  MapPin,
  ParkingCircle,
  ShieldCheck,
  ShowerHead,
  Target,
  Trophy,
  Users,
  Waves,
} from "lucide-react";

export const academy = {
  name: "TRIC Sports Academy",
  location: "Tirupur",
  address: "TRIC Sports Academy, Tirupur, Tamil Nadu",
  directionsUrl: "https://maps.google.com/?q=TRIC%20Sports%20Academy%20Tirupur",
  timings: "5:30 AM - 7:00 PM",
  days: "Tuesday to Sunday",
  hourlyAccess: "Available based on pool schedule",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/facilities", label: "Facilities" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  {
    icon: Trophy,
    value: "Nearly 500",
    label: "Athletes Trained Every Year",
    detail: "Training scale across beginner, membership, and competitive programs.",
  },
  {
    icon: Users,
    value: "220",
    label: "Active Competitive Trainees",
    detail: "Swimmers currently preparing for competition-focused training.",
  },
  {
    icon: Waves,
    value: "25m",
    label: "International-Standard Pool",
    detail: "A full-length pool for learning, training, and regular practice.",
  },
  {
    icon: Clock,
    value: "5:30 AM - 7 PM",
    label: "Tuesday to Sunday",
    detail: "Daily pool access window for classes, members, and planned visits.",
  },
];

export const programs = [
  {
    id: "summer",
    icon: CalendarClock,
    title: "Summer Classes",
    type: "Seasonal learning",
    shortDescription: "For students joining a structured summer swimming program.",
    description:
      "Seasonal swimming classes for students who want a clear place to learn the basics.",
    cta: "Login to Apply",
    href: "/login",
  },
  {
    id: "membership",
    icon: Dumbbell,
    title: "Regular Membership",
    type: "Ongoing access",
    shortDescription: "For swimmers who want regular training, practice, and routine.",
    description:
      "Monthly membership for swimmers who want ongoing access and coaching support.",
    cta: "Login to Apply",
    href: "/login",
  },
  {
    id: "hourly",
    icon: Clock,
    title: "Hourly Swimming",
    type: "Hourly access",
    shortDescription: "For casual swimming or practice based on pool availability.",
    description:
      "Hourly pool access is available for casual swimming and practice based on schedule.",
    cta: "Contact TRIC",
    href: "/contact",
  },
];

export const facilities = [
  {
    icon: Waves,
    title: "25m International-Standard Pool",
    description: "A full-length pool for learning, laps, and regular practice.",
  },
  {
    icon: Droplets,
    title: "Water Filtration",
    description: "Maintained filtration supports a cleaner pool environment.",
  },
  {
    icon: ShieldCheck,
    title: "Coach Supervision",
    description: "Sessions are managed with coaching and supervision.",
  },
  {
    icon: BadgeCheck,
    title: "Changing Rooms",
    description: "Dedicated spaces for changing before and after swimming.",
  },
  {
    icon: ShowerHead,
    title: "Showers",
    description: "Shower facilities are available for swimmers.",
  },
  {
    icon: Users,
    title: "Parent Seating Area",
    description: "A waiting area for parents during student sessions.",
  },
  {
    icon: LifeBuoy,
    title: "Safety Equipment",
    description: "Safety equipment is available for responsible pool use.",
  },
  {
    icon: ParkingCircle,
    title: "Parking",
    description: "Parking support is available for visitors and families.",
  },
];

export const timingRows = [{ day: "Tuesday to Sunday", time: "5:30 AM - 7:00 PM" }];

export const heroImage = "/images/tric-pool-drone-shot.webp";

export const contactCards = [
  {
    icon: Clock,
    title: "Pool Timings",
    value: academy.days,
    detail: academy.timings,
  },
  {
    icon: Target,
    title: "Hourly Access",
    value: academy.hourlyAccess,
    detail: "Contact TRIC before planning your visit.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: academy.location,
    detail: academy.address,
  },
];
