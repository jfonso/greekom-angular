import { ArticleListItem } from "./article-list-item";

export interface Article {
    title: string;
    articleImage: string;
    articleImageCaption: string;
    introduction: string;
    mythicHistory: string;
    galleryImages: {
        url: string;
    }[];
    relatedCharacters: ArticleListItem[];
    relatedMyths: ArticleListItem[];
    relatedLocations: ArticleListItem[];
    info: {
        header: string;
        content: string;
    }[]
}