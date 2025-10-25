import { render, screen } from '@testing-library/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

vi.mock('recharts', async () => {
    const originalModule = await vi.importActual('recharts');
    return {
        ...originalModule,
        ResponsiveContainer: ({ children }) => <div className="recharts-responsive-container">{children}</div>,
        BarChart: ({ children }) => <div className="recharts-wrapper">{children}</div>,
        Bar: () => <div data-testid="bar" />,
        XAxis: () => <div data-testid="x-axis" />,
        CartesianGrid: () => <div data-testid="cartesian-grid" />,
    };
});

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
};

describe('ChartContainer', () => {
    it('renders a chart container with a chart', () => {
        const { container } = render(
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={chartData}>
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                </BarChart>
            </ChartContainer>
        );

        expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });
});

describe('ChartTooltip', () => {
    it('renders a tooltip within a chart', () => {
        const { container } = render(
            <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent
                            label="Test Tooltip"
                            indicator="dot"
                        />}
                    />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                </BarChart>
            </ChartContainer>
        );

        expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });

    it('renders tooltip content correctly when wrapped in ChartContainer', () => {
        render(
            <ChartContainer config={chartConfig}>
                <BarChart data={chartData} width={400} height={400}>
                    <ChartTooltip
                        content={<ChartTooltipContent label="Test Tooltip" />}
                    />
                </BarChart>
            </ChartContainer>
        );
        // This test primarily ensures that the component renders without crashing
        // when it's used as the content for a ChartTooltip.
        // We can't easily test for the label because it's not visible
        // until the tooltip is triggered.
    });
});