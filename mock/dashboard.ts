// Mock Data
import {PROJECT} from "@/types/project.type";
import {STATUS, TASK} from "@/types/task.type";
import {PRIORITIES} from "@/types/subtask.type";

export const p: PROJECT[] = [
    {
        id: "uid123",
        name: 'DevFlow Platform',
        description: 'AI-powered workflow automation',
        createdBy: 'Sarah Chen',
        createdAt: new Date('2024-01-15'),
        githubRepo: 'https://github.com/org/devflow-platform',
        ownerId: 'user_001',
        managerId: 'manager_001',
        teamMembers: [],
        completionDate: new Date('2024-12-31'),
    },
    {
        id: "uid2",
        name: 'Mobile App Redesign',
        description: 'UI/UX modernization project',
        createdBy: 'Mike Johnson',
        createdAt: new Date('2024-02-10'),
        ownerId: 'user_005',
        managerId: 'manager_002',
        teamMembers: [],
        completionDate: new Date('2024-10-15'),
    },
    {
        id: "uid3",
        name: 'API Integration',
        description: 'Third-party service integration',
        createdBy: 'Alex Kumar',
        createdAt: new Date('2024-03-05'),
        githubRepo: 'https://github.com/org/api-integration',
        ownerId: 'user_008',
        managerId: 'manager_003',
        teamMembers: [],
        completionDate: new Date('2024-08-30'),
    },
];


export const upcomingTask: TASK[] = [
    {
        projectId: "proj_001",
        taskId: "task_001",
        title: "review Project Report",
        content: "Review PR #234",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        createdBy: "user_001",
        assignedTo: [
            {
                userId: "user_002",
                joinedAt: new Date("2024-01-10"),
                role: "Developer",
            },
        ],
        priority: PRIORITIES.High,
        status: STATUS.IN_PROGRESS,
        subTasks: [
            {
                taskId: "task_001",
                subText: "Check code quality",
                priority: PRIORITIES.Medium,
            },
        ],
        isComplete: false,
        workQuality: null,
    },
    {
        projectId: "proj_001",
        taskId: "task_002",
        title: "Important Meeting",
        content: "Team standup meeting",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        createdBy: "user_003",
        assignedTo: [], // ✅ allowed
        priority: PRIORITIES.Medium,
        status: STATUS.TODO,
        isComplete: false,
        workQuality: null,
    },
    {
        projectId: "proj_002",
        taskId: "task_003",
        title: "Deploy to staging",
        content: "Deploy to staging",
        createdAt: new Date(),
        submissionDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdBy: "user_004",
        assignedTo: [
            {
                userId: "user_005",
                joinedAt: new Date("2024-02-01"),
                role: "DevOps",
            },
            {
                userId: "user_006",
                joinedAt: new Date("2024-02-03"),
                role: "Backend Engineer",
            },
        ],
        priority: PRIORITIES.High,
        status: STATUS.TODO,
        isComplete: false,
        workQuality: null,
    },
];
