export  class Movie {
    constructor(title, overview, poster_path, id, vote_average, vote_count,backdrop_path) {
      this.title = title;
      this.overview = overview;
      this.poster_path = poster_path;
      this.id = id;
      this.vote_average = vote_average;
      this.vote_count = vote_count;
      this.backdrop_path = backdrop_path;
    }
  }
  
  
export  class Series {
    constructor(title, overview, poster_path, id, vote_average, vote_count,backdrop_path) {
      this.title = title;
      this.overview = overview;
      this.poster_path = poster_path;
      this.id = id;
      this.vote_average = vote_average;
      this.vote_count = vote_count;
      this.backdrop_path = backdrop_path;
    }
  }

export class MyListItem {
    constructor(id, name, isMovie, status, season, episodes, watchedEpisodes, duration, imgPathFile) {
      this.id = id;
      this.name = name;
      this.isMovie = isMovie;
      this.status = status;
      this.season = season;
      this.episodes = episodes;
      this.watchedEpisodes = watchedEpisodes;
      this.duration = duration;
      this.imgPathFile = imgPathFile;
    }
}
