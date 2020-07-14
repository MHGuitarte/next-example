import { useState } from "react";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const movies = await prisma.movie.findMany();
  return { props: { movies } };
};

const Home = ({ movies }) => {
  const [{ director, movieName, yearReleased }, setData] = useState({
    director: "",
    movieName: "",
    yearReleased: 0,
  });

  return (
    <div>
      <form
        onSubmit={() => {
          fetch("http://localhost:3000/api/movies", {
            method: "POST",
            body: JSON.stringify({
              director: director,
              movieName: movieName,
              yearReleased: Number(yearReleased),
            }),
          });
        }}
      >
        <label htmlFor="director-input">Director</label>
        <input
          type="text"
          name="director-input"
          onChange={(e) =>
            setData({
              director: e.target.value,
              movieName: movieName,
              yearReleased: yearReleased,
            })
          }
        />

        <label htmlFor="name-input">Título</label>
        <input
          type="text"
          name="name-input"
          id=""
          onChange={(e) =>
            setData({
              director: director,
              movieName: e.target.value,
              yearReleased: yearReleased,
            })
          }
        />

        <label htmlFor="year-input">Año de lanzamiento</label>
        <input
          type="text"
          name="year-input"
          id=""
          onChange={(e) =>
            setData({
              director: director,
              movieName: movieName,
              yearReleased: e.target.value,
            })
          }
        />
        <button type="submit">Añadir</button>
      </form>
      <div className="container">
        {movies.map((movie) => (
          <div key={movie.id}>
            <p>Name: {movie.movieName}</p>
            <p>Director: {movie.director}</p>
            <p>Year Released: {movie.yearReleased}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
