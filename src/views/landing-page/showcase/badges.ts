import type { StaticImageData } from "next/image";
import firstSteps from "@/images/badges/first-steps.png";
import curious from "@/images/badges/curious.png";
import onFire from "@/images/badges/on-fire.png";
import scholar from "@/images/badges/scholar.png";
import remixed from "@/images/badges/remixed.png";
import author from "@/images/badges/author.png";
import starTeacher from "@/images/badges/star-teacher.png";
import veteran from "@/images/badges/veteran.png";

type Badge = {
  name: string;
  image: StaticImageData;
  earned: boolean;
};

const badges: Badge[] = [
  { name: "First Steps", image: firstSteps, earned: true },
  { name: "Curious", image: curious, earned: true },
  { name: "On Fire", image: onFire, earned: true },
  { name: "Scholar", image: scholar, earned: true },
  { name: "Remixed", image: remixed, earned: false },
  { name: "Author", image: author, earned: false },
  { name: "Star Teacher", image: starTeacher, earned: false },
  { name: "Veteran", image: veteran, earned: false },
];

export { badges, type Badge };
