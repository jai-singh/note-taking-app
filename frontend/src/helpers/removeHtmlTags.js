export const removeHtmlTags = (txt) => {
  return txt.replace(/(<([^>]+)>)/gi, "")
}