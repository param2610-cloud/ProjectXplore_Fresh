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
  teamDetails: TeamDetails;
  teamUrldetails: TeamUrlDetails;
}
