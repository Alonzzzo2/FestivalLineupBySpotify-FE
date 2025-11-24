export interface FestivalInfo {
    name: string;
    id: string;
    url: string;
    startDate: string; // ISO 8601 date string
}

export interface FestivalMatchResponse {
    url: string;
    matchedArtistsCount: number;
    matchedTracksCount: number;
    tracksPerShow: number;
    rankingMessage: string;
    festival: FestivalInfo;
}
