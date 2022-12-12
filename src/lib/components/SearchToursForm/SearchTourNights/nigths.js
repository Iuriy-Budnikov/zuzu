export function getNights() {
  const result = [];
  for (let index = 1; index < 29; index++) {
    const nightsTo = index + 2;
    let nightsLabel = 'ночей';
    if (index === 1 || index === 2 || index === 20 || index === 21 || index === 22) {
      nightsLabel = 'ночі';
    } else if (index === 19) {
      nightsLabel = 'ніч';
    }
    let dayLabel = 'днів';
    if (index === 1 || index === 19 || index === 20 || index === 21) {
      dayLabel = 'дні';
    } else if (index === 18 || index === 28) {
      dayLabel = 'день';
    }
    result.push({
      nights: index,
      nightsTo,
      night: `${index} - ${nightsTo} ${nightsLabel}`,
      day: `${index + 1} - ${nightsTo + 1} ${dayLabel}`
    });
  }
  return result;
}
