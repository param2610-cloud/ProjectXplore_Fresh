export interface NewsArticle {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601 date string
    content: string | null;
  }