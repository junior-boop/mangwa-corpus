import type { LyricLine } from "./lyrics_audio_test";
import { lyricsAudioTest } from "./lyrics_audio_test";
import audioTest from "../assets/audio_test.mp3";

export interface Track {
  id: string;
  titre: string;
  artiste: string;
  audioUrl: string;
  coverUrl?: string;
  lyrics: LyricLine[];
}

export const tracks: Track[] = [
  {
    id: "1",
    titre: "Titre de la musique",
    artiste: "Artiste",
    audioUrl: audioTest,
    lyrics: lyricsAudioTest,
  },
  {
    id: "2",
    titre: "Titre de la musique",
    artiste: "Artiste",
    audioUrl: audioTest,
    lyrics: lyricsAudioTest,
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}
