import type {
    ApiResponse,
    PaginatedData,
    Profile,
    Skill,
    Project,
    Post,
    ContactFormData,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        next: { revalidate: 60 },
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new ApiError(
            `API Error: ${res.status} ${res.statusText}`,
            res.status
        );
    }

    const json = (await res.json()) as ApiResponse<T>;
    return json.data;
}

// ===== Profile =====
export async function getProfile(): Promise<Profile> {
    return fetchApi<Profile>("/public/profile");
}

// ===== Skills =====
export async function getSkills(): Promise<Skill[]> {
    const result = await fetchApi<PaginatedData<Skill>>("/public/skills?limit=100");
    return result.data;
}

// ===== Projects =====
export async function getProjects(): Promise<Project[]> {
    return fetchApi<Project[]>("/public/projects");
}

export async function getProjectById(id: string): Promise<Project> {
    return fetchApi<Project>(`/public/projects/${id}`);
}

export async function getFeaturedProjects(): Promise<Project[]> {
    const projects = await getProjects();
    return projects.filter((p) => p.IsFeatured);
}

// ===== Posts =====
export async function getPosts(): Promise<Post[]> {
    return fetchApi<Post[]>("/public/posts");
}

export async function getPostBySlug(slug: string): Promise<Post> {
    return fetchApi<Post>(`/public/posts/${slug}`);
}

// ===== Contact =====
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
    const url = `${API_BASE_URL}/public/contact`;

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new ApiError(
            `API Error: ${res.status} ${res.statusText}`,
            res.status
        );
    }

    const json = (await res.json()) as ApiResponse<unknown>;
    return { success: json.success };
}

export { ApiError };
