import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbCrumb {
  name: string;
  /** Click handler — if omitted, item is treated as current page (no link) */
  onClick?: () => void;
  isHome?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

/**
 * Visual breadcrumbs — pairs with BreadcrumbList JSON-LD in <SEOHead />.
 * Last item is rendered as the current page (no link).
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-xs text-muted-foreground overflow-x-auto no-scrollbar ${className}`}>
      <ol className="flex items-center gap-1 whitespace-nowrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} className="shrink-0 text-muted-foreground/50" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.isHome && <Home size={12} className="inline mr-1 -mt-0.5" />}
                  {item.name}
                </span>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {item.isHome && <Home size={12} />}
                  {item.name}
                </button>
              ) : (
                <span className="inline-flex items-center gap-1">
                  {item.isHome && <Home size={12} />}
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
