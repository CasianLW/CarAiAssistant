export function trimStringByKeywords(text: string): string {
  // Define keywords to look for
  const keywords = ["Filters:", "Donne moi"];

  // Find the earliest occurrence of any keyword
  const earliestIndex = keywords.reduce((minIndex, keyword) => {
    const index = text.indexOf(keyword);
    // If the keyword is found and is before the current minIndex, update minIndex
    if (index !== -1 && (minIndex === -1 || index < minIndex)) {
      return index;
    }
    return minIndex;
  }, -1);

  // If a keyword is found, return the substring up to that keyword
  if (earliestIndex !== -1) {
    return text.substring(0, earliestIndex).trim();
  }

  // If no keywords are found, return the original text
  return text;
}
