import {TEAM_MEMBERS} from "@/types/teamMember.type";


export type PROJECT = {
    id: string
    name: string
    description: string
    createdBy: string
    createdAt: Date
    githubRepo?: string
    ownerId: string
    managerId: string
    teamMembers: TEAM_MEMBERS[]
    completionDate: Date
}
