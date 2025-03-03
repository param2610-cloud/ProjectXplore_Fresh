import { team_project_record, Teams, Users } from "./INTERFACE";

export interface TeamDetails {
  team_id: string;
  team_name: string;
  team_author_id: string;
  objective: string;
  profile_pic_link: string;
}

export interface TeamUrlDetails {
  id: string;
  team_id: string;
  team_author_id: string;
  url: string;
  status: boolean;
  req_sent_user_id: string | null;
  res_status: string | null;
}

export interface TeamData {
  teamDetails: Teams;
  teamUrldetails: TeamUrlDetails;
}

export interface GlobalTeam {
  team_id: string;
  team_name: string;
  team_author_id: string;
  objective: string;
  profile_pic_link: string;
  achievements: Achievement[];
  team_member_roles: TeamMemberRole[];
  users:Users;
  team_project_record:team_project_record[];
}

interface Achievement {
  achievement_id: string;
  team_id?: string;
  achievement_name: string;
  achievement_description?: string;
  image_link?: string;
  useful_link?: string;
}

interface TeamMemberRole {
  member_role_id: string;
  team_id?: string;
  user_id?: string;
  role_name?: string;
}
