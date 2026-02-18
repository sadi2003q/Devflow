export type PROJECT = {
    id: string
    name: string
    description: string
    createdBy: string
    createdAt: Date
    githubRepo?: string
    ownerId: string
    managerId: string
    teamMembers: string[]
    completionDate: Date
}
