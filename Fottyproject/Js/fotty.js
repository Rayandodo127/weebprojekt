// Fotboll API
const leagueIds = { 'Premier League': '39', 'LaLiga': '140', 'Serie A': '135', 'Bundesliga': '78' };
// Skapar ett objekt med ligornas namn och deras motsvarande ID

Object.entries(leagueIds).forEach(([league, leagueId]) => {
  // Loopar igenom varje [nyckel, värde]-par i leagueIds
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueId}&season=2023`, {
    // Gör en HTTP-förfrågan till API:et med det specifika ligans ID
    headers: {
      'X-RapidAPI-Key': '9ebf95aeffmshf4f94bd93faa767p1c2b23jsn02ee6677d9d2',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })

  .then(response => response.json())
  // Konverterar svaret till JSON-format
  .then(data => {

    // Utskrift av data för varje liga
    console.log(`Data for ${league}:`, data);

    // Skapar en array med lagens rank och namn från API-svaret
    const teams = data.response.map((teamInfo, index) => ({ rank: index + 1, name: teamInfo.team.name }));

    // Utskrift av laginformation för varje liga
    console.log(`Teams for ${league}:`, teams);

    // Hämtar HTML-elementet för ligan baserat på deras namn
    const leagueTableElement = document.getElementById(`${league.replace(/\s+/g, '')}Table`);

    // Skapar HTML-sträng för att visa laginformationen
    const teamsHTML = teams.map(team => `<p>${team.rank}. ${team.name}</p>`).join('');

    // Uppdaterar HTML-elementet med laginformationen
    leagueTableElement.innerHTML = teamsHTML;

  });
});

// Timezone API
fetch('https://timezone.abstractapi.com/v1/current_time?location=Stockholm&api_key=dba612ece07e4b7da2a25c6e3df5ead2')
  .then(response => response.json())
  .then(response => {
    // Konverterar tidsinformationen och uppdaterar HTML-elementet
    const currentTime = new Date(response.datetime);
    const formattedTime = currentTime.toLocaleTimeString();
    const timeElement = document.getElementById('Time');
    timeElement.textContent = `Time: ${formattedTime}`;
  });

// Funktion för att uppdatera tiden
updateTime();
// Uppdatera tiden var 30:e sekund
setInterval(updateTime, 30000);
