export const formatSecondsToMinute = seconds =>{
  const minute =Math.floor(seconds /60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formatedMinute = String(minute).padStart(2,'0')

  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formatedMinute}:${formattedSeconds}`
}

export const isExit =(songs,track)=>{
  return songs?.some(song =>song?.url === track?.url);

}