export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getDogDetails = async (dogId) => {
  const res = await fetch(`/api/dogdetails?id=${dogId}`);
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  return res.json();
}