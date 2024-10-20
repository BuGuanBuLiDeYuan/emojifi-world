import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreeMap = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data) return;

        const width = 800;
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        d3.treemap()
            .size([width, height])
            .padding(1)
            (root);

        const leaf = svg.selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        leaf.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', 'steelblue');

        leaf.append('text')
            .selectAll('tspan')
            .data(d => [d.data.name, d.data.emoji])
            .join('tspan')
            .attr('x', 3)
            .attr('y', (d, i) => `${i * 1.1 + 1.1}em`)
            .attr('font-size', '12px')
            .text(d => d);
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default TreeMap;

