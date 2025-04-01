
export interface Article {
    title: string;
    articleImage: string;
    articleImageCaption: string;
    introduction: string;
    mythicHistory: string;
    galleryImages: {
        url: string;
    }[];
    relatedCharacters: Article[];
    relatedMyths: Article[];
    relatedLocations: Article[];
    info: {
        header: string;
        content: string;
    }[]
}