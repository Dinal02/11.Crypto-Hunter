import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import CoinInfo from "../Components/CoinInfo";
import { useTheme } from "@mui/system";
import { Box, LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Carousel";
import parse from "html-react-parser";

const Coinpage = () => {
  const theme = useTheme();

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  //   console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Box
        sx={{
          width: "30%",
          paddingX: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "2px solid grey",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            paddingRight: 0,
            borderRight: "none",
            marginBottom: "20px",
          },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "Montserrat",
            textAlign: "center",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 3,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            paddingX: 5,
            paddingY: 2,
            marginTop: 2,
            width: "100%",
            fontSize: "1rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "0.9rem",
              gap: 1,
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "flex-start",
              fontSize: "0.85rem",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="h6">Rank:</Typography>&nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="h6">Current Price:</Typography>&nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="h6">Market Cap: </Typography>&nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default Coinpage;
