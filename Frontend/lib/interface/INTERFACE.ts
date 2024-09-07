import { User } from "@/components/SearchDialouge";

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
    comments:string;
    users_collaboration_request_reviews_collaborator_idTousers:Users;
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
    owner_id:string;
    rooms?:Rooms;
    update:update[];
    New_Project_table:ProjectData[];

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
export interface update {
    id:string;
    room_id:string;
    text:string;
    image_link:string[];
    video_link:string[];
    author_id:string;
    author_details:Users;
    createdAt:any,
}
export interface media {
    images : string [];
    videos : string[];
}
export interface FeatureSection {
    text: string;
    media: media;
}

export interface  Feature {
    inputs: FeatureSection;
    processes: FeatureSection;
    outputs: FeatureSection;
}





export interface TechnicalRequirement {
    programmingLanguages: string[];
    frameworks: string[];
    databases: string[];
    infrastructure: string[];
    tools: string[];
}

export interface Milestone {
    name: string;
    description: string;
    dueDate: string;
}

export interface Deliverable {
    name: string;
    description: string;
    type: 'document' | 'software' | 'data' | 'other';
}

export interface Budget {
    totalAmount: number;
    breakdown: { [key: string]: number };
}

export interface Risk {
    description: string;
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
}

export interface SuccessMetric {
    name: string;
    description: string;
    targetValue: string;
}

export interface ProjectData {
    id?:string;
    roomId?:string;
    projectType: string;
    projectName: string;
    projectDescription: string;
    mentor: string;
    reference: string;
    demoLink: string;
    hardwareComponents: HardwareComponent[]; // Adjust based on FreshSearchBar return type
    softwareTechnologies: string[];
    features: Feature[];
    technicalRequirements: TechnicalRequirement;
    milestones: Milestone[];
    deliverables: Deliverable[];
    budget: Budget;
    risks: Risk[];
    successMetrics: SuccessMetric[];
    room?:Rooms;
    createdAt?:any;
    updatedAt?:any
}
export interface HardwareComponent {
    id       :string;
    name      :string;
    quantity  :number;
    image_link:string;
    
  }
export interface softwareTechnologies {
    id       :string;
    name      :string;
    image_link:string;
    
  }
export interface user_achievements {
    id          :string;
  user_id     :string;
  title       :string;
  description :string;
  date        :string
  images      :string[];
}


export interface Developer {
    id: string;
    name: string;
    profilePicture: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    twitterUrl?: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    type: 'TECHNICAL' | 'SOFT';
    developerId: string;
  }
  
  export interface Project {
    id: string;
    name: string;
    description: string;
    role: string;
    demoLink?: string;
    githubLink?: string;
    developerId: string;
  }
  
  export interface ProjectTechnology {
    id: string;
    name: string;
    projectId: string;
  }
  
  export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    responsibilities: string;
    developerId: string;
  }
  
  export interface ExperienceTechnology {
    id: string;
    name: string;
    experienceId: string;
  }
  
  export interface Education {
    id: string;
    degree: string;
    institution: string;
    graduationDate: Date;
    developerId: string;
  }
  
  export interface RelevantCourse {
    id: string;
    name: string;
    educationId: string;
  }

  export interface UserPortfolioGetDataResponse {
    user_id?: string;
    full_name?: string;
    role_id?: string;
    email?: string;
    phone_number?: string;
    username?: string;
    password?: string;
    refreshToken?: string;
    date_of_birth?: string;
    address?: string;
    profile_picture_link?: string;
    institution_id?: string;
    team_id?: string;
    portfolio_profilePicture?: string;
        title?:string;
        bio?: string;
        location?: string;
        linkedinUrl?: string;
        githubUrl?: string;
        twitterUrl?: string;
        createdAt?: string;
        updatedAt?: string;
        teams?:any[];
        rooms?: any[];
        user_achievements?:any[];
        skills?:any[];
        experiences?:any[];
        education?:any[];
  }

  export interface Developer_Skill {
    id           :string;
    name         :string;
    type         :string;
    createdAt    :string;
    updatedAt    :string;
    users? :Users;
    usersUser_id :string;
  }
  export interface Developer_Project {
    id           :string;
    name         :string;
    description  :string;
    role         :string;
    demoLink     :string;
    githubLink   :string;
    technologies? :Developer_ProjectTechnology[];
    createdAt    :string;
    updatedAt    :string;
    users?        :Users;
    usersUser_id :string;
  }
 export interface Developer_ProjectTechnology {
    id        :string;
    name      :string;
    project?   :Developer_Project;
    projectId :string;
    createdAt :string;
    updatedAt :string;
  }
  export interface Developer_Education {
    id              :string;
  degree          :string;
  institution     :string;
  graduationDate  :string;
  relevantCourses :string;
  createdAt       :string;
  updatedAt       :string;
  users           :string;
  usersUser_id    :string;
  }
  export interface  Developer_Experience {
    id               :string;
    jobTitle         :string;
    company          :string;
    startDate        :string;
    endDate          :string;
    responsibilities :string;
    technologies    :any[];
    createdAt        :string;
    updatedAt        :string;
    users            :User;
    usersUser_id    :string;
  }
export interface OptionProps {
    id: string | null;
    components_name: string;
  components_image_link:string |null;
  }
  