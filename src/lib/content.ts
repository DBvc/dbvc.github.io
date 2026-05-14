type PublishableEntry = {
  data: {
    draft?: boolean;
    pubDate?: Date;
  };
};

export function isPublished<T extends PublishableEntry>(entry: T) {
  const now = new Date();
  return !entry.data.draft && (!entry.data.pubDate || entry.data.pubDate <= now);
}

export function byPubDateDesc<T extends PublishableEntry>(a: T, b: T) {
  return (b.data.pubDate?.getTime() ?? 0) - (a.data.pubDate?.getTime() ?? 0);
}

