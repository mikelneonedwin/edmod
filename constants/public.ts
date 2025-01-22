interface NavBarLinks {
  href: string;
  name: string;
  prefetch?: boolean;
}

export const navbarLinks = [
  {
    href: "/quiz" as const,
    name: "Play",
  },
  {
    href: "/leaderboards" as const,
    name: "Leaderboards",
  },
  {
    href: "/sign-in" as const,
    name: "Login",
    prefetch: true,
  },
] satisfies NavBarLinks[];
