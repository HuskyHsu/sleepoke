export type Pokemon = {
  pid: string;
  name: string;
  type: string;
  sleep_type: string;
  specialty: string;
  berry: string;
  berry_quantity: number;
  skill: string;
  skill_description: string;
  base_frequency: string;
  carry_limit: number;
  friendship_points_needed: number;
  recruit_experience: number;
  recruit_shards: number;
  ingredients: string[];
  location: string[];
};
