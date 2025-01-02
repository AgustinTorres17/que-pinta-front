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
  
  export interface TVShowData {
    backdrop_path: string | null;
    created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string | null;
    }[];
    episode_run_time: number[]; // Tiempo promedio por episodio
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string | null;
      vote_average: number;
      vote_count: number;
    } | null;
    name: string; // Título de la serie
    next_episode_to_air: any | null; // Próximo episodio (si aplica)
    networks: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    seasons: {
      air_date: string | null;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      season_number: number;
    }[];
    spoken_languages: SpokenLanguage[];
    status: string; // Estado: "Returning Series", "Ended", etc.
    tagline: string;
    type: string; // Ej: "Scripted", "Documentary", etc.
    vote_average: number;
    vote_count: number;
  }
  