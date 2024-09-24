import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useTheme } from "@mui/system";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton.jsx";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const theme = useTheme();

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: "75%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            padding: 0,
            alignItems: "center",
          },
        }}
      >
        {!historicData | flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                responsive: true,
              }}
            />

            <Box
              sx={{
                display: "flex",
                marginTop: 2,
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
