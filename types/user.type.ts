

export type USER = {
    ID: string
    Name: string
    email: string
    imageUTL?: string
    joined_at: Date
    Projects?:[string]
    role?: string
    isOwner?: boolean
    isManager?: boolean
    githubRepo?: string
}