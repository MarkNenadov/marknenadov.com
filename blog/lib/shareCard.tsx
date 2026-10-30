import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE } from './site';
import { shareCardTitleSize } from './shareCardText';

export const SHARE_CARD_SIZE = { width: 1200, height: 630 };
export const SHARE_CARD_CONTENT_TYPE = 'image/png';

// Dark-mode site colors, which stand out in mostly white social feeds.
const COLORS = {
  canvas: '#0a0f1a',
  ink: '#f1f5f9',
  muted: '#94a3b8',
  accent: '#93c5fd',
};

const AVATAR_SIZE = 72;
const HEADSHOT_ASPECT_RATIO = 1.5;

interface ShareCardProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly date?: string;
}

function readFont(fileName: string): Buffer {
  return readFileSync(join(process.cwd(), 'assets', 'fonts', fileName));
}

function readHeadshotDataUrl(): string {
  const headshot = readFileSync(join(process.cwd(), 'public', 'images', 'markn.png'));
  return `data:image/png;base64,${headshot.toString('base64')}`;
}

function ShareCard({ title, subtitle, date }: ShareCardProps) {
  const titleSize = shareCardTitleSize(title);

  return (
    <div
      style={{
        backgroundColor: COLORS.canvas,
        borderTop: `8px solid ${COLORS.accent}`,
        color: COLORS.ink,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter',
        height: '100%',
        padding: '56px 72px',
        width: '100%',
      }}
    >
      {title !== SITE.name && <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>{SITE.name}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
        <div style={{ display: 'block', fontSize: titleSize, fontWeight: 600, letterSpacing: titleSize * -0.03, lineHeight: 1.1, textWrap: 'balance' }}>
          {title}
        </div>
        {subtitle && <div style={{ color: COLORS.muted, display: 'flex', fontSize: 36, marginTop: 28 }}>{subtitle}</div>}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <div style={{ borderRadius: AVATAR_SIZE / 2, display: 'flex', height: AVATAR_SIZE, overflow: 'hidden', width: AVATAR_SIZE }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={readHeadshotDataUrl()} width={AVATAR_SIZE} height={AVATAR_SIZE * HEADSHOT_ASPECT_RATIO} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 600 }}>{SITE.author}</div>
            {date && <div style={{ color: COLORS.muted, display: 'flex', fontFamily: 'Geist Mono', fontSize: 22, marginTop: 4 }}>{date}</div>}
          </div>
        </div>
        <div style={{ color: COLORS.muted, display: 'flex', fontFamily: 'Geist Mono', fontSize: 24 }}>{new URL(SITE.url).host}</div>
      </div>
    </div>
  );
}

export function renderShareCard(props: ShareCardProps): ImageResponse {
  return new ImageResponse(<ShareCard {...props} />, {
    ...SHARE_CARD_SIZE,
    fonts: [
      { name: 'Inter', data: readFont('inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'Inter', data: readFont('inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
      { name: 'Geist Mono', data: readFont('geist-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
    ],
  });
}
