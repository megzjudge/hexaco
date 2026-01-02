const graphsData = [
  {id:'bellCurve1', title:'Honesty-Humility', value:3.39},
  {id:'bellCurve2', title:'Emotionality', value:2.62},
  {id:'bellCurve3', title:'Agreeableness', value:4.28},
  {id:'bellCurve4', title:'Conscientiousness', value:4.59},
  {id:'bellCurve5', title:'Extraversion', value:6.66},
  {id:'bellCurve6', title:'Openness to Experience', value:7.63},

  {id:'bellCurve7', title:'Honesty-Humility: Sincerity', value:2.81},
  {id:'bellCurve8', title:'Honesty-Humility: Fairness', value:3.55},
  {id:'bellCurve9', title:'Honesty-Humility: Greed Avoidance', value:6.12},
  {id:'bellCurve10', title:'Honesty-Humility: Modesty', value:2.6},

  {id:'bellCurve11', title:'Emotionality: Fearfulness', value:3.42},
  {id:'bellCurve12', title:'Emotionality: Anxiety', value:2.87},
  {id:'bellCurve13', title:'Emotionality: Dependence', value:2.4},
  {id:'bellCurve14', title:'Emotionality: Sentimentality', value:5.04},

  {id:'bellCurve15', title:'Extraversion: Social Self-Esteem', value:6.74},
  {id:'bellCurve16', title:'Extraversion: Social Boldness', value:7.29},
  {id:'bellCurve17', title:'Extraversion: Sociability', value:5.88},
  {id:'bellCurve18', title:'Extraversion: Liveliness', value:4.98},

  {id:'bellCurve19', title:'Agreeableness: Forgivingness', value:4.07},
  {id:'bellCurve20', title:'Agreeableness: Gentleness', value:3.32},
  {id:'bellCurve21', title:'Agreeableness: Flexibility', value:6.3},
  {id:'bellCurve22', title:'Agreeableness: Patience', value:4.24},

  {id:'bellCurve23', title:'Conscientiousness: Organization', value:3.64},
  {id:'bellCurve24', title:'Conscientiousness: Diligence', value:5.34},
  {id:'bellCurve25', title:'Conscientiousness: Perfectionism', value:6.96},
  {id:'bellCurve26', title:'Conscientiousness: Prudence', value:3.07},

  {id:'bellCurve27', title:'Openness to Experience: Aesthetic Appreciation', value:6.71},
  {id:'bellCurve28', title:'Openness to Experience: Inquisitiveness', value:7.09},
  {id:'bellCurve29', title:'Openness to Experience: Creativity', value:6.65},
  {id:'bellCurve30', title:'Openness to Experience: Unconventionality', value:7.43},

  {id:'bellCurve31', title:'Interstitial Scale: Altruism', value:4.1}
];

function renderBellCurve(containerId, title, userValue) {
  const bellDiv = document.getElementById(containerId);
  if(!bellDiv) return;

  const bellObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;

      const mean = 5.0;
      const stdDev = 0.78;
      const minX = 0, maxX = 10, steps = 1000;
      const x=[], y=[];
      for(let i=0;i<=steps;i++){
        const xi = minX + (maxX - minX) * i/steps;
        x.push(xi);
        y.push((1/(stdDev*Math.sqrt(2*Math.PI)))*Math.exp(-0.5*((xi-mean)/stdDev)**2));
      }

      // Gradient colors
      const colorStops = [
        {x:3.2,color:[217,148,0]},
        {x:5,color:[41,140,34]},
        {x:6.8,color:[217,148,0]} 
      ];

      function getColorForX(xVal){
        for(let i=0;i<colorStops.length-1;i++){
          const a=colorStops[i], b=colorStops[i+1];
          if(xVal>=a.x && xVal<=b.x){
            const t=(xVal-a.x)/(b.x-a.x);
            const r=Math.round(a.color[0]+t*(b.color[0]-a.color[0]));
            const g=Math.round(a.color[1]+t*(b.color[1]-a.color[1]));
            const bC=Math.round(a.color[2]+t*(b.color[2]-a.color[2]));
            return `rgb(${r},${g},${bC})`;
          }
        }
        // edges: use closest gradient color
        if(xVal < colorStops[0].x) return `rgb(${colorStops[0].color.join(',')})`;
        if(xVal > colorStops[colorStops.length-1].x) return `rgb(${colorStops[colorStops.length-1].color.join(',')})`;
      }

      // Traces
      const traces=[];
      const segmentSize=5;
      for(let i=0;i<x.length;i+=segmentSize){
        const segX=x.slice(i,i+segmentSize+1);
        const segY=y.slice(i,i+segmentSize+1);
        if(segX.length<2) continue;
        const color = getColorForX((segX[0]+segX[segX.length-1])/2);
        traces.push({x:segX, y:segY.map(()=>0), fill:'tozeroy', type:'scatter', mode:'lines', line:{color,color,width:3}});
      }

      function rgb(arr){ return `rgb(${arr[0]},${arr[1]},${arr[2]})`; }

      const isMobile = window.innerWidth <= 768;

      let annotations;

      if(isMobile){
        annotations = [
          { x: 4, text: "10-50th", color: rgb(colorStops[1].color), yOffset: -35 }, 
          { x: 6, text: "50-90th", color: rgb(colorStops[1].color), yOffset: -35 },
          { x: 3.7, text: "<10th", color: rgb(colorStops[2].color), yOffset: -50 },
          { x: 6.3, text: ">90th", color: rgb(colorStops[2].color), yOffset: -50 }
        ].map(a => ({
          x: a.x,
          y: 0,
          xref: 'x',
          yref: 'paper',
          text: a.text,
          showarrow: false,
          yshift: a.yOffset,
          font: { color: a.color, size: 12 },
          align: 'center'
        }));
      } else {
        annotations = [
          { x: 3.7, text:"<10th", color:rgb(colorStops[2].color)},
          { x: 4.5, text:"10-50th", color:rgb(colorStops[1].color)},
          { x: 5.5, text:"50-90th", color:rgb(colorStops[1].color)},
          { x: 6.3, text:">90th", color:rgb(colorStops[2].color)}
        ].map(a=>({
          x: a.x,
          y: -0.14,
          xref: 'x',
          yref: 'paper',
          text: a.text,
          showarrow: false,
          font: { color: a.color, size: 12 },
          align: 'center'
        }));
      }

      const secondaryAnnotation = isMobile 
        ? {
            x: 0.5,
            y: 1.1,
            xref: 'paper',
            yref: 'paper',
            text: `${userValue}`,
            showarrow: false,
            font: { color: 'rgba(255,0,0,0)', size: 16 },
            align: 'center'
          }
        : {
            x: userValue,
            y: 1.04,
            xref: 'x',
            yref: 'paper',
            text: `${userValue}`,
            showarrow: false,
            font: { color: 'rgba(255,0,0,0)', size: 14 },
            align: 'center'
          };

      const frames=[], meanIdx = x.findIndex(v=>v>=mean), maxStep=Math.max(meanIdx,x.length-meanIdx), stepIncrement=15; // bigger step
      for(let step=0;step<=maxStep;step+=stepIncrement){
        const progress = step / maxStep;
        const opacity = progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) / 0.1);
        const frameData = traces.map(trace=>{
          const newY = trace.y.slice();
          trace.x.forEach((xi,idx)=>{
            const xiIdx = x.findIndex(val=>val===xi);
            if(xiIdx>=meanIdx-step && xiIdx<=meanIdx+step) newY[idx]=y[xiIdx];
          });
          return {y:newY};
        });
        const frameLayout = {
          shapes: [
            {
              type: 'line',
              x0: userValue,
              x1: userValue,
              y0: 0,
              y1: Math.max(...y),
              line: { color: `rgba(255,0,0,${opacity})`, width: 3, dash: 'dot' }
            }
          ],
          annotations: [
            ...annotations,
            {
              ...secondaryAnnotation,
              font: { ...secondaryAnnotation.font, color: `rgba(255,0,0,${opacity})` }
            }
          ]
        };
        frames.push({data:frameData, layout: frameLayout});
      }

      const layout = {
          title: title,
          xaxis: {
              title: {
                  text: 'Percentile Score (th)',
                  standoff: 50,
              },
              zeroline: false,
              showgrid: false,
              tickvals: [0,1,2,3,4,5,6,7,8,9,10]
          },
          yaxis: { 
              title: 'Population Likelihood',
              showticklabels: false,
              showgrid: false
          },
          showlegend: false,
          annotations: [...annotations, secondaryAnnotation],
          shapes: [
              {
                  type: 'line',
                  x0: userValue,
                  x1: userValue,
                  y0: 0,
                  y1: Math.max(...y),
                  line: { color: 'rgba(255,0,0,0)', width: 3, dash: 'dot' }
              }
          ],
          margin: {
              l: isMobile ? 15 : 80,
              r: isMobile ? 15 : 80,
              t: isMobile ? 80 : 100,
              b: isMobile ? 100 : 80
          },
          autosize: true
      };

      Plotly.newPlot(bellDiv, traces, layout, {
          displayModeBar: false,
          responsive: true
      }).then(() => {
          Plotly.animate(bellDiv, frames, {
              frame: {duration: 10, redraw: true},
              transition: {duration: 0}
          });
      });

      bellObserver.unobserve(entry.target);
    });
  },{threshold:0.1});

  bellObserver.observe(bellDiv);
}

graphsData.forEach(g=>{
  renderBellCurve(g.id,g.title,g.value);
});

