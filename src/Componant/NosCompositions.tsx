import Container from "./Container";
import { FluentMusicNote124Filled } from "./SectionAudio";
import { tracks } from "../data/tracks";
import Titre from "./Titre";

const compositions = Array.from({ length: 10 }, (_, i) => ({
  titre: "Titre du livre",
  trackId: tracks[i % tracks.length].id,
}));

export default function NosCompositions() {
  return (
    <section className="w-full mt-10">
      <Container>
        <Titre titre="Nos compositions" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {compositions.map((item, i) => (
            <a key={i} href={`/audioitem/${item.trackId}`} className="flex flex-col gap-2 group">
              <div className="relative w-full aspect-square bg-[#1c1c1c] flex items-center justify-center overflow-hidden">
                <FluentMusicNote124Filled className="h-14 w-14 text-gray-600" />
              </div>
              <p className="text-[16px] sm:text-[20px] font-semibold text-gray-900 group-hover:text-[#00bcd4] transition-colors">
                {item.titre}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
