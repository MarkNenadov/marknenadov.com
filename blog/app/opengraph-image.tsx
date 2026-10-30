import { renderShareCard, SHARE_CARD_CONTENT_TYPE, SHARE_CARD_SIZE } from '@/lib/shareCard';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name}: ${SITE.description}`;
export const size = SHARE_CARD_SIZE;
export const contentType = SHARE_CARD_CONTENT_TYPE;

export default function SiteShareCard() {
  return renderShareCard({ title: SITE.name, subtitle: SITE.description });
}
