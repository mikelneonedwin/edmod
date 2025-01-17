import type { PluginsConfig } from "tailwindcss/types/config";
import type { ColumnType, Generated } from "kysely";

declare module "tailwindcss-animate" {
  const plugin: PluginsConfig;
  export default plugin;
}

export {};

interface UserTable {
  id: string;
  name: string;
  img: string | null;
}

interface MarathonResultTable {
  id: Generated<number>;
  user_id: string;
  duration: number;
  category: string;
  created_at: ColumnType<Date, string | undefined, never>;
  total_score: number;
}

interface ProgressResultTable {
  id: Generated<number>;
  user_id: string;
  attempted_questions: number;
  total_questions: number;
}
