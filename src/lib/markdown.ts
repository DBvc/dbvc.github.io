type MarkdownExportEntry = {
  body?: string;
  data: {
    title: string;
    description: string;
    pubDate?: Date;
    updatedDate?: Date;
    startDate?: Date;
    tags?: string[];
    status?: string;
    repo?: string;
    demo?: string;
  };
};

function quoted(value: string) {
  return JSON.stringify(value);
}

function dateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function renderMarkdownEntry(entry: MarkdownExportEntry, canonicalUrl: string) {
  const { data } = entry;
  const frontmatter = [
    `title: ${quoted(data.title)}`,
    `description: ${quoted(data.description)}`,
    `canonical: ${quoted(canonicalUrl)}`,
  ];

  if (data.pubDate) {
    frontmatter.push(`pubDate: ${quoted(dateOnly(data.pubDate))}`);
  }

  if (data.updatedDate) {
    frontmatter.push(`updatedDate: ${quoted(dateOnly(data.updatedDate))}`);
  }

  if (data.startDate) {
    frontmatter.push(`startDate: ${quoted(dateOnly(data.startDate))}`);
  }

  if (data.status) {
    frontmatter.push(`status: ${quoted(data.status)}`);
  }

  if (data.tags && data.tags.length > 0) {
    frontmatter.push(`tags: ${JSON.stringify(data.tags)}`);
  }

  if (data.repo) {
    frontmatter.push(`repo: ${quoted(data.repo)}`);
  }

  if (data.demo) {
    frontmatter.push(`demo: ${quoted(data.demo)}`);
  }

  const body = entry.body?.trim();
  const parts = ["---", ...frontmatter, "---", "", `# ${data.title}`, "", data.description];

  if (body) {
    parts.push("", body);
  }

  return `${parts.join("\n")}\n`;
}
