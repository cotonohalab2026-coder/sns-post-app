import { AppSettings, PostDraft } from "./types";

const SETTINGS_KEY = "sns_app_settings_v1";
const POSTS_KEY = "sns_app_posts_v1";

export const defaultSettings: AppSettings = {
  jobType: null,
  jobTypeCustom: "",
  branding: {
    shopName: "",
    services: "",
    atmosphere: "",
    values: "",
  },
  persona: {
    customerType: "",
    visitOccasion: "",
    desiredEmotion: "",
    popularThings: "",
  },
  design: {
    colorScheme: "ピンク系",
    vibe: "やわらかくて温かい",
  },
  frequency: "weekly1",
  isOnboardingComplete: false,
  isFirstPost: true,
  lastPostDate: null,
};

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadPosts(): PostDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(POSTS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function savePosts(posts: PostDraft[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function addPost(post: PostDraft): void {
  const posts = loadPosts();
  const existing = posts.findIndex((p) => p.id === post.id);
  if (existing >= 0) {
    posts[existing] = post;
  } else {
    posts.unshift(post);
  }
  // Keep only last 50 posts
  savePosts(posts.slice(0, 50));
}

export function deletePost(id: string): void {
  const posts = loadPosts();
  savePosts(posts.filter((p) => p.id !== id));
}
