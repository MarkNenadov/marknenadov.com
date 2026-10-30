const SHORT_TITLE_LENGTH = 30;
const MEDIUM_TITLE_LENGTH = 50;

export function shareCardTitleSize(title: string): number {
  if (title.length <= SHORT_TITLE_LENGTH) {
    return 96;
  }
  return title.length <= MEDIUM_TITLE_LENGTH ? 76 : 64;
}
