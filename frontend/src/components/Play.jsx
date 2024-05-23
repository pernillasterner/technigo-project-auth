import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Play = () => {
  return (
    <PlayContainer>
      <PlayTitle>Welcome to Pluggin, Name. Ready to play some games?</PlayTitle>
      <GamesCards>
        <Link to={`/play/math`}>
          <GameCard math>Play a math game!</GameCard>
        </Link>
        <Link to={`/play/swedish`}>
          <GameCard swedish>Play a Swedish game!</GameCard>
        </Link>
        <Link to={`/play/english`}>
          <GameCard english>Play an English game!</GameCard>
        </Link>
      </GamesCards>
    </PlayContainer>
  );
};

const PlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`;

const PlayTitle = styled.h2`
  color: black;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: center;
  margin-top: 70px;
`;

const GamesCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 290px;
  height: 220px;
  margin: 20px;
  color: var(--vanilla);
  background-color: var(--teal);
  font-size: 20px;

  &:hover {
      transition: 0.2s ease;
      };

  ${({ math }) =>
    math &&
    css`
      box-shadow: 10px 10px var(--oceanactive);
      background-color: var(--ocean);

  &:hover {
      box-shadow: 15px 15px var(--oceanactive);
      };
    `}


  ${({ swedish }) =>
    swedish &&
    css`
      background-color: var( --raspberry);
      box-shadow: 10px 10px var(--raspberryactive);

      &:hover {
      box-shadow: 15px 15px var(--raspberryactive);
      };
    `}

  ${({ english }) =>
    english &&
    css`
      background-color: var( --teal);
      box-shadow: 10px 10px var(--tealactive);

      &:hover {
      box-shadow: 15px 15px var(--tealactive);
      };
    `}

   @media (min-width: 900px) {
       margin: 40px;
        }
`;
