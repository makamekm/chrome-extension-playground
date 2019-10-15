function isNear(element, distance, event) {
  const left = element.getBoundingClientRect().left - distance;
  const top = element.getBoundingClientRect().top - distance + window.pageYOffset;
  const right = left + element.getBoundingClientRect().width + 2 * distance;
  const bottom = top + element.getBoundingClientRect().height + 2 * distance;
  const x = event.pageX;
  const y = event.pageY;

  return (x > left && x < right && y > top && y < bottom);
};