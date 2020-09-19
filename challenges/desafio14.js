db.trips.aggregate([
  { $match: { startTime: { $exists: true }, stopTime: { $exists: true } } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: {
      $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] }
    }
  } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 }
]);
