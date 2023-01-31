export const formatTime = (timer: any) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${parseFloat(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  // return `${getHours} : ${getMinutes} : ${getSeconds}`;
  return `${getMinutes} : ${getSeconds}`;
};
