import {TEAM_MEMBERS} from "@/types/teamMember.type";


export type PROJECT = {
    ID: string
    name: string
    description: string
    createdBy: string
    createdAt: Date
    GithubRepo?: string
    ownerID: string
    managerID: string
    teamMembers: TEAM_MEMBERS[]
    completionDate: Date
}
