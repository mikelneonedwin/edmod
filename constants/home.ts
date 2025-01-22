import {
  BrainIcon,
  TimerIcon,
  TrophyIcon,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  icon: LucideIcon;
  content: string;
};

export const features: Feature[] = [
  {
    icon: TimerIcon,
    title: "Endless",
    content:
      "Answer as many questions as you can within the time limit. One wrong move and it's game over!",
  },
  {
    icon: BrainIcon,
    title: "Number Game Mode",
    content:
      "Progress through increasingly difficult levels. Each level brings more challenging questions.",
  },
  {
    icon: TrophyIcon,
    title: "Leaderboards",
    content:
      "Compete with others and climb the rankings. Can you make it to the top?",
  },
];
