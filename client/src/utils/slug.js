
function toSlug(text) {
    return text
      .normalize("NFD") // separa letras y acentos (ej: "ñ" -> "ñ")
      .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
      .replace(/ñ/g, "n") // reemplaza ñ por n
      .replace(/ü/g, "u") // reemplaza ü por u (puedes agregar más casos)
      .replace(/[^a-zA-Z0-9\s-]/g, "") // elimina cualquier carácter raro
      .trim() // elimina espacios al inicio y final
      .replace(/\s+/g, "-") // espacios por guiones
      .toLowerCase(); // minúsculas
}

export default toSlug;