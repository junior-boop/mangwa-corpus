import CarteLibrairie from "./CarteLibrairie";
import Container from "./Container";
import Titre from "./Titre";
import { librairie } from "../data/books";

export default function SectionLibrairie() {
  return (
    <section className="w-full lg:mt-[100px]">
      <Container>
        <Titre titre="Notre librairie" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {librairie.map((book) => (
            <CarteLibrairie
              key={book.id}
              imageUrl={book.coverUrl}
              titre={book.titre}
              auteur={book.auteur}
              href={`/ebook/${book.id}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
