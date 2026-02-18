// ===== API Response Wrapper =====
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedData<T> {
    data: T[];
    meta: {
        current_page: number;
        limit: number;
        total_data: number;
    };
}

// ===== Profile =====
export interface SocialLink {
    Platform: string;
    URL: string;
}

export interface Experience {
    ID: string;
    Title: string;
    Company: string;
    Location: string;
    StartDate: string;
    EndDate: string | null;
    Description: string;
    Type: string;
}

export interface Profile {
    ID: string;
    UserID: string;
    FullName: string;
    Bio: string;
    AvatarURL: string;
    ResumeURL: string;
    SocialLinks: SocialLink[];
    Skills: Skill[];
    Experiences: Experience[];
    CreatedAt: string;
    UpdatedAt: string;
}

// ===== Skills =====
export interface Skill {
    ID: string;
    Name: string;
    Category: string;
    IconURL?: string;
}

// ===== Projects =====
export interface ProjectImage {
    ID: string;
    FileName: string;
    FilePath: string;
    MimeType: string;
    Size: number;
}

export interface Project {
    ID: string;
    Slug: string;
    Title: string;
    Description: string;
    ContentMarkdown?: string;
    DemoURL?: string;
    RepoURL?: string;
    StartDate?: string;
    EndDate?: string | null;
    IsFeatured: boolean;
    Skills: Skill[];
    Images: ProjectImage[];
    CreatedAt: string;
    UpdatedAt: string;
}

// ===== Posts =====
export interface PostImage {
    ID: string;
    FileName: string;
    FilePath: string;
    MimeType: string;
    Size: number;
}

export interface Tag {
    ID: string;
    Name: string;
    Slug: string;
}

export interface Post {
    ID: string;
    Slug: string;
    Title: string;
    Summary: string;
    ContentMarkdown?: string;
    IsPublished: boolean;
    Tags: Tag[];
    Images: PostImage[];
    PublishedAt: string;
    CreatedAt: string;
    UpdatedAt: string;
}

// ===== Contact =====
export interface ContactFormData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}
