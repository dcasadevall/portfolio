export interface Metadata {
    title: string;
    summary: string;
    publishedAt: string;
    images: string[];
    team?: { avatar: string }[];
    link?: string;
    textOverlays?: {
        text: string;
        position?: string;
    }[];
    image?: string;
} 