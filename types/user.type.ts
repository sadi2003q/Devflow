

export type USER = {
    id: string
    name: string
    email: string
    imageUrl?: string
    joinedAt: Date
    projects?: string[]
    role?: string
    isOwner?: boolean
    isManager?: boolean
    githubRepo?: string
}
