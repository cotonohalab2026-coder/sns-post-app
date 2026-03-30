"use client";

import { useState } from "react";
import { PostDraft } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import BackButton from "@/components/ui/BackButton";

interface PastPostsScreenProps {
  posts: PostDraft[];
  onBack: () => void;
  onDeletePost: (id: string) => void;
}

export default function PastPostsScreen({
  posts,
  onBack,
  onDeletePost,
}: PastPostsScreenProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      onDeletePost(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleCopy = async (post: PostDraft) => {
    const fullText = `${post.selectedText}\n\n${post.hashtags.join(" ")}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: 24 }}>
        <h2 className="page-title">📂 過去の投稿</h2>
        <p className="page-subtitle">保存した投稿文の一覧です</p>
      </div>

      {posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            paddingTop: 60,
            paddingBottom: 60,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <div style={{ fontSize: 17, color: "#888" }}>
            まだ保存した投稿はありません
          </div>
          <div style={{ fontSize: 14, color: "#aaa", marginTop: 8 }}>
            投稿文を作成すると。んこに保存されます
          </div>
          <button
            className="btn-main"
            style={{ marginTop: 32 }}
            onClick={onBack}
          >
            投稿を作る
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.map((post) => (
            <div key={post.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="badge">
                    {post.isDraft ? "下書き" : "投稿済み"}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#888",
                      padding: "4px 8px",
                    }}
                  >
                    {post.purpose}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    background: confirmDelete === post.id ? "#ffeeee" : "none",
                    border:
                      confirmDelete === post.id
                        ? "1px solid #ffaaaa"
                        : "none",
                    color: confirmDelete === post.id ? "#cc0000" : "#bbb",
                    cursor: "pointer",
                    fontSize: 13,
                    padding: "4px 8px",
                    borderRadius: 6,
                    flexShrink: 0,
                  }}
                >
                  {confirmDelete === post.id ? "本当に削除？" : "✕"}
                </button>
              </div>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#333",
                  margin: "0 0 10px 0",
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.selectedText}
              </p>

              {/* Hashtags preview */}
              {post.hashtags.length > 0 && (
                <div
                  style={{
                    fontSize: 13,
                    color: "#0095f6",
                    marginBottom: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.hashtags.slice(0, 5).join(" ")}
                  {post.hashtags.length > 5 && " ..."}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 12, color: "#bbb" }}>
                  {formatDate(post.createdAt)}
                </span>
                <button
                  onClick={() => handleCopy(post)}
                  style={{
                    backgroundColor:
                      copiedId === post.id ? "var(--color-sub)" : "#f5f5f5",
                    color:
                      copiedId === post.id ? "var(--color-text)" : "#555",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  {copiedId === post.id ? "✓ コピー済み" : "📋 コピー"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
