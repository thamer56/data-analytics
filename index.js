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
 
  // Créer un objet pour stocker les dates de création et le nombre de participants correspondant
const participantsByDate = {};

// Parcourir le tableau dataArray
dataArray.forEach(survey => {
  // Convertir la date de création en une date lisible
  const createdDate = new Date(survey.createdDate * 1000).toDateString();

  // Vérifier si la date existe déjà dans participantsByDate
  if (participantsByDate[createdDate]) {
    // Ajouter le nombre de participants actuel au total existant
    participantsByDate[createdDate] += survey.numberOfResponses;
  } else {
    // Si la date n'existe pas encore, initialiser le total avec le nombre de participants actuel
    participantsByDate[createdDate] = survey.numberOfResponses;
  }
});

// Afficher le nombre de participants par date de création
console.log(participantsByDate);
