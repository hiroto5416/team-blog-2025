// components/modules/comment-card.tsx
export default function CommentCard({ comment }: { comment: { id: string; user: string; text: string } }) {
    return (
      <div className="p-4 bg-gray-800 rounded-md">
        <p className="text-sm text-[var(--color-muted)]">{comment.user}</p>
        <p className="text-[var(--color-foreground)] mt-1">{comment.text}</p>
      </div>
    );
  }
  