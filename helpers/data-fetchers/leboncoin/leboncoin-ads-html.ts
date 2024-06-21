import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";

export interface ParseCarsInput {
  html: string;
}

export interface ParseCarsOutput {
  cars: MobiledeResultsCarCardProps[];
}

const extractRelevantSection = (html: string): string => {
  const resultListSectionStart = html.indexOf('"attributes":');
  if (resultListSectionStart === -1) return "";
  return html.substring(resultListSectionStart);
};

const splitIntoArticles = (html: string): string[] => {
  const articles: string[] = [];
  const articleStartTag = '"attributes":';
  let currentIndex = 0;

  while (currentIndex < html.length) {
    const startIndex = html.indexOf(articleStartTag, currentIndex);
    if (startIndex === -1) break;

    const endIndex = html.indexOf(articleStartTag, startIndex + 1);
    if (endIndex === -1) {
      articles.push(html.substring(startIndex));
      break;
    }

    articles.push(html.substring(startIndex, endIndex));
    currentIndex = endIndex;
  }
  //   console.log("article 1:", articles[0]);

  return articles;
};

const formatLocation = (location: any): string => {
  const { city_label, zipcode, department_name, region_name, country_id } =
    location;
  return `${city_label || ""} ${department_name || ""} ${region_name || ""} ${
    country_id || ""
  }`.trim();
};
// ${zipcode || ""}

const extractDataFromArticle = (
  article: string
): MobiledeResultsCarCardProps | null => {
  //   console.log("Extracting data from article...");

  const attributesMatch = article.match(
    /"attributes":(\[.*?\])(?=\,"location")/s
  );
  const locationMatch = article.match(/"location":({.*?})(?=,"owner")/s);
  const priceMatch = article.match(/"price":\[([0-9]+)\]/s);
  const titleMatch = article.match(/"subject":"([^"]+)"/);
  const hrefMatch = article.match(/"url":"([^"]+)"/);
  const imgSrcMatch = article.match(/"small_url":"([^"]+)"/);
  //   const imgSrcMatch = article.match(/"thumb_url":"([^"]+)"/);

  if (
    !attributesMatch ||
    !titleMatch ||
    !priceMatch ||
    !locationMatch ||
    !hrefMatch ||
    !imgSrcMatch
  ) {
    // console.error("Failed to extract data from article:", article);
    // console.error("attributesMatch:", attributesMatch);
    // console.error("titleMatch:", titleMatch);
    // console.error("priceMatch:", priceMatch);
    // console.error("locationMatch:", locationMatch);
    // console.error("hrefMatch:", hrefMatch);
    // console.error("imgSrcMatch:", imgSrcMatch);
    return null;
  }

  //   console.log("attributesMatch:", attributesMatch[1]);

  let attributes = [];
  try {
    attributes = JSON.parse(attributesMatch[1]);
    // console.log("Parsed attributes:", attributes);
  } catch (error) {
    console.error("Failed to parse attributes JSON:", error);
  }

  const detailsKeys = [
    "mileage",
    "gearbox",
    "horsepower",
    "fuel",
    "issuance_date",
  ];
  const details = attributes
    .filter((attr: any) => detailsKeys.includes(attr.key))
    .map((attr: any) => attr.value_label);

  //   console.log("details:", details);

  const location = JSON.parse(locationMatch[1]);
  const locationString = formatLocation(location);

  return {
    title: titleMatch[1].trim(),
    price: `${parseInt(priceMatch[1], 10)} €`,
    details,
    location: locationString.trim(),
    imgSrc: imgSrcMatch[1],
    href: hrefMatch[1].startsWith("http")
      ? hrefMatch[1]
      : `https://www.leboncoin.fr${hrefMatch[1]}`,
  };
};

export const parseLeboncoinCarsFromHtml = (
  input: ParseCarsInput
): ParseCarsOutput => {
  //   console.log("Parsing lbc cars from HTML...");
  const relevantHtml = extractRelevantSection(input.html);
  const articles = splitIntoArticles(relevantHtml);
  //   console.log("Articles:", articles.length);
  const cars: MobiledeResultsCarCardProps[] = articles
    .map(extractDataFromArticle)
    .filter((car): car is MobiledeResultsCarCardProps => car !== null);

  //   console.log("Parsed lbc cars:", cars);

  return { cars };
};