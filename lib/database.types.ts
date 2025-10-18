export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          tech_stack: string[];
          demo_url: string | null;
          github_url: string | null;
          image_url: string | null;
          content: string | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          tech_stack?: string[];
          demo_url?: string | null;
          github_url?: string | null;
          image_url?: string | null;
          content?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          tech_stack?: string[];
          demo_url?: string | null;
          github_url?: string | null;
          image_url?: string | null;
          content?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          published_at: string;
          reading_time: number;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image?: string | null;
          published_at?: string;
          reading_time?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          published_at?: string;
          reading_time?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
