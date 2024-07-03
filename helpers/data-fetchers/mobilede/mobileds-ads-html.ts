import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";

// export interface MobiledeResultsCarCardProps extends MobiledeResultsCarCardProps {}
// export interface MobiledeResultsCarCardProps {
//   title: string;
//   price: string;
//   details: string[];
//   location: string;
//   imgSrc: string;
// }

export interface ParseCarsInput {
  html: string;
}

export interface ParseCarsOutput {
  cars: MobiledeResultsCarCardProps[];
}

const extractRelevantSection = (html: string): string => {
  const resultListSectionStart = html.indexOf('class="result-list-section');
  if (resultListSectionStart === -1) return "";
  return html.substring(resultListSectionStart);
};

const splitIntoArticles = (html: string): string[] => {
  const articles: string[] = [];
  const articleStartTag = 'article class="list-entry';
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

  return articles;
};

const extractDataFromArticle = (
  article: string
): MobiledeResultsCarCardProps | null => {
  const imgSrcMatch = article.match(
    /<img class="img-thumbnail"[^>]*src="([^"]+)"/
  );
  //   const imgSrcMatch = article.match(
  //     /<img class="img-thumbnail img-lazy js-img-lazy b-loaded"[^>]*src="([^"]+)"/
  //   );
  const titleMatch = article.match(
    /<h3 class="vehicle-title g-col-12 u-text-nowrap">([^<]+)<\/h3>/
  );
  const hrefMatch = article.match(
    /<a[^>]*class="vehicle-data[^"]*"[^>]*href="([^"]+)"/
  );
  // const priceMatch = article.match(
  //   /<div class="vehicle-prices"><p class="seller-currency u-text-bold">([^<]+)<\/p><\/div>/
  // );
  const priceMatch = article.match(
    /<div class="vehicle-prices"><p class="seller-currency u-text-bold">([^<]+) \(TTC\)<\/p><\/div>/
  );
  const locationMatch = article.match(
    /<div class="u-text-grey-60 g-col-s-8 g-col-m-9 u-margin-bottom-9"><span><i class="mde-icon mde-icon-flag[^>]*><\/i>([^<]+)<\/span><\/div>/
  );

  // const detailsMatches = Array.from(
  //   article.matchAll(
  //     /<div class="vehicle-information[^>]*"><p class="u-text-bold">([^<]*)<\/p><p class="u-text-grey-60">([^<]*)<\/p><div class="vehicle-techspecs hidden-s">([^<]*)<\/div>/g
  //   )
  // );
  const detailsMatch = article.match(
    /<div class="vehicle-information g-col-s-6 g-col-m-8">([\s\S]*?)<\/div>/
  );
  if (
    !imgSrcMatch ||
    !titleMatch ||
    !priceMatch ||
    !locationMatch ||
    !hrefMatch ||
    !detailsMatch
  ) {
    return null;
  }

  const detailsHtml = detailsMatch[1];
  const details: string[] = [];

  const primaryDetailsMatch = detailsHtml.match(
    /<p class="u-text-bold">([^<]+)<\/p>/
  );
  if (primaryDetailsMatch) {
    details.push(primaryDetailsMatch[1].trim());
  }

  // const secondaryDetailsMatch = detailsHtml.match(
  //   /<p class="u-text-grey-60">([^<]+)<\/p>/
  // );
  // if (secondaryDetailsMatch) {
  //   details.push(secondaryDetailsMatch[1].trim());
  // }

  const additionalDetailsMatches = detailsHtml.matchAll(
    /<p class="u-text-grey-60">([^<]+)<\/p>/g
  );
  for (const match of additionalDetailsMatches) {
    details.push(match[1].trim());
  }

  return {
    title: titleMatch[1].trim(),
    price: priceMatch[1].trim(),
    details,
    location: locationMatch[1].trim(),
    imgSrc: imgSrcMatch[1],
    href: `https://www.automobile.fr${hrefMatch[1]}`,
  };
};

export const parseCarsFromHtml = (input: ParseCarsInput): ParseCarsOutput => {
  const relevantHtml = extractRelevantSection(input.html);
  const articles = splitIntoArticles(relevantHtml);
  const cars: MobiledeResultsCarCardProps[] = articles
    .map(extractDataFromArticle)
    .filter((car): car is MobiledeResultsCarCardProps => car !== null);
  // console.log("Mobilede cars length:", cars.length);

  return { cars };
};
