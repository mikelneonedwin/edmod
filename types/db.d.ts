import type { Generated, Insertable, JSONColumnType, Selectable } from "kysely";

export {};

interface UserTable {
  user_id: string;
  name: string;
  img: string | null;
  email: string;
}

interface TopicPreferenceTable {
  id: Generated<number>;
  name: string;
  user_id: string;
}

interface SocialsTable {
  id: Generated<number>;
  user_id: string;
  platform:
    | "whatsapp"
    | "facebook"
    | "x"
    | "email"
    | "github"
    | "tiktok"
    | "youtube"
    | "website";
  value: string;
}

interface QuizTable {
  quiz_id: Generated<number>;
  name: string;
  user_description: string;
  ai_description: string;
  tags: JSONColumnType<string[]>;
}

interface QuestionsTable {
  question_id: Generated<number>;
  question: string;
  correct_option: string;
  options: JSONColumnType<{
    [option: string]: string;
  }>;
  quiz_id: number;
  level: number;
}

interface TagsTable {
  id: Generated<number>;
  name: string;
  tags: JSONColumnType<string[]>;
}

// for endless, this records the highscore
// for campain, this records the total accumulated scores
interface RanksTable {
  rank_id: Generated<number>;
  quiz_id: string;
  type: "campaign" | "endless";
  user_id: string;
  score: string;
}

// this records the level the user is in
interface CampainTeirTable {
  tier_id: Generated<number>;
  quiz_id: string;
  user_id: string;
  level: number;
}

declare global {
  interface Database {
    users: UserTable;
    socials: SocialsTable;
    topic_prefs: TopicPreferenceTable;
    questions: QuestionsTable;
    tags: TagsTable;
    ranks: RanksTable;
    tiers: CampainTeirTable;
  }

  type User = Selectable<UserTable>;
  type NewUser = Insertable<UserTable>;
}
