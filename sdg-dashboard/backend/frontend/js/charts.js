const API_BASE = 'http://localhost:3000/api/sdg';

// 1. Line Chart - SDG Performance Over Time
fetch(`${API_BASE}/performance-over-time`)
  .then(res => res.json())
  .then(data => {
    const rows = data.data || data;
    const labels = rows.map(d => d.year);
    const points = rows.map(d => d.avg_points_per_year);

    new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average SDG Performance Over Time',
          data: points,
          borderColor: 'rgba(255, 0, 0, 1)',
          fill: false,
          tension: 0.1
        }]
      },
      options: { responsive: true }
    });
  });

// 2. Bar Chart - SDG Performance by Office
fetch(`${API_BASE}/comparison-offices`)
  .then(res => res.json())
  .then(data => {
    const rows = data.data || data;
    const labels = rows.map(d => d.office_name);
    const points = rows.map(d => d.total_points);

    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total SDG Points by Office',
          data: points,
          backgroundColor: 'rgba(255, 0, 0, 0.7)'
        }]
      },
      options: { responsive: true }
    });
  });

// 3. Donut Chart - SDG Indicator Breakdown (example for SDG 5)
fetch(`${API_BASE}/indicator-breakdown?sdg=SDG 5`)
  .then(res => res.json())
  .then(data => {
    const rows = data.data || data;
    const labels = rows.map(d => d.sub_indicator_name);
    const points = rows.map(d => d.total_points);

    new Chart(document.getElementById('donutChart'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: points,
          backgroundColor: [
            '#FF9999', '#FF6666', '#FF3333', '#FF0000', '#CC0000', '#990000'
          ]
        }]
      },
      options: { responsive: true }
    });
  });

// 4. Radar Chart - Sustainability Project Impact
fetch(`${API_BASE}/project-impact`)
  .then(res => res.json())
  .then(data => {
    const rows = data.data || data;
    const labels = rows.map(d => d.impact_area);
    const points = rows.map(d => d.avg_impact);

    new Chart(document.getElementById('radarChart'), {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Project Impact',
          data: points,
          fill: true,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          pointBackgroundColor: 'rgba(255, 0, 0, 1)'
        }]
      },
      options: { responsive: true }
    });
  });
