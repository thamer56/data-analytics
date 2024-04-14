// import data 
const dataArray = require("./sData.js");
function GroupbyStatus(dataArray){

    const counts = dataArray.reduce((acc, obj) => {
        acc[obj.status] = (acc[obj.status] || 0) + 1;
        return acc;
      }, {});
      
      const result = Object.keys(counts).map(status => ({ status, count: counts[status] }));
      return result;
}
  console.log(counts);
  console.log(result);
  // Créer un objet pour stocker les dates de création et le nombre de participants correspondant
const participantsByMonth = {};

// Parcourir le tableau dataArray
dataArray.forEach(survey => {
  // Convertir la date de création en une date lisible
  const createdDate = new Date(survey.createdDate * 1000);
  
  // Récupérer le mois et l'année de la date
  const monthYear = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });

  // Vérifier si le mois existe déjà dans participantsByMonth
  if (participantsByMonth[monthYear]) {
    // Ajouter le nombre de participants actuel au total existant
    participantsByMonth[monthYear] += survey.numberOfResponses;
  } else {
    // Si le mois n'existe pas encore, initialiser le total avec le nombre de participants actuel
    participantsByMonth[monthYear] = survey.numberOfResponses;
  }
});

// Afficher le nombre de participants par mois de création
console.log(participantsByMonth);
