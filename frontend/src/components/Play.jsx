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

  ${({ math }) =>
    math &&
    css`
      background-color: var(--ocean);

      &:hover {
      box-shadow: 15px 15px black;
      transition: 0.04s ease;
      };
    `}


  ${({ swedish }) =>
    swedish &&
    css`
      background-color: var( --raspberry);

      &:hover {
      box-shadow: 15px 15px black;
      transition: 0.04s ease;
      };

    `}

  ${({ english }) =>
    english &&
    css`
      background-color: var( --teal);

      &:hover {
      box-shadow: 15px 15px black;
      transition: 0.04s ease;
      };

    `}
`;
