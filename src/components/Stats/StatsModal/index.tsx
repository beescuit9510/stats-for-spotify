import { statsModalState } from '@/atom/statsModalAtom';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useRecoilState, useResetRecoilState } from 'recoil';

type StatsModalProps = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsModal: React.FC<StatsModalProps> = () => {
  const [statsModalValue, setStatsModalValue] = useRecoilState(statsModalState);
  const resetStatsModalState = useResetRecoilState(statsModalState);
  const [chartDatasets, setChartDatasets] = useState<any[]>([]);
  const [chartLabels, setChartLabels] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);

  useEffect(() => {
    setIsLoading(true);

    if (statsModalValue.id === '') {
      return;
    }

    fetch(
      `/api/chart/${statsModalValue.target}/${statsModalValue.id}/${statsModalValue.timeRange}`
    )
      .then((res) => res.json())
      .then((data) => {
        setChartLabels(data.visitedAt);
        setChartDatasets(data.chartData);
        setIsLoading(false);
      });
  }, [statsModalValue.isOpen]);

  useEffect(() => {
    setIsLoading(true);

    if (!chartDatasets) {
      return;
    }

    setLineChartData({
      labels: chartLabels.map((time) => moment(time).fromNow()),
      datasets: [
        {
          data: chartLabels.map((visitedAt) => {
            const rank = chartDatasets.find(
              (ele) => ele!.visitedAt === visitedAt
            )?.rank;
            if (!rank) {
              return null;
            }
            return 51 - rank;
          }),
          label: statsModalValue.chartLabel,
          borderColor: 'rgb(99, 255, 122)',
          backgroundColor: 'rgba(99, 255, 107, 0.5)',
        },
      ],
    });

    setIsLoading(false);
  }, [chartDatasets]);

  const onClose = () => {
    resetStatsModalState();
  };

  const options: any = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 7,
          },
        },
      },
      y: {
        max: 50,
        min: 1,
        ticks: {
          stepSize: 10,
          callback: (value: any) => `${51 - (value as number)}`,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        // title: 'a',
        // position: 'top' as const,
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        // text: 'Chart.js Line Chart',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItems: any) {
            return 51 - tooltipItems?.parsed?.y;
          },
        },
      },
    },
  };

  if (!lineChartData || isLoading) {
    return <></>;
  }
  return (
    <>
      <Modal isOpen={statsModalValue.isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Historical ranking data</ModalHeader>
          <Box
            padding={'0.7rem'}
            margin={'1rem'}
            marginTop={'0'}
            bg={'gray.100'}
            fontSize={'0.7rem'}
          >
            This graph shows the placement of the selected track on your past
            visits, when you log in. This data gets collected every time you
            view a ranking list
          </Box>
          <ModalCloseButton />
          <ModalBody marginBottom={'3rem'}>
            <Line options={options} data={lineChartData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default StatsModal;
