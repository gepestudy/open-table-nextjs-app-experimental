export default function getinitialName(firstname: string, lastName?: string) {
  const fullName =
    firstname.toUpperCase() + (lastName ? ` ${lastName.toUpperCase()}` : ""); // tambahkan spasi sebelum lastName jika lastName tersedia
  const initial = fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");
  if (initial.length >= 2) {
    return initial.slice(0, 2);
  } else {
    return initial;
  }
}
