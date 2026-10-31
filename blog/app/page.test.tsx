import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from './page';

describe('Home', () => {
  test('shows the Chesterton epigraph with its attribution', () => {
    const markup = renderToStaticMarkup(<Home />);
    expect(markup).toMatch(/<blockquote[^>]*>The world will never starve for want of wonders; but only for want of wonder\.<\/blockquote>/);
    expect(markup).toMatch(/<figcaption[^>]*>G\.K\. Chesterton<\/figcaption>/);
  });
});
