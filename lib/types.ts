export type JobType =
  | "balloon"
  | "flower"
  | "nail"
  | "patisserie"
  | "hairsalon"
  | "handmade"
  | "photographer"
  | "other";

export type Screen =
  | "splash"
  | "jobType"
  | "branding"
  | "persona"
  | "design"
  | "frequency"
  | "onboardingComplete"
  | "home"
  | "postPurpose"
  | "photoUpload"
  | "layoutSelect"
  | "memo"
  | "generating"
  | "postResults"
  | "preview"
  | "instagramGuide"
  | "pastPosts"
  | "settings";

export interface BrandingSettings {
  shopName: string;
  services: string;
  atmosphere: string;
  values: string;
}

export interface PersonaSettings {
  customerType: string;
  visitOccasion: string;
  desiredEmotion: string;
  popularThings: string;
}

export interface DesignSettings {
  colorScheme: string;
  vibe: string;
}

export interface AppSettings {
  jobType: JobType | null;
  jobTypeCustom: string;
  branding: BrandingSettings;
  persona: PersonaSettings;
  design: DesignSettings;
  frequency: string;
  isOnboardingComplete: boolean;
  isFirstPost: boolean;
  lastPostDate: string | null;
}

export interface GeneratedPost {
  title: string;
  text: string;
}

export interface PostDraft {
  id: string;
  createdAt: string;
  purpose: string;
  layout: "A" | "B" | "C";
  memo: string;
  selectedText: string;
  hashtags: string[];
  isDraft: boolean;
}

export interface CurrentPostState {
  purpose: string;
  photo: string | null;
  layout: "A" | "B" | "C";
  memo: string;
  generatedPosts: GeneratedPost[];
  hashtags: string[];
  selectedPostIndex: number;
}
