// https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
{ const sample = [
  {
    semester: '1/2562',
    grade: 3.76,
  },
  {
    semester: '2/2562',
    grade: 3.6
  },
  {
    semester: '1/2563',
    grade: 3.18,
  }


];


  d3 = d3version5 ;

  const svg = d3.select('.barGraph').select('svg');
  const svgContainer = d3.select('.barGraph');

  const margin = 70;
  const width = 900 - 2 * margin;
  const height = 450 - 2 * margin;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.semester))
    .padding(0.4)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 4]);

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));


  chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(sample)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.semester))
    .attr('y', (g) => yScale(g.grade))
    .attr('height', (g) => height - yScale(g.grade))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
      d3.selectAll('.grade')
        .attr('opacity', 0)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
        .attr('x', (a) => xScale(a.semester) - 5)
        .attr('width', xScale.bandwidth() + 10)

      const y = yScale(actual.grade)

      line = chart.append('line')
        .attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)

      barGroups.append('text')
        .attr('class', 'divergence')
        .attr('x', (a) => xScale(a.semester) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.grade) + 30)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text((a, idx) => {

          const divergence = (a.grade / actual.grade * 100 - 100).toFixed(1)

          let text = ''
          if (divergence > 0) text += '+'
          text += `${divergence}%`

          return idx !== i ? text : '';
        })

    })
    .on('mouseleave', function () {
      d3.selectAll('.grade')
        .attr('opacity', 1)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (a) => xScale(a.semester))
        .attr('width', xScale.bandwidth())

      chart.selectAll('#limit').remove()
      chart.selectAll('.divergence').remove()
    })

  barGroups
    .append('text')
    .attr('class', 'grade')
    .attr('x', (a) => xScale(a.semester) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.grade) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.grade}`)

  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Grade')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Semester')

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Grade in Cpr.E')
  }


