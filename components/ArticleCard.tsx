import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  href: string;
  date?: string;
}

export default function ArticleCard({ title, description, href, date }: ArticleCardProps) {
  return (
    <Link href={href} className="block group">
      <article className="border border-border bg-white p-8 transition-all hover:border-charcoal">
        {date && (
          <time className="text-sm text-muted block mb-2">{date}</time>
        )}
        <h3 className="font-serif text-xl mb-3 group-hover:opacity-70 transition-opacity">
          {title}
        </h3>
        <p className="text-stone text-sm leading-relaxed">
          {description}
        </p>
      </article>
    </Link>
  );
}
