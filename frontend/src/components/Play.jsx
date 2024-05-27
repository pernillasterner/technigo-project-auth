import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useLogin } from "../contexts/UserContext";

export const Play = () => {
  const { authenticated, setAuthenticated } = useLogin();
  const [message, setMessage] = useState("")

  const getContent = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(
        //"http://localhost:8000/games",
        "https://technigo-project-auth.onrender.com/games",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        setAuthenticated({
          auth: false,
        });
        throw new Error("Failed to get user");
      }

      const data = await response.json();
      console.log("Login success", data);
      setMessage(data.message)
      setAuthenticated({
        auth: true,
      });
    } catch (err) {
      console.error("No user was found:", err);
    }
  };

  useEffect(() => {
    getContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authenticated.auth) {
    return (
      <PlayContainer>
        <PlayTitle>
          Welcome to Pluggin, Name. Ready to play some games?
        </PlayTitle>
        {message && <SecretText>{message}</SecretText>}    
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
  } else {
    return <Text>You need to log in!</Text>;
  }
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
  }

  ${({ math }) =>
    math &&
    css`
      box-shadow: 10px 10px var(--oceanactive);
      background-color: var(--ocean);

      &:hover {
        box-shadow: 15px 15px var(--oceanactive);
      }
    `}

  ${({ swedish }) =>
    swedish &&
    css`
      background-color: var(--raspberry);
      box-shadow: 10px 10px var(--raspberryactive);

      &:hover {
        box-shadow: 15px 15px var(--raspberryactive);
      }
    `}

  ${({ english }) =>
    english &&
    css`
      background-color: var(--teal);
      box-shadow: 10px 10px var(--tealactive);

      &:hover {
        box-shadow: 15px 15px var(--tealactive);
      }
    `}

   @media (min-width: 900px) {
    margin: 40px;
  }
`;

const Text = styled.p`
  font-size: 36px;
  text-align: center;
  width: 100vw;
`;

const SecretText = styled.p`
  font-size: 14px;
  text-align: center;
  color: red;
`
