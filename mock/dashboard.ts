// Mock Data
import {PROJECT} from "@/types/project.type";
import {STATUS, TASK} from "@/types/task.type";
import {PRIORITIES} from "@/types/subtask.type";

export const p: PROJECT[] = [
    {
        ID: "uid123",
        name: 'DevFlow Platform',
        description: 'AI-powered workflow automation',
        createdBy: 'Sarah Chen',
        createdAt: new Date('2024-01-15'),
        GithubRepo: 'https://github.com/org/devflow-platform',
        ownerID: 'user_001',
        managerID: 'manager_001',
        teamMembers: [],
        completionDate: new Date('2024-12-31'),
    },
    {
        ID: "uid2",
        name: 'Mobile App Redesign',
        description: 'UI/UX modernization project',
        createdBy: 'Mike Johnson',
        createdAt: new Date('2024-02-10'),
        ownerID: 'user_005',
        managerID: 'manager_002',
        teamMembers: [],
        completionDate: new Date('2024-10-15'),
    },
    {
        ID: "uid3",
        name: 'API Integration',
        description: 'Third-party service integration',
        createdBy: 'Alex Kumar',
        createdAt: new Date('2024-03-05'),
        GithubRepo: 'https://github.com/org/api-integration',
        ownerID: 'user_008',
        managerID: 'manager_003',
        teamMembers: [],
        completionDate: new Date('2024-08-30'),
    },
];


export const upcomingTask: TASK[] = [
    {
        projectID: "proj_001",
        taskID: "task_001",
        title: "review Project Report",
        content: "Review PR #234",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        createdBy: "user_001",
        assignedTo: [
            {
                userID: "user_002",
                joinedAt: new Date("2024-01-10"),
                Role: "Developer",
            },
        ],
        priority: PRIORITIES.High,
        status: STATUS.WORKING,
        subtask: [
            {
                TaskID: "task_001",
                SubText: "Check code quality",
                priority: PRIORITIES.Medium,
            },
        ],
        isComplete: false,
        workQuality: null,
    },
    {
        projectID: "proj_001",
        taskID: "task_002",
        title: "Important Meeting",
        content: "Team standup meeting",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        createdBy: "user_003",
        assignedTo: [], // ✅ allowed
        priority: PRIORITIES.Medium,
        status: STATUS.PENDING,
        isComplete: false,
        workQuality: null,
    },
    {
        projectID: "proj_002",
        taskID: "task_003",
        title: "Deploy to staging",
        content: "Deploy to staging",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdBy: "user_004",
        assignedTo: [
            {
                userID: "user_005",
                joinedAt: new Date("2024-02-01"),
                Role: "DevOps",
            },
            {
                userID: "user_006",
                joinedAt: new Date("2024-02-03"),
                Role: "Backend Engineer",
            },
        ],
        priority: PRIORITIES.High,
        status: STATUS.PENDING,
        isComplete: false,
        workQuality: null,
    },
];