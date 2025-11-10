import { ResponsiveLine } from '@nivo/line';
import { type CSSProperties, useMemo } from 'react';

export type SentimentDatum = {
  x: string;
  y: number;
};

export type SentimentSeries = {
  id: string;
  color: string;
  data: SentimentDatum[];
};

type CallsSentimentChartProps = {
  data: SentimentSeries[];
  yMax?: number;
};

const tooltipContainerStyle: CSSProperties = {
  background: '#ffffff',
  boxShadow: '0px 8px 20px rgba(15, 23, 42, 0.12)',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '12px',
  color: '#0a0a0a',
};

const formatter = new Intl.NumberFormat('en-US');

const CallsSentimentChart = ({ data, yMax = 820_000 }: CallsSentimentChartProps) => {
  const theme = useMemo(
    () => ({
      background: '#fcfcfc',
      textColor: '#737373',
      fontSize: 12,
      axis: {
        domain: {
          line: {
            stroke: '#f1f1f1',
          },
        },
        ticks: {
          text: {
            fill: '#a3a3a3',
            fontSize: 12,
          },
          line: {
            stroke: '#f1f1f1',
          },
        },
      },
      grid: {
        line: {
          stroke: '#f1f1f1',
        },
      },
      crosshair: {
        line: {
          stroke: 'rgba(26, 136, 248, 0.5)',
          strokeWidth: 1,
          strokeDasharray: '2 4',
        },
      },
      tooltip: {
        container: tooltipContainerStyle,
      },
    }),
    []
  );

  return (
    <div className="mx-6 h-[195px] rounded-xl border border-border-subtle bg-[#fcfcfc] px-4 pb-6 pt-4">
      <ResponsiveLine<SentimentSeries>
        animate={true}
        colors={(serie) => serie.color as string}
        curve="monotoneX"
        data={data}
        enableArea={false}
        enableGridX={false}
        enableSlices="x"
        enableTouchCrosshair={true}
        enablePoints={true}
        margin={{ top: 16, right: 20, bottom: 40, left: 12 }}
        pointBorderColor={{ from: 'color' }}
        pointBorderWidth={2}
        pointColor="#ffffff"
        pointSize={6}
        sliceTooltip={({ slice }) => (
          <div style={tooltipContainerStyle}>
            <div className="mb-2 text-xs font-medium text-text-muted">{slice.points[0]?.data.xFormatted}</div>
            <div className="flex flex-col gap-1">
              {slice.points.map((point) => (
                <div className="flex items-center gap-3" key={point.id}>
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: point.seriesColor }}
                  />
                  <span className="text-xs text-text-secondary">{point.seriesId}</span>
                  <span className="ml-auto text-xs font-semibold text-text-primary">
                    {formatter.format(point.data.y as number)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        theme={theme}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: yMax, stacked: false }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={null}
        gridYValues={[0, 200_000, 400_000, 600_000, 800_000]}
        motionConfig="gentle"
      />
    </div>
  );
};

export default CallsSentimentChart;

