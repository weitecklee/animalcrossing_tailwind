'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Zoom from 'chartjs-plugin-zoom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { DataContext } from '@/lib/dataContext';
import calculateStats from '@/lib/calculateStats';
import Draggable from 'react-draggable';
import { HandRaisedIcon } from '@heroicons/react/24/solid';
import TimelineTooltip from './timelineTooltip';
import nookipediaData from '@/lib/nookipediaData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
  Zoom
);

const options = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 1,
      borderSkipped: false,
      borderColor: '#000',
      borderRadius: Number.MAX_SAFE_INTEGER,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original', minRange: 86400000 * 365 },
        y: { min: 'original', max: 'original', minRange: 20 },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      min: new Date('2020/03/25').valueOf() - 86400000,
      max: new Date().valueOf() + 86400000,
      time: {
        minUnit: 'month',
        displayFormats: {
          day: 'MMM d yyyy',
        },
      },
    },
    y: {
      display: false,
    },
  },
} as any;

const options2 = JSON.parse(JSON.stringify(options));
options2.plugins.zoom.limits = {
  x: { min: 'original', max: 'original', minRange: 30 },
  y: { min: 'original', max: 'original', minRange: 20 },
};

export default function Timeline() {
  const { historyMap } = useContext(DataContext);

  const {
    timelineColors,
    timelineColors3,
    timelineData,
    timelineData2,
    timelineData3,
    timelineLabels,
    timelineLabels3,
    timelineNameMap,
    timelineNameMap3,
  } = calculateStats(historyMap);

  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [timelineMode, setTimelineMode] = useState(0);
  const [barData, setBarData] = useState<number[][] | number[]>(timelineData);
  const [barLabels, setBarLabels] = useState(timelineLabels);
  const [barColors, setBarColors] = useState(timelineColors);
  const [barBackground, setBarBackground] = useState<number[][] | number[]>([
    0,
  ]);
  const nodeRef = useRef(null);

  useEffect(() => {
    options.plugins.tooltip.external = ({ tooltip }: { tooltip: any }) => {
      if (tooltip && tooltip.title) {
        setTimelineVillager(tooltip.title[0]);
        setShowTooltip(true);
      }
    };
    options2.plugins.tooltip.external = options.plugins.tooltip.external;
    options2.scales.x = {
      min: 0,
      max: Math.ceil(Math.max(...timelineData2) / 10 + 0.5) * 10,
    };
  }, [timelineData2]);

  const [barOptions, setBarOptions] = useState(options);

  useEffect(() => {
    if (timelineMode === 0) {
      setBarOptions(options);
      setBarData(timelineData);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 1) {
      setBarOptions(options2);
      setBarData(timelineData2);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 2) {
      setBarOptions(options2);
      setBarData(timelineData3);
      setBarColors(timelineColors3);
      setBarLabels(timelineLabels3);
    }
  }, [
    timelineMode,
    timelineData,
    timelineData2,
    timelineData3,
    timelineColors,
    timelineColors3,
    timelineLabels,
    timelineLabels3,
  ]);

  useEffect(() => {
    if (timelineVillager === '') {
      return;
    }
    if (timelineMode === 0) {
      const temp = Array(historyMap.size).fill([]);
      temp[timelineNameMap.get(timelineVillager)!] = [
        options.scales.x.min,
        options.scales.x.max,
      ];
      setBarBackground(temp);
    } else if (timelineMode === 1) {
      const temp = Array(historyMap.size).fill(0);
      temp[timelineNameMap.get(timelineVillager)!] = options2.scales.x.max;
      setBarBackground(temp);
    } else if (timelineMode === 2) {
      const temp = Array(historyMap.size).fill(0);
      temp[timelineNameMap3.get(timelineVillager)!] = options2.scales.x.max;
      setBarBackground(temp);
    }
  }, [
    timelineVillager,
    timelineMode,
    timelineNameMap,
    timelineNameMap3,
    historyMap,
  ]);

  return (
    <div className="relative w-full h-[calc(100dvh-88px)]">
      <Bar
        data={{
          labels: barLabels,
          datasets: [
            {
              label: 'Villagers',
              data: barData,
              backgroundColor: barColors,
              grouped: false,
            },
            {
              label: 'Background',
              data: barBackground,
              backgroundColor: 'rgba(0, 0, 0, .25)',
              borderWidth: 0,
              borderRadius: 0,
              grouped: false,
              barPercentage: 1,
              categoryPercentage: 1,
              animation: false,
            },
          ],
        }}
        options={barOptions}
      />
      {showTooltip && (
        <TimelineTooltip
          villagerData={nookipediaData.get(timelineVillager)!}
          history={historyMap.get(timelineVillager)!}
        />
      )}
      <Draggable
        handle="#dragFab"
        bounds="parent"
        cancel="#changeViewButton"
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="absolute right-2 top-1/2">
          <span
            id="dragFab"
            className="absolute -top-3 -left-2 cursor-grab active:cursor-grabbing"
          >
            <HandRaisedIcon className="h-4 w-4 inline" />
          </span>
          <button
            id="changeViewButton"
            onClick={() => {
              setTimelineMode((mode) => (mode === 2 ? 0 : mode + 1));
            }}
            className="px-4 bg-alternate font-coustard text-black p-2 rounded-lg hover:bg-white transition shadow-xl"
          >
            {timelineMode === 0
              ? 'Timeline view'
              : timelineMode === 1
              ? 'Lined-up view'
              : 'Sorted view'}
          </button>
        </div>
      </Draggable>
    </div>
  );
}
