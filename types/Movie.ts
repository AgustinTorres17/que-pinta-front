interface Genre {
    id: number;
    name: string;
  }
  
  interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface SpokenLanguage {
    iso_639_1: string;
    name: string;
  }
  
  export interface MovieData {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any | null; // Ajusta si necesitas interface específica
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: any[]; // Ajusta si necesitas interface específica
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  