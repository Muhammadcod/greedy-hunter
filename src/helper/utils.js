export default function getRandomLocation(boundary) {
  return {
    h: Math.floor(Math.random() * boundary),
    v: Math.floor(Math.random() * boundary),
  }
}
