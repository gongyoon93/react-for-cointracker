import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background: linear-gradient(rgb(82,117,120),rgb(132,151,143));
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: rgb(82,117,120);
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps {
    toggleDark: () => void;
}

const ToggleBtn = styled.button`
    margin-left: 30px;
    background-color: rgb(82,117,120);
    color: white;
    margin-top: 15px;
`;

function Coins() {
    const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    return <Container>
        <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
        <Header>
            <Title>Coin Tracker</Title>
            <ToggleBtn onClick={toggleDarkAtom}>{isDark ? "DarkMode Off" : "DarkMode On"}</ToggleBtn>
        </Header>
        {isLoading ? (<Loader>Loading...</Loader>) : (<CoinsList>
                {data?.slice(0,100).map(coin =><Coin key={coin.id}>
                        <Link to={{
                            pathname: `${coin.id}`,
                            state: {name:coin.name } 
                        }}>
                            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>)}
            </CoinsList>)}
    </Container>;
}

export default Coins;