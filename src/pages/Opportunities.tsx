import { Bookmark, BriefcaseBusiness, CalendarDays, MapPin, Search, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Page, PageHeader } from "../components/common/Page";
import { StatusBadge } from "../components/common/UI";
import { opportunities, type Opportunity } from "../data/mockData";
import { readStorage, writeStorage } from "../utils/storage";

const categories = ["All", "Internship", "Research Fellowship", "Workshop", "Innovation Challenge", "Exchange Programme"];

export function Opportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [applicationOpportunity, setApplicationOpportunity] = useState<Opportunity | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(readStorage("pu-connect-bookmarks", ["research-sustainable-ai-energy"]));

  const filteredOpportunities = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return opportunities.filter((opportunity) => {
      const categoryMatch = selectedCategory === "All" || opportunity.category === selectedCategory;
      const searchMatch =
        !normalized ||
        [opportunity.title, opportunity.organization, opportunity.location, opportunity.benefit, opportunity.eligibility, opportunity.description, ...opportunity.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleBookmark = (id: string) => {
    const next = bookmarkedIds.includes(id) ? bookmarkedIds.filter((item) => item !== id) : [...bookmarkedIds, id];
    setBookmarkedIds(next);
    writeStorage("pu-connect-bookmarks", next);
    toast.success(next.includes(id) ? "Opportunity saved" : "Opportunity removed from saved items");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <Page>
      <PageHeader
        eyebrow="Student Opportunities Portal"
        title="Career & Research Opportunities"
        description="Explore sample-data opportunities across internships, fellowships, workshops, innovation challenges, and exchange programmes."
      />
      <OpportunityToolbar searchQuery={searchQuery} selectedCategory={selectedCategory} onSearchChange={setSearchQuery} onCategoryChange={setSelectedCategory} />
      <div className="sample-notice">
        <Sparkles size={18} />
        <span>Sample Data: These opportunities are frontend-only representations for the PU Connect prototype.</span>
      </div>
      {filteredOpportunities.length > 0 ? (
        <OpportunityGrid opportunities={filteredOpportunities} bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} onViewDetails={setSelectedOpportunity} />
      ) : (
        <OpportunityEmptyState onClear={clearFilters} />
      )}
      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          bookmarked={bookmarkedIds.includes(selectedOpportunity.id)}
          onBookmark={toggleBookmark}
          onApply={(opportunity) => {
            setSelectedOpportunity(null);
            setApplicationOpportunity(opportunity);
          }}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
      {applicationOpportunity && <DemoApplicationModal opportunity={applicationOpportunity} onClose={() => setApplicationOpportunity(null)} />}
    </Page>
  );
}

function OpportunityToolbar({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <section className="opportunity-toolbar" aria-label="Opportunity search and filters">
      <div className="search-box opportunity-search">
        <Search size={18} />
        <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search title, host, benefit, eligibility, or tags" />
      </div>
      <OpportunityFilters selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
    </section>
  );
}

function OpportunityFilters({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (value: string) => void }) {
  return (
    <div className="segmented scrollable opportunity-filters" role="tablist" aria-label="Opportunity categories">
      {categories.map((category) => (
        <button role="tab" aria-selected={selectedCategory === category} key={category} className={selectedCategory === category ? "selected" : ""} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}

function OpportunityGrid({
  opportunities: rows,
  bookmarkedIds,
  onBookmark,
  onViewDetails,
}: {
  opportunities: Opportunity[];
  bookmarkedIds: string[];
  onBookmark: (id: string) => void;
  onViewDetails: (opportunity: Opportunity) => void;
}) {
  return (
    <section className="opportunity-grid" aria-label="Opportunity results">
      {rows.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} bookmarked={bookmarkedIds.includes(opportunity.id)} onBookmark={onBookmark} onViewDetails={onViewDetails} />
      ))}
    </section>
  );
}

function OpportunityCard({
  opportunity,
  bookmarked,
  onBookmark,
  onViewDetails,
}: {
  opportunity: Opportunity;
  bookmarked: boolean;
  onBookmark: (id: string) => void;
  onViewDetails: (opportunity: Opportunity) => void;
}) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card-head">
        <div className="badge-row">
          <StatusBadge label={opportunity.category} tone="info" />
          <span className="benefit-badge">{opportunity.benefit}</span>
        </div>
        <button className={`icon-button bookmark-button ${bookmarked ? "saved" : ""}`} aria-label={bookmarked ? `Remove ${opportunity.title} from saved opportunities` : `Save ${opportunity.title}`} aria-pressed={bookmarked} onClick={() => onBookmark(opportunity.id)}>
          <Bookmark fill={bookmarked ? "currentColor" : "none"} size={19} />
        </button>
      </div>
      <h2>{opportunity.title}</h2>
      <div className="opportunity-meta">
        <span>
          <BriefcaseBusiness size={16} />
          {opportunity.organization}
        </span>
        <span>
          <MapPin size={16} />
          {opportunity.location}
        </span>
      </div>
      <p>{opportunity.description}</p>
      <div className="tag-row">
        {opportunity.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="opportunity-card-foot">
        <span>
          <CalendarDays size={16} />
          Deadline: {opportunity.deadline}
        </span>
        <button className="secondary-button" onClick={() => onViewDetails(opportunity)}>
          View Details
        </button>
      </div>
    </article>
  );
}

function OpportunityDetailsModal({
  opportunity,
  bookmarked,
  onBookmark,
  onApply,
  onClose,
}: {
  opportunity: Opportunity;
  bookmarked: boolean;
  onBookmark: (id: string) => void;
  onApply: (opportunity: Opportunity) => void;
  onClose: () => void;
}) {
  return (
    <AccessibleDialog title={opportunity.title} onClose={onClose} className="opportunity-modal">
      <div className="modal-kicker">{opportunity.category} · Sample Data</div>
      <h2>{opportunity.title}</h2>
      <div className="modal-detail-grid">
        <Detail label="Host Organization" value={opportunity.organization} />
        <Detail label="Location" value={opportunity.location} />
        <Detail label="Benefit / Stipend" value={opportunity.benefit} />
        <Detail label="Application Deadline" value={opportunity.deadline} />
      </div>
      <section className="modal-section">
        <h3>Eligibility</h3>
        <p>{opportunity.eligibility}</p>
      </section>
      <section className="modal-section">
        <h3>About this opportunity</h3>
        <p>{opportunity.description}</p>
      </section>
      <section className="modal-section sample-representation">
        <h3>Sample opportunity representation</h3>
        <p>This listing is included to demonstrate how PU Connect can present verified career and research opportunities inside a student-facing university platform.</p>
      </section>
      <div className="tag-row modal-tags">
        {opportunity.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="modal-actions">
        <button className={`secondary-button ${bookmarked ? "saved-action" : ""}`} onClick={() => onBookmark(opportunity.id)}>
          <Bookmark fill={bookmarked ? "currentColor" : "none"} size={17} />
          {bookmarked ? "Saved" : "Save"}
        </button>
        <button className="primary-button" onClick={() => onApply(opportunity)}>
          Apply (Demo Simulation)
        </button>
      </div>
    </AccessibleDialog>
  );
}

function DemoApplicationModal({ opportunity, onClose }: { opportunity: Opportunity; onClose: () => void }) {
  return (
    <AccessibleDialog title="Apply Demo Simulation" onClose={onClose} className="demo-application-modal">
      <div className="modal-kicker">Frontend-only demo</div>
      <h2>Application simulation recorded</h2>
      <p>
        No real application has been submitted for <strong>{opportunity.title}</strong>. PU Connect would use this flow to hand students into a verified application process when connected to official university systems.
      </p>
      <button className="primary-button" onClick={onClose}>
        Done
      </button>
    </AccessibleDialog>
  );
}

function OpportunityEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <section className="opportunity-empty">
      <h2>No opportunities found</h2>
      <p>Try changing your search or filters.</p>
      <button className="secondary-button" onClick={onClear}>
        Clear Filters
      </button>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AccessibleDialog({ title, className, children, onClose }: { title: string; className?: string; children: React.ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current
        ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((item) => !item.hasAttribute("disabled"))
        : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop opportunity-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className={`modal accessible-modal ${className ?? ""}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}>
          <X size={20} />
        </button>
        {children}
      </section>
    </div>
  );
}
