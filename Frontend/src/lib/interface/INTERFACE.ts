export interface Achievements {
    achievement_id: string;
    team_id?: string;
    achievement_name: string;
    achievement_description?: string;
    image_link?: string;
    useful_link?: string;
    teams?: Teams;
}

export interface Answers {
    answer_id: string;
    issue_id?: string;
    user_id?: string;
    answer_text?: string;
    timestamp?: Date;
    votes?: number;
    is_accepted?: boolean;
    issues?: Issues;
    users?: Users;
}

export interface ChatMessages {
    message_id: string;
    team_id?: string;
    user_id?: string;
    message_text?: string;
    timestamp?: Date;
    teams?: Teams;
    users?: Users;
}

export interface CollaborationRequestReviews {
    review_id: string;
    request_id?: string;
    reviewer_id?: string;
    collaborator_id?: string;
    review_status?: string;
    review_comments?: string;
    timestamp?: Date;
    users_collaborator?: Users;
    collaboration_requests?: CollaborationRequests;
    users_reviewer?: Users;
}

export interface CollaborationRequests {
    request_id: string;
    idea_id?: string;
    user_id?: string;
    request_text?: string;
    domain_expertise_required?: string;
    status?: string;
    timestamp?: Date;
    collaboration_request_reviews: CollaborationRequestReviews[];
    ideas?: Ideas;
    users?: Users;
}

export interface Comments {
    comment_id: string;
    parent_id?: string;
    user_id?: string;
    comment_text?: string;
    timestamp?: Date;
    votes?: number;
    users?: Users;
}

export interface Features {
    feature_id: string;
    feature_name: string;
    feature_details?: string;
    project_id?: string;
    projects?: Projects;
    steps: Steps[];
}
export interface idea_comments{
    id         :string ;
  comment_id :string;
  idea_id    :string;
  comments:Comments;
}
// export interface project_comments{
//     id         :string ;
//   comment_id :string;
//   project_id    :string;
//   comments:Comments[]
// }

export interface Ideas {
    idea_id: string;
    user_id?: string;
    idea_name?: string;
    idea_text?: string;
    image_link?: string[];
    video_link?: string[];
    docs_link?:string[];
    timestamp?: Date;
    collaboration_requests: CollaborationRequests[];
    users?: Users;
    idea_impressions:idea_impressions[];
    idea_comments:idea_comments[];
    usefull_links:string[];
}

export interface Impressions {
    impression_id: string;
    user_id?: string;
    target_id?: string;
    target_type?: string;
    impression_type?: string;
    timestamp?: Date;
    users?: Users;
}

export interface Institutions {
    institution_id: string;
    name: string;
    address?: string;
    institutionVerification: any[];
}

export interface Interests {
    interest_id: string;
    interest_name: string;
    user_interests: UserInterests[];
}

export interface IssueTags {
    issue_tag_id: string;
    issue_id?: string;
    tag_id?: string;
    issues?: Issues;
    tags?: Tags;
}

export interface Issues {
    issue_id: string;
    user_id?: string;
    title: string;
    description?: string;
    timestamp?: Date;
    status?: string;
    votes?: number;
    answers: Answers[];
    issue_tags: IssueTags[];
    users?: Users;
}

export interface Languages {
    language_id: string;
    language_name: string;
}

export interface Mentors {
    mentor_id: string;
    mentor_name: string;
    mentor_details?: string;
    projects: Projects[];
}

export interface ProjectCategories {
    project_category_id: string;
    project_id?: string;
    language_id?: string;
    software_id?: string;
    projects?: Projects;
}

export interface Projects {
    project_id: string;
    description?: string;
    project_name?: string;
    duration?: string;
    mentor_details?: string;
    reference_text?: string;
    demo_link?: string;
    features: Features[];
    project_categories: ProjectCategories[];
    mentors?: Mentors;
    user_project_track: user_project_track[];
}

export interface Roles {
    role_id: string;
    label: string;
    users: Users[];
}

export interface RoomChatMessages {
    room_message_id: string;
    room_id?: string;
    user_id?: string;
    message_text?: string;
    timestamp?: Date;
    rooms?: Rooms;
    users?: Users;
}

export interface RoomMemberRoles {
    room_member_role_id: string;
    room_id?: string;
    user_id?: string;
    role_name?: string;
    rooms?: Rooms;
    users?: Users;
}

export interface RoomTaskList {
    room_task_id: string;
    room_id?: string;
    task_title: string;
    task_description?: string;
    due_date?: Date;
    status?: string;
    assigned_to_user_id?: string;
    users?: Users;
    rooms?: Rooms;
}

export interface Rooms {
    room_id: string;
    room_name: string;
    objective?: string;
    profile_pic_link?: string;
    room_member: RoomMemberRoles[];
    room_task_list: RoomTaskList[];
}

export interface Skills {
    skill_id: string;
    skill_name: string;
    user_skills: UserSkills[];
}

export interface Software {
    software_id: string;
    software_name: string;
}

export interface Steps {
    step_id: string;
    input?: string;
    process?: string;
    output?: string;
    useful_link: string[];
    features_id?: string;
    features?: Features;
}

export interface Tags {
    tag_id: string;
    tag_name: string;
    issue_tags: IssueTags[];
}

export interface TeamMemberRoles {
    member_role_id: string;
    team_id?: string;
    user_id?: string;
    role_name?: string;
    teams?: Teams;
    users?: Users;
}

export interface Teams {
    team_id: string;
    team_name: string;
    team_author_id?: string;
    objective?: string;
    profile_pic_link?: string;
    achievements: Achievements[];
    chat_messages: ChatMessages[];
    team_member_roles: TeamMemberRoles[];
    users?: Users;
    team_request_response_record: team_request_response_record[];
}

export interface UserInterests {
    user_id: string;
    interest_id: string;
    interests: Interests;
    users: Users;
}

export interface UserSkills {
    user_id: string;
    skill_id: string;
    skills: Skills;
    users: Users;
}

export interface Users {
    user_id: string;
    full_name?: string;
    role_id?: string;
    email: string;
    phone_number?: string;
    username: string;
    password: string;
    refreshToken?: string;
    date_of_birth?: Date;
    address?: string;
    profile_picture_link?: string;
    institution_id?: string;
    team_id?: string;
    answers: Answers[];
    chat_messages: ChatMessages[];
    collaboration_request_reviews_collaborator_idTousers: CollaborationRequestReviews[];
    collaboration_request_reviews_reviewer_idTousers: CollaborationRequestReviews[];
    collaboration_requests: CollaborationRequests[];
    user_project_track: user_project_track[];
    ideas: Ideas[];
}
export interface team_project_record {
    team_id: string;
    project_id: string;
}
export interface user_project_track {
    user_id: string;
    project_id: string;
}
export interface team_request_response_record {
    id: string;
    team_id: string;
    team_author_id: string;
    url: string;
    status: boolean;
    res_applicant_user_id: string;
    res_status: boolean;
    teams: Teams;
    users: Users;
}
export interface idea_impressions {
    id: string;
    user_id: string;
    idea_id: string;
    like: boolean;
    timestamp: dateFns;
    users: Users[];
    ideas: Ideas[];
}

export interface project_impressions {
    id: string;
    user_id: string;
    project_id: string;
    like: boolean;
    timestamp: dateFns;
    users: Users[];
    projects: Projects[];
}


export interface RoomGetData {
    data_as_member:Rooms[]
    data_as_owner:Rooms[]
}