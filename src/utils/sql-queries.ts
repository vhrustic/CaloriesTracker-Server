export const getFoodEntriesWithDayTotals = `
SELECT *
FROM
  (SELECT fe.id,
          fe.name,
          fe.calories,
          fe."takenAt",

     (SELECT SUM(ife.calories)::integer
      FROM calories.food_entry ife
      WHERE DATE_TRUNC('day', fe."takenAt") = DATE_TRUNC('day', ife."takenAt")
        AND ife."userId" = $1
        AND ife."deletedAt" IS NULL ) "dailyTotal"
   FROM calories.food_entry fe
   WHERE fe."deletedAt" IS NULL
     AND fe."userId" = $1) TEMP
WHERE temp."dailyTotal" >
    (SELECT us."caloriesLimit"
     FROM calories.user_settings us,
          calories.user u
     WHERE u.id = $1
       AND u."settingsId" = us.id)
`;

export const getNumberOfEntriesInLast7Days = `
SELECT COUNT(*)::integer "totalEntries"
FROM calories.food_entry fe
WHERE fe."deletedAt" IS NULL
  AND fe."takenAt" > CURRENT_DATE - 7;
`;

export const getNumberOfEntriesTwoWeeksAgo = `
SELECT COUNT(*)::integer "totalEntries"
FROM calories.food_entry fe
WHERE fe."deletedAt" IS NULL
  AND fe."takenAt" BETWEEN CURRENT_DATE - 14 AND CURRENT_DATE - 7;
`;

export const getAverageNumberOfCaloriesPerUser = `
SELECT u.email,
       AVG(fe.calories)::integer "averageCalories"
FROM calories.food_entry fe,
     calories.user u
WHERE u.id = fe."userId"
  AND fe."deletedAt" IS NULL
  AND fe."takenAt" > CURRENT_DATE - 7
GROUP BY u.email;
`;